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
  return (
    <div className=" flex border-[1px] border-pink-light px-[12px] py-[8px] rounded-[10px] gap-5 items-center">
      <div
        className="bg-black w-[60px] h-[60px] rounded-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${imageUrl})`,
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
      <button className="py-[12px] px-5 rounded-[10px] bg-pink-100 text-pink-base">
        언팔로우
      </button>
    </div>
  );
};

export default FollowingCard;
