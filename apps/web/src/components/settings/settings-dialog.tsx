"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { storage } from "@/lib/storage";
import { toast } from "sonner";

export function SettingsDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [apiBase, setApiBase] = useState("");
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    if (open) {
      setApiBase(storage.getApiBase());
      setApiKey(storage.getApiKey());
    }
  }, [open]);

  function save() {
    storage.setApiBase(apiBase);
    storage.setApiKey(apiKey);
    toast.success("Settings salvos");
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-sm font-medium">API Base</label>
            <Input value={apiBase} onChange={(e) => setApiBase(e.target.value)} placeholder="http://localhost:8080" />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">X-API-Key</label>
            <Input value={apiKey} onChange={(e) => setApiKey(e.target.value)} placeholder="changeme-super-secret" />
          </div>

          <Button className="w-full" onClick={save}>
            Salvar
          </Button>

          <p className="text-xs text-zinc-400">
            MVP usa API key. Dá pra trocar por login/JWT depois.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
