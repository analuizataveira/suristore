import { type ButtonHTMLAttributes, forwardRef } from "react"
import { cn } from "@/utils/cn"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger"
  size?: "sm" | "md" | "lg"
  isLoading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, disabled, ...props }, ref) => {
    const baseClasses =
      "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed"

    const variants = {
      primary: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 hover:glow-red",
      secondary: "bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 focus:ring-gray-500",
      ghost: "bg-transparent hover:bg-gray-800 text-white focus:ring-gray-500",
      danger: "bg-red-800 hover:bg-red-900 text-white focus:ring-red-500",
    }

    const sizes = {
      sm: "px-3 py-1.5 text-sm rounded-md",
      md: "px-4 py-2 text-base rounded-lg",
      lg: "px-6 py-3 text-lg rounded-xl",
    }

    return (
      <button
        ref={ref}
        className={cn(baseClasses, variants[variant], sizes[size], isLoading && "cursor-wait", className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" /> : null}
        {children}
      </button>
    )
  },
)

Button.displayName = "Button"
