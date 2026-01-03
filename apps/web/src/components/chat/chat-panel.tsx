"use client";

import { useEffect, useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageBubble } from "@/components/chat/message-bubble";
import { chat, getConversation } from "@/lib/api";
import { storage } from "@/lib/storage";
import { toast } from "sonner";
import { Send, Sparkles } from "lucide-react";

type UIMessage = { role: "user" | "assistant"; content: string };

export function ChatPanel() {
  const [conversationId, setConversationId] = useState<string>("");
  const [messages, setMessages] = useState<UIMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  function scrollBottom() {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  async function loadActiveConversation() {
    const id = storage.getActiveConversationId();
    setConversationId(id);

    if (!id) {
      setMessages([]);
      return;
    }

    try {
      const convo = await getConversation(id);
      const ui = (convo.messages || [])
        .filter((m) => m.role === "user" || m.role === "assistant")
        .map((m) => ({ role: m.role as "user" | "assistant", content: m.content }));
      setMessages(ui);
      setTimeout(scrollBottom, 50);
    } catch {
      setMessages([]);
      toast.warning("Não consegui carregar a conversa", {
        description: "Cheque API Base e X-API-Key em Settings.",
      });
    }
  }

  useEffect(() => {
    loadActiveConversation();
    const handler = () => loadActiveConversation();
    window.addEventListener("ragui:active_conversation_changed", handler);
    return () => window.removeEventListener("ragui:active_conversation_changed", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onSend() {
    const text = input.trim();
    if (!text || loading) return;

    setLoading(true);
    setInput("");

    const optimistic: UIMessage[] = [...messages, { role: "user", content: text }];
    setMessages(optimistic);
    setTimeout(scrollBottom, 10);

    try {
      const res = await chat(conversationId || null, text);
      if (!conversationId) {
        storage.setActiveConversationId(res.conversation_id);
        setConversationId(res.conversation_id);
        // opcional: adicionar na sidebar automaticamente
        const list = storage.getConversations();
        if (!list.some((x) => x.id === res.conversation_id)) {
          storage.setConversations([{ id: res.conversation_id, title: `Chat ${res.conversation_id.slice(0,8)}` }, ...list]);
        }
        window.dispatchEvent(new Event("ragui:active_conversation_changed"));
      }
      setMessages([...optimistic, { role: "assistant", content: res.answer }]);
      setTimeout(scrollBottom, 10);
    } catch (e: any) {
      toast.error("Falha ao enviar", { description: String(e?.message || e) });
      setMessages(optimistic);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1">
        <ScrollArea className="h-full">
          <div className="mx-auto max-w-5xl px-4 py-6 space-y-4">
            {messages.length === 0 ? (
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-6 shadow-sm">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-zinc-400" />
                  <h2 className="text-lg font-semibold">Pronto.</h2>
                </div>
                <p className="mt-2 text-sm text-zinc-400">
                  Crie um chat, faça upload de docs e pergunte algo. O RAG vai puxar contexto do seu Chroma.
                </p>
              </div>
            ) : (
              messages.map((m, idx) => (
                <MessageBubble key={idx} role={m.role} content={m.content} />
              ))
            )}
            <div ref={bottomRef} />
          </div>
        </ScrollArea>
      </div>

      <div className="border-t border-zinc-900 bg-zinc-950/70 backdrop-blur">
        <div className="mx-auto max-w-5xl px-4 py-4">
          <div className="flex gap-3">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pergunte algo… (Shift+Enter quebra linha)"
              className="min-h-[52px] resize-none"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  onSend();
                }
              }}
            />
            <Button onClick={onSend} disabled={loading || !input.trim()} className="h-[52px] rounded-2xl px-5">
              <Send className="h-4 w-4" />
              <span className="hidden sm:inline">Enviar</span>
            </Button>
          </div>

          <div className="mt-2 text-xs text-zinc-500">
            Dica: se der 429, é rate limit do backend.
          </div>
        </div>
      </div>
    </div>
  );
}
