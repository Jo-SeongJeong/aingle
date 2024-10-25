// src/pages/write/Write.tsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import img from "../../assets/icons/image.png";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Write: React.FC = () => {
  const [typedText, setTypedText] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null); // 이미지 파일을 저장할 상태
  const [previewUrl, setPreviewUrl] = useState<string | null>(null); // 미리보기 URL을 저장할 상태
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null); // 파일 입력을 참조할 ref

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= 200) {
      setTypedText(e.target.value);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click(); // 이미지 디브 클릭 시 파일 입력 클릭
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file); // 선택한 파일을 상태에 저장
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPreviewUrl(reader.result); // 미리보기 URL을 상태에 저장
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    // 서버로 데이터를 전송하는 예시
    const formData = new FormData();
    formData.append("text", typedText);
    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // 성공적으로 게시물이 작성된 경우
        navigate("/home");
      } else {
        // 오류 처리
        console.error("게시물 작성 실패");
      }
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  return (
    <div className="h-full w-[375px] relative bg-white pt-[32px]">
      {/* header */}
      <div className="absolute top-0 bg-white w-full py-[15px] px-[18px] flex justify-between items-center">
        <div
          onClick={() => {
            navigate("/home");
          }}
          className="cursor-pointer"
        >
          <FontAwesomeIcon icon={faChevronLeft} className="w-6" />
        </div>
        <h1 className="font-semibold text-[16px]">게시물 작성하기</h1>
        <div></div>
      </div>
      {/* wrapper */}
      <div className="py-6 px-[23px] flex flex-col h-full">
        {/* 이미지 */}
        <div
          className="mb-[23px] w-[80px] h-[80px] bg-[#FFE8F1] rounded-[10px] flex flex-col items-center justify-center cursor-pointer relative"
          onClick={handleImageClick}
          style={{
            backgroundImage: previewUrl ? `url(${previewUrl})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {!previewUrl && (
            <>
              <img
                src={img}
                className="w-[30px] h-[30px]"
                alt="이미지 아이콘"
              />
              <h1 className="text-3 text-pink-base">사진</h1>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
        {/* 텍스트 영역과 글자 수 표시 */}
        <div className="relative w-full mb-6">
          <textarea
            placeholder="내용을 입력하세요..."
            value={typedText}
            onChange={handleChange}
            className="w-full h-[186px] text-3 border-2 border-pink-base rounded-[10px] p-4 resize-none focus:outline-none focus:ring-2 focus:ring-pink-300"
          ></textarea>
          <div className="absolute right-4 bottom-3 text-sm text-gray-500">
            {typedText.length}/200
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="mt-auto bg-pink-base w-full py-5 rounded-[10px] text-white text-4 font-semibold self-end"
        >
          게시하기
        </button>
      </div>
    </div>
  );
};

export default Write;
