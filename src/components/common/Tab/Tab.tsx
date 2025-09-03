import tabClasses from "./Tab.module.scss";
import { clsx } from "clsx";

interface TabProps {
  label: string;
  type: "button" | "submit" | "reset";
  size: "xs" | "s" | "m" | "l" | "xl";
  isActive: boolean;
  onClick?: React.MouseEventHandler;
}

export const Tab = ({ label, type, size, isActive, onClick }: TabProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={label || "Button"}
      className={clsx(
        tabClasses["tab"],
        tabClasses[`tab__${size}`],
        isActive && tabClasses["tab--isActive"]
      )}
    >
      {label}
    </button>
  );
};
