import { type HTMLAttributes, forwardRef } from "react"
import { cn } from "@/utils/cn"

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "hover" | "glow"
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const variants = {
      default: "bg-gray-900 border border-gray-800",
      hover:
        "bg-gray-900 border border-gray-800 hover:border-red-600 hover:glow-red transition-all duration-300 hover:scale-105",
      glow: "bg-gray-900 border border-red-600 glow-red",
    }

    return (
      <div ref={ref} className={cn("rounded-lg p-4", variants[variant], className)} {...props}>
        {children}
      </div>
    )
  },
)

Card.displayName = "Card"
