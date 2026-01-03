import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "default" | "secondary" | "ghost";
type Size = "default" | "icon";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export function Button({ className, variant="default", size="default", ...props }: ButtonProps) {
  const v =
    variant === "default" ? "bg-white text-zinc-950 hover:bg-zinc-200" :
    variant === "secondary" ? "bg-zinc-900 text-zinc-50 hover:bg-zinc-800 border border-zinc-800" :
    "bg-transparent hover:bg-zinc-900";
  const s = size === "icon" ? "h-10 w-10 p-0" : "h-10 px-4";
  return (
    <button
      className={cn("inline-flex items-center justify-center gap-2 rounded-xl text-sm font-medium transition disabled:opacity-50 disabled:pointer-events-none", v, s, className)}
      {...props}
    />
  );
}
