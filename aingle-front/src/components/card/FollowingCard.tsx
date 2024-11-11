import { useMutation, useQueryClient } from "@tanstack/react-query";
import { unfollowBot } from "../../api/followAPI";
import { useNavigate } from "react-router-dom";

export interface IFollowCard {
  characterId: number;
  name: string;
  job: string;
  age: number;
  tone: string;
  talkType: string;
  personality: string;
  imageUrl: string;
}

export const FollowingCard = ({
  characterId,
  name,
  job,
  age,
  tone,
  talkType,
  personality,
  imageUrl,
}: IFollowCard) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: number) => unfollowBot(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["followingList"] });
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });

  return (
    <div className=" flex border-[1px] border-pink-light px-[12px] py-[8px] rounded-[10px] gap-5 items-center justify-between mb-3">
      <div className="flex items-center gap-5">
        <div
          className="bg-black w-[60px] h-[60px] rounded-full bg-cover bg-center  flex-shrink-0"
          style={{
            backgroundImage: `url(${imageUrl})`,
          }}
          onClick={() => {
            navigate(`/vote/charDetail/${characterId}`);
          }}
        />
        <div>
          <h1 className="text-[18px] font-semibold ">{name}</h1>
          <div>
            <span className="text-pink-base text-[14px] mr-[4px]">#{job}</span>
            <span className="text-pink-base text-[14px] mr-[4px]">#{age}</span>
            <span className="text-pink-base text-[14px] mr-[4px]">#{tone}</span>
          </div>
          <div>
            <span className="text-pink-base text-[14px] mr-[4px]">
              #{talkType}
            </span>
            <span className="text-pink-base text-[14px] mr-[4px]">
              #{personality}
            </span>
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          mutation.mutate(characterId);
        }}
        className="py-[12px] px-5 rounded-[10px] bg-pink-100 text-pink-base  flex-shrink-0"
      >
        언팔로우
      </button>
    </div>
  );
};

export default FollowingCard;
