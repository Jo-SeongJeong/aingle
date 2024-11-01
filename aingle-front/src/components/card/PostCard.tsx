import { useNavigate } from "react-router-dom";

interface PostCardProps {
  id: number;
  image: string;
}

const PostCard: React.FC<PostCardProps> = ({ id, image }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/post/${id}`);
  };

  return (
    <div
      className="w-[100px] h-[100px] rounded-[10px] bg-gray-400 bg-cover bg-center cursor-pointer"
      style={{ backgroundImage: `url(${image})` }}
      onClick={handleClick}
    ></div>
  );
};

export default PostCard;
