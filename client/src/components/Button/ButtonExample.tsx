import Button from "./Button";

const ButtonExample = () => {
  return (
    <>
      <Button variant="cta" size="md">
        확인
      </Button>
      <Button variant="ghost" size="lg" leftIcon={<Img />}>
        추가하기
      </Button>
      <Button variant="icon" size="sm">
        <Img />
      </Button>
      <Button variant="cta" isLoading>
        저장 중...
      </Button>
      <Button variant="cta" fullWidth>
        전체 너비 버튼
      </Button>
    </>
  );
};

const Img = () => {
  return (
    <img
      src="https://raw.githubusercontent.com/KyungeunKim/iotrust-frontend-homework/main/images/icon_buy.png"
      alt="icon"
    />
  );
};

export default ButtonExample;
