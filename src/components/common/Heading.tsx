interface HeadingProps {
  headingType: string;
  title: string;
}

const Heading = ({ headingType, title }: HeadingProps) => {
  return headingType === "M" ? <h1>{title}</h1> : <h2>{title}</h2>;
};

export default Heading;
