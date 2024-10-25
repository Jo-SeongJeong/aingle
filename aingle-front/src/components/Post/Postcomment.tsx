export interface IComment {
  id: number;
  writer: string;
  time: string;
  content: string;
}

const Postcomment = ({ writer, time, content }: IComment) => {
  return (
    <div className="w-full bg-white flex items-start">
      <div className="mr-[10px] self-start flex-shrink-0">
        <img className="bg-black w-[35px] h-[35px] rounded-full object-cover" />
      </div>
      <div className="">
        <div className="flex space-x-[5px] items-center">
          <h1 className="text-[13px] font-semibold ">{writer}</h1>
          <h1 className="text-[10px] font-medium text-[#A6A6A6]">{time}</h1>
        </div>
        <span>{content}</span>
        <h1 className="text-[10px] text-[#A6A6A6] pt-[5px] pb-[10px]">
          답글 달기
        </h1>
      </div>
    </div>
  );
};

export default Postcomment;
