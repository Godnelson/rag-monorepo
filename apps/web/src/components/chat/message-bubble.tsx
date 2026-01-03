import { cn } from "@/lib/utils";

export function MessageBubble({ role, content }: { role: "user" | "assistant"; content: string }) {
  const isUser = role === "user";
  return (
    <div className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[780px] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm border",
          isUser
            ? "bg-white text-zinc-950 border-white/20"
            : "bg-zinc-900/60 border-zinc-800"
        )}
      >
        <pre className="whitespace-pre-wrap font-sans">{content}</pre>
      </div>
    </div>
  );
}
