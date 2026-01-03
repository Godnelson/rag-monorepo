"use client";

import { useEffect, useMemo, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NewChatButton } from "@/components/sidebar/new-chat-button";
import { UploadDialog } from "@/components/documents/upload-dialog";
import { Button } from "@/components/ui/button";
import { storage } from "@/lib/storage";
import { createConversation, getConversation } from "@/lib/api";
import { toast } from "sonner";
import { MessageSquare, Settings } from "lucide-react";

type ConvoItem = { id: string; title: string };

export function ConversationsSidebar({ onOpenSettings }: { onOpenSettings: () => void }) {
  const [items, setItems] = useState<ConvoItem[]>([]);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const a = storage.getActiveConversationId();
    setActive(a);
    setItems(storage.getConversations());
  }, []);

  function persist(next: ConvoItem[]) {
    setItems(next);
    storage.setConversations(next);
  }

  async function newChat() {
    try {
      const { conversation_id } = await createConversation();
      storage.setActiveConversationId(conversation_id);
      setActive(conversation_id);

      const short = conversation_id.slice(0, 8);
      persist([{ id: conversation_id, title: `Chat ${short}` }, ...items]);
      toast.success("Conversa criada");
      window.dispatchEvent(new Event("ragui:active_conversation_changed"));
    } catch (e: any) {
      toast.error("Erro ao criar conversa", { description: String(e?.message || e) });
    }
  }

  async function openConvo(id: string) {
    storage.setActiveConversationId(id);
    setActive(id);
    window.dispatchEvent(new Event("ragui:active_conversation_changed"));
    try {
      await getConversation(id);
    } catch {
      toast.warning("Não consegui carregar do backend (API base/key?)");
    }
  }

  const list = useMemo(() => items, [items]);

  return (
    <aside className="w-[320px] border-r border-zinc-900 bg-zinc-950/60">
      <div className="p-3 space-y-2">
        <NewChatButton onClick={newChat} />
        <UploadDialog />

        <Button variant="ghost" className="w-full justify-start gap-2" onClick={onOpenSettings}>
          <Settings className="h-4 w-4" />
          Settings
        </Button>
      </div>

      <div className="px-3 pb-2 text-xs font-medium text-zinc-400">
        Conversas
      </div>

      <ScrollArea className="h-[calc(100vh-170px)] px-2 pb-3">
        <div className="space-y-1">
          {list.length === 0 ? (
            <div className="px-2 py-6 text-sm text-zinc-400">
              Crie um “Novo chat” pra começar.
            </div>
          ) : (
            list.map((c) => (
              <button
                key={c.id}
                onClick={() => openConvo(c.id)}
                className={`w-full rounded-xl px-2 py-2 text-left text-sm transition hover:bg-zinc-900
                ${active === c.id ? "bg-zinc-900" : ""}`}
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-zinc-400" />
                  <span className="truncate">{c.title}</span>
                </div>
              </button>
            ))
          )}
        </div>
      </ScrollArea>
    </aside>
  );
}
