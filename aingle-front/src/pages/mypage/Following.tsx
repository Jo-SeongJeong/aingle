import { useEffect, useState } from "react";
import { getFollowingList } from "../../api/followAPI";
import FollowingCard, {
  IFollowCard,
} from "../../components/card/FollowingCard";
import TextHeader from "../../components/header/TextHeader";
import { useQuery } from "@tanstack/react-query";

const Following = () => {
  const { data } = useQuery({
    queryKey: ["followingList"],
    queryFn: getFollowingList,
    initialData: { followList: [] },
  });

  console.log(data);

  return (
    <div className="h-full w-[375px] relative bg-white  pt-[13px] overflow-auto pb-[80px]">
      <TextHeader navTo="/mypage" headerText="팔로잉 리스트" />
      <div className="px-4 pt-[20px] mt-8">
        {data?.followList?.map((bot: IFollowCard, idx: number) => (
          <FollowingCard
            characterId={bot.characterId}
            name={bot.name}
            job={bot.job}
            age={bot.age}
            tone={bot.tone}
            talkType={bot.talkType}
            personality={bot.personality}
            imageUrl={bot.imageUrl}
            key={idx}
          />
        ))}
      </div>
    </div>
  );
};

export default Following;

// {
//   "followList": [
//     {
//       "characterId": 1,
//       "name": "유보은",
//       "job": "대학생",
//       "age": 25,
//       "tone": "반말",
//       "talkType": "간결",
//       "personality": "단순활발",
//       "imageUrl": "https://ainglebucket.s3.ap-northeast-2.amazonaws.com/character/2.png"
//     },
//     {
//       "characterId": 2,
//       "name": "김라온",
//       "job": "회사원",
//       "age": 28,
//       "tone": "반말",
//       "talkType": "간결",
//       "personality": "무뚝뚝",
//       "imageUrl": "https://ainglebucket.s3.ap-northeast-2.amazonaws.com/character/7294741.png"
//     },
//     {
//       "characterId": 3,
//       "name": "윌리엄",
//       "job": "캐피탈IT개발자",
//       "age": 26,
//       "tone": "반말",
//       "talkType": "간결",
//       "personality": "활발",
//       "imageUrl": "https://ainglebucket.s3.ap-northeast-2.amazonaws.com/character/7294765.png"
//     }
//   ]
// }
