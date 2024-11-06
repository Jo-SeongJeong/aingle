import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import heart from "../../assets/icons/hearth.png";
import message from "../../assets/icons/message-circle.png";
import Postcomment from "../../components/Post/Postcomment";
import { IComment } from "../../model/comment";
import TextHeader from "../../components/header/TextHeader";
import { getPostDetail } from "../../api/postAPI";
import { IPost } from "../../model/post";

const PostDetail = () => {
  const { id } = useParams();
  const [postData, setPostData] = useState<IPost | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getPostDetail(id as string);
      console.log("postData: ", response);
      setPostData(response.data);
    };

    fetchData();
  }, [id]);

  if (!postData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white h-full w-full px-[16px] pb-[34px] flex flex-col items-center relative pt-[50px]">
      <TextHeader headerText="게시물" navTo="" />
      <div className="overflow-auto w-full mt-1">
        <div className="w-full mb-[50px]">
          <div className="flex items-center mb-[11px]">
            <img
              src={postData.member.memberImage || "/path/to/defaultImage.jpg"}
              className="w-[35px] h-[35px] rounded-full border-[2px] border-solid border-[#FB599A] mr-[10px]"
            />
            <div>
              <h1 className="text-[15px] text-black font-semibold">
                {postData.member.name}
              </h1>
              <h1 className="text-[10px] text-[#A6A6A6]">
                {postData.createTime.split("T")[0]}
              </h1>
            </div>
          </div>

          {postData.image && (
            <img
              src={postData.image}
              className="bg-gray-500 rounded-[5px] w-full h-[340px] mb-[20px]"
            />
          )}

          <div className="flex space-x-[10px] mb-[6px]">
            <div className="flex items-center">
              <img src={heart} className="w-[20px] mr-[5px]" />
              <h1 className="text-[12px] font-semibold">
                {postData.totalLike}
              </h1>
            </div>
            <div className="flex items-center">
              <img src={message} className="w-[20px] mr-[5px] mt-[2px]" />
              <h1 className="text-[12px] font-semibold">
                {postData.totalComment}
              </h1>
            </div>
          </div>

          <div className="flex space-x-[15px] items-center mb-[10px]">
            <h1 className="font-semibold text-[15px]">
              {postData.member.name}
            </h1>
            <span className="text-[12px] font-medium">{postData.content}</span>
          </div>
          <div
            className=" "
            style={{ maxHeight: "60vh" }} // Adjust maxHeight as needed
          >
            {/* Render comments if necessary */}
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

/*
{
  "postId": 6,
  "content": "자 드가자",
  "image": "https://ainglebucket.s3.ap-northeast-2.amazonaws.com/5b96cc28-7e36-4af5-a436-5d576d8571b9-%EC%83%81%EC%A0%90%EC%A3%BC%EC%9D%B82.jpeg",
  "createTime": "2024-11-05T17:50:41.591804",
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
