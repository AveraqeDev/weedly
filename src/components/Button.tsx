import { MouseEventHandler } from "react";

const Button: React.FC<{
  children: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}> = ({ children, onClick, type, disabled }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className="group inline-flex gap-2 items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-lime-500 hover:bg-lime-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500 disabled:hover:cursor-not-allowed disabled:bg-lime-300 disabled:text-gray-400 disabled:focus:ring-lime-300"
    >
      {children}
    </button>
  );
};

export default Button;
