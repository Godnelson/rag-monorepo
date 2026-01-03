import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "h-10 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-600",
        className
      )}
      {...props}
    />
  );
}
