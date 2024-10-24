import PinkTextHeader from "../../components/header/PinkTextHeader";
import Post from "../../components/Post";

const Home = () => {
  return (
    <div className="bg-white h-full w-full px-[16px] py-[34px] flex flex-col  items-center">
      <PinkTextHeader />
      <Post />
    </div>
  );
};

export default Home;
