import character01 from "../../assets/images/character01.png";

const CharacterCard = () => {
  return (
    <div className="bg-white w-[100px] h-[100px] mx-1 my-1 rounded-lg">
      <img src={character01} alt="" />
    </div>
  );
};

export default CharacterCard;
