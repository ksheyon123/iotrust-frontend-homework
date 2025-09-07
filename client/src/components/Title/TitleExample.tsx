import Title from "./Title";

type TitleType = {
  title: string;
};

const TitleExample = () => {
  const d: TitleType = {
    title: "목록",
  };
  return (
    <Title<TitleType> data={d} children={(props) => <TitleText {...props} />} />
  );
};

const TitleText = (d: TitleType) => {
  return <div>{d.title}</div>;
};

export default TitleExample;
