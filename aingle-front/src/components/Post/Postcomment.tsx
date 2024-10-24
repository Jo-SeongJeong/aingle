const Postcomment = () => {
  return (
    <div className="w-full bg-white flex items-start">
      <div className="mr-[10px] self-start flex-shrink-0">
        <img className="bg-black w-[35px] h-[35px] rounded-full object-cover" />
      </div>
      <div className="">
        <div className="flex space-x-[5px] items-center">
          <h1 className="text-[13px] font-semibold ">name</h1>
          <h1 className="text-[10px] font-medium text-[#A6A6A6]">time</h1>
        </div>
        <span>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </span>
        <h1 className="text-[10px] text-[#A6A6A6] pt-[5px] pb-[10px]">
          답글 달기
        </h1>
      </div>
    </div>
  );
};

export default Postcomment;
