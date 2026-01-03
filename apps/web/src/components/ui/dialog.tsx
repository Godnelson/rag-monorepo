"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type DialogCtx = { open: boolean; setOpen: (v: boolean) => void };
const Ctx = React.createContext<DialogCtx | null>(null);

export function Dialog({ children, open: openProp, onOpenChange }: { children: React.ReactNode; open?: boolean; onOpenChange?: (v:boolean)=>void }) {
  const [open, setOpenState] = React.useState(false);
  const controlled = typeof openProp === "boolean" && !!onOpenChange;
  const valueOpen = controlled ? (openProp as boolean) : open;

  const setOpen = (v: boolean) => {
    if (controlled) onOpenChange?.(v);
    else setOpenState(v);
  };

  return <Ctx.Provider value={{ open: valueOpen, setOpen }}>{children}</Ctx.Provider>;
}

export function DialogTrigger({ asChild, children }: { asChild?: boolean; children: React.ReactElement }) {
  const ctx = React.useContext(Ctx);
  if (!ctx) throw new Error("DialogTrigger must be inside Dialog");
  const child = React.Children.only(children);
  return React.cloneElement(child, {
    onClick: (e: any) => {
      child.props.onClick?.(e);
      ctx.setOpen(true);
    },
  });
}

export function DialogContent({ children, className }: { children: React.ReactNode; className?: string }) {
  const ctx = React.useContext(Ctx);
  if (!ctx) throw new Error("DialogContent must be inside Dialog");
  if (!ctx.open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={() => ctx.setOpen(false)} />
      <div className={cn("relative w-[92vw] max-w-lg rounded-2xl border border-zinc-800 bg-zinc-950 p-5 shadow-xl", className)}>
        {children}
      </div>
    </div>
  );
}

export function DialogHeader({ children }: { children: React.ReactNode }) {
  return <div className="mb-4">{children}</div>;
}

export function DialogTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-base font-semibold">{children}</h2>;
}
