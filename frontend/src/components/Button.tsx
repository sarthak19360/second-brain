import React, { type ReactElement } from "react";
import clsx from "clsx";

interface ButtonProps {
  variant?: "primary" | "secondary";
  icon: ReactElement;
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  icon: Icon,
  children,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition",
        {
          "bg-indigo-600 text-white hover:bg-indigo-700": variant === "primary",
          "bg-indigo-50 text-indigo-600 hover:bg-indigo-100":
            variant === "secondary",
        }
      )}
    >
      {Icon}
      {children}
    </button>
  );
};

export default Button;
