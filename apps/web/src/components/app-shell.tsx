"use client";

import { ReactNode, useEffect, useState } from "react";
import { ConversationsSidebar } from "@/components/sidebar/conversations-sidebar";
import { SettingsDialog } from "@/components/settings/settings-dialog";
import { storage } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

export function AppShell({ children }: { children: ReactNode }) {
  const [openSettings, setOpenSettings] = useState(false);
  const [hasKey, setHasKey] = useState(true);

  useEffect(() => {
    setHasKey(!!storage.getApiKey());
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden">
      <div className="flex h-full">
        <ConversationsSidebar onOpenSettings={() => setOpenSettings(true)} />

        <main className="flex-1">
          <div className="flex items-center justify-between border-b border-zinc-900 px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-sm font-medium">Chat + RAG</span>
              {!hasKey && (
                <span className="ml-2 text-xs text-zinc-400">
                  Configure a API Key em Settings
                </span>
              )}
            </div>

            <Button variant="ghost" size="icon" onClick={() => setOpenSettings(true)}>
              <Settings className="h-5 w-5" />
            </Button>
          </div>

          <div className="h-[calc(100vh-57px)]">{children}</div>
        </main>
      </div>

      <SettingsDialog
        open={openSettings}
        onOpenChange={(v) => {
          setOpenSettings(v);
          setHasKey(!!storage.getApiKey());
        }}
      />
    </div>
  );
}
