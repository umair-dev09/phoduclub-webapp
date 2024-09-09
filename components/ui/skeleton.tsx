import { cn } from "@/lib/utils"
import React from "react"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-black-100 dark:bg-gray-800", className)}
      {...props}
    />
  )
}

export { Skeleton }
