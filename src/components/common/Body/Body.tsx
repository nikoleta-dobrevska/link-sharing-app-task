import bodyClasses from "./Body.module.scss";

interface BodyProps {
  bodyType: string;
  text: string;
}

const Body = ({ bodyType, text }: BodyProps) => {
  return (
    <p
      className={
        bodyType === "M"
          ? bodyClasses["Body__type-M"]
          : bodyClasses["Body__type-S"]
      }
    >
      {text}
    </p>
  );
};

export default Body;
