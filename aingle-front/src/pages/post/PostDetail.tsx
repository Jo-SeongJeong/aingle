import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import heart from "../../assets/icons/hearth.png";
import message from "../../assets/icons/message-circle.png";
import Postcomment, { IComment } from "../../components/Post/Postcomment";
import TextHeader from "../../components/header/TextHeader";
import trump from "../../assets/test/trump.jpg";
import trumpProfile from "../../assets/test/trumpProfile.jpg";
import { useQuery } from "@tanstack/react-query";
import { getPostDetail } from "../../api/postAPI";

const PostDetail = () => {
  const { id } = useParams();
  const [postId, setPostId] = useState(0);

  const { data } = useQuery({
    queryKey: ["users"], // queryKey는 배열 형태로 제공해야 함
    queryFn: () => getPostDetail(id as string), // queryFn은 호출할 비동기 함수
    enabled: !!id,
  });

  const dummyData = {
    // profileURL: "",
    writer: "trump",
    // postImgURL: "sadfasdfasdf",
    time: "",
    likeCnt: 0,
    postText: "Make America Great Again!",
    commentCnt: 0,
  };

  const dummyComments: IComment[] = [
    {
      id: 1,
      writer: "홍길동",
      time: "방금 전",
      content: "정말 유익한 글이네요! 공유해주셔서 감사합니다.",
    },
    {
      id: 2,
      writer: "김철수",
      time: "2시간 전",
      content: "저도 같은 생각을 했습니다. 훌륭한 포스팅입니다.",
    },
    {
      id: 3,
      writer: "이영희",
      time: "어제",
      content: "추가로 생각해볼 만한 부분이 있어요.",
    },
    {
      id: 4,
      writer: "박민수",
      time: "3일 전",
      content: "이 주제에 대해 더 알고 싶습니다. 좋은 정보 감사합니다!",
    },
    {
      id: 5,
      writer: "최지우",
      time: "1주일 전",
      content: "이 글 덕분에 많은 도움이 되었습니다.",
    },
    {
      id: 1,
      writer: "홍길동",
      time: "방금 전",
      content: "정말 유익한 글이네요! 공유해주셔서 감사합니다.",
    },
    {
      id: 2,
      writer: "김철수",
      time: "2시간 전",
      content: "저도 같은 생각을 했습니다. 훌륭한 포스팅입니다.",
    },
    {
      id: 3,
      writer: "이영희",
      time: "어제",
      content: "추가로 생각해볼 만한 부분이 있어요.",
    },
    {
      id: 4,
      writer: "박민수",
      time: "3일 전",
      content: "이 주제에 대해 더 알고 싶습니다. 좋은 정보 감사합니다!",
    },
    {
      id: 5,
      writer: "최지우",
      time: "1주일 전",
      content: "이 글 덕분에 많은 도움이 되었습니다.",
    },
  ];

  return (
    <div className="bg-white h-full w-full px-[16px] pb-[34px] flex flex-col items-center relative pt-[50px]">
      <TextHeader headerText="게시물" navTo="" />
      <div className="overflow-auto w-full mt-1">
        <div className="w-full mb-[50px]">
          <div className="flex items-center mb-[11px]">
            {/* <img
              src={dummyData.profileURL} 
              className="w-[35px] h-[35px] rounded-full border-[2px] border-solid border-[#FB599A] mr-[10px]"
            /> */}
            <img
              src={data.member.memberImage}
              className="w-[35px] h-[35px] rounded-full border-[2px] border-solid border-[#FB599A] mr-[10px]"
            />
            <div>
              <h1 className="text-[15px] text-black font-semibold">
                {data.member.name}
              </h1>
              <h1 className="text-[10px] text-[#A6A6A6]">
                {data.createTime.split("T")[0]}
              </h1>
            </div>
          </div>

          <img
            src={data.image}
            className="bg-gray-500 rounded-[5px] w-full h-[340px] mb-[20px]"
          />

          <div className="flex space-x-[10px] mb-[6px]">
            <div className="flex items-center">
              <img src={heart} className="w-[20px] mr-[5px]" />
              <h1 className="text-[12px] font-semibold">{data.totalLike}</h1>
            </div>
            <div className="flex items-center">
              <img src={message} className="w-[20px] mr-[5px] mt-[2px]" />
              <h1 className="text-[12px] font-semibold">{data.totalComment}</h1>
            </div>
          </div>

          <div className="flex space-x-[15px] items-center mb-[10px]">
            <h1 className="font-semibold text-[15px]">{data.member.name}</h1>
            <span className="text-[12px] font-medium">{data.content}</span>
          </div>
          <div
            className=" "
            style={{ maxHeight: "60vh" }} // Adjust maxHeight as needed
          >
            {dummyComments.map((data, idx) => (
              <Postcomment
                key={idx}
                content={data.content}
                id={data.id}
                time={data.time}
                writer={data.writer}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;

/*
{
  "postId": 5,
  "content": "자 드가자",
  "image": null,
  "createTime": "2024-11-05T17:50:14.093021",
  "totalLike": 0,
  "totalComment": 0,
  "member": {
    "memberId": 28,
    "name": "희정",
    "memberImage": null
  },
  "character": null,
  "comments": []
}
*/
