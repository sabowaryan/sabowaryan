import { cn } from "@/lib/utils"
import { type HTMLAttributes } from "react"

export function GradientBackground({ 
    className,
    ...props 
}: HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                "absolute inset-0 opacity-90 transition-opacity duration-500",
                className
            )}
            {...props}
        />
    )
}