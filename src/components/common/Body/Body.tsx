interface BodyProps {
  bodyType: string;
  text: string;
}

const Body = ({ bodyType, text }: BodyProps) => {
  return <p>{text}</p>;
};

export default Body;
