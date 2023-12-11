import "./Button.css";

interface ButtonProps {
  type: "submit" | "button";
  text: string;
  onClickEvent?: () => void;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
  style?:object
}

const Button: React.FC<ButtonProps> = ({
  type,
  text,
  onClickEvent = () => {},
  className,
  disabled = false,
  isLoading = false,
  style
}) => {
  const classes =
    "app-button-component" +
    " " +
    className
  return (
    <button
      type={type}
      className={classes}
      onClick={onClickEvent}
      disabled={disabled}
      style={style}
    >
      {isLoading ? <>Loading...</> : text}
    </button>
  );
};

export default Button;
