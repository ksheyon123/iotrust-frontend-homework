import { ReactNode } from "react";

interface TitleProps<T> {
  children: (props: T) => ReactNode;
  data: T;
  className?: string;
}

const Title = <T,>({ children, data, className }: TitleProps<T>) => {
  return <div className={`${className}`}>{children(data)}</div>;
};

export default Title;
