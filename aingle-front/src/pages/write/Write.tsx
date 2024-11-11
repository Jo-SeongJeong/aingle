// src/pages/write/Write.tsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import img from "../../assets/icons/image.png";
import { IcreatePost } from "../../model/post";
import { createPost } from "../../api/postAPI";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactGA from "react-ga4";
import { useRecoilValue } from "recoil";
import { userDataState } from "../../store/atoms";

const Write: React.FC = () => {
  const navigate = useNavigate();
  const userData = useRecoilValue(userDataState);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null); // 미리보기 URL을 저장할 상태
  const fileInputRef = useRef<HTMLInputElement | null>(null); // 파일 입력을 참조할 ref

  // 유저 정보 수정 api 요청 할 때 인수로 사용할 객체 생성
  const [post, setPost] = useState<IcreatePost>({
    content: "",
    postImage: null,
  });

  // post 내용 입력 할 때마다 호출하는 함수
  const handleChange = (
    field: keyof IcreatePost,
    value: string | File | null
  ) => {
    // content 필드에 문자 길이 제한 적용
    if (
      field === "content" &&
      typeof value === "string" &&
      value.length > 200
    ) {
      // 문자 제한을 초과하면 업데이트 안 함
      return;
    }

    setPost((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageClick = () => {
    fileInputRef.current?.click(); // 이미지 디브 클릭 시 파일 입력 클릭
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleChange("postImage", file); // 선택한 파일을 상태에 저장
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPreviewUrl(reader.result); // 미리보기 URL을 상태에 저장
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createPost(post);

      // 사용자 ID 가져오기
      const userId = userData.id;

      // GA 이벤트 전송 (gtag를 활용하여 커스텀 데이터 포함)
      ReactGA.gtag("event", "post_creation", {
        category: "Form",
        action: "Submit",
        label: "게시글 작성",
        user_id: userId, // 사용자 ID 포함
      });

      navigate("/home", { replace: true });
    } catch (error) {
      console.error("게시글 등록 실패 :", error);
    }
  };

  return (
    <div className="min-h-screen relative bg-white pt-[32px]">
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
            value={post.content}
            onChange={(e) => {
              handleChange("content", e.target.value);
            }}
            className="w-full h-[186px] text-3 border-2 border-pink-base rounded-[10px] p-4 resize-none focus:outline-none focus:ring-2 focus:ring-pink-300"
          ></textarea>
          <div className="absolute right-4 bottom-3 text-sm text-gray-500">
            {post.content.length}/200
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="absolute bottom-6 left-[23px] max-w-[436px] mt-auto bg-pink-base w-full py-5 rounded-[10px] text-white text-4 font-semibold self-end"
          style={{ width: `calc(100% - 46px)` }}
        >
          게시하기
        </button>
      </div>
    </div>
  );
};

export default Write;
