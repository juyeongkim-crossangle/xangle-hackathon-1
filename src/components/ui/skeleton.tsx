import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-primary/20 w-full h-[70px]", className)}
      {...props}
    />
  )
}

export { Skeleton }
