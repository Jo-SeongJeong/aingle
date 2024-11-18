import { useNavigate } from "react-router-dom";

export interface PostCardProps {
  id: number;
  image: string | null;
}

export interface IPost {
  postId: number;
  image: string; // image가 null일 수도 있으므로 null을 허용
}
const PostCard: React.FC<PostCardProps> = ({ id, image }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/post/${id}`);
  };

  return (
    <div
      className="flex-grow aspect-square rounded-[10px] bg-gray-400 bg-cover bg-center cursor-pointer"
      style={{ backgroundImage: `url(${image})` }}
      onClick={handleClick}
    ></div>
  );
};

export default PostCard;
