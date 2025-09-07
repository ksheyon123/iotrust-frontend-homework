import React, { forwardRef, ButtonHTMLAttributes } from "react";

// Button variant types
export type ButtonVariant = "cta" | "ghost" | "icon";

// Button size types
export type ButtonSize = "sm" | "md" | "lg";

// Button props interface
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  children?: React.ReactNode;
}

// Button component with forwardRef for better ref handling
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "cta",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      children,
      disabled,
      className = "",
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    // Size styles
    const sizeStyles = {
      sm: "px-3 py-1.5 text-sm rounded-md gap-1.5",
      md: "px-4 py-2 text-base rounded-md gap-2",
      lg: "px-6 py-3 text-lg rounded-lg gap-2.5",
    };

    // Variant styles
    const variantStyles = {
      cta: "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-sm hover:shadow-md focus:ring-blue-500",
      ghost:
        "bg-transparent hover:bg-gray-100 active:bg-gray-200 text-gray-700 border border-gray-300 hover:border-gray-400 focus:ring-gray-500",
      icon: "bg-transparent hover:bg-gray-100 active:bg-gray-200 text-gray-600 hover:text-gray-800 p-2 rounded-full focus:ring-gray-500",
    };

    // Icon button specific styles
    const iconSizeStyles = {
      sm: "w-8 h-8",
      md: "w-10 h-10",
      lg: "w-12 h-12",
    };

    // Combine styles
    const buttonClasses = [
      baseStyles,
      variant === "icon" ? iconSizeStyles[size] : sizeStyles[size],
      variantStyles[variant],
      fullWidth && variant !== "icon" ? "w-full" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    // Loading spinner component
    const LoadingSpinner = () => (
      <svg
        className="animate-spin -ml-1 mr-2 h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    );

    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && variant !== "icon" && <LoadingSpinner />}
        {!isLoading && leftIcon && variant !== "icon" && leftIcon}
        {variant === "icon" ? (
          isLoading ? (
            <LoadingSpinner />
          ) : (
            children
          )
        ) : (
          children
        )}
        {!isLoading && rightIcon && variant !== "icon" && rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
