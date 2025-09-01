import headingClasses from "./Heading.module.scss";

interface HeadingProps {
  headingType: string;
  title: string;
}

const Heading = ({ headingType, title }: HeadingProps) => {
  return headingType === "M" ? (
    <h1 className={headingClasses["Heading__type-M"]}>{title}</h1>
  ) : (
    <h2 className={headingClasses["Heading__type-S"]}>{title}</h2>
  );
};

export default Heading;
