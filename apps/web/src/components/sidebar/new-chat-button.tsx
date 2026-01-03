"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function NewChatButton({ onClick }: { onClick: () => void }) {
  return (
    <Button onClick={onClick} className="w-full justify-start gap-2">
      <Plus className="h-4 w-4" />
      Novo chat
    </Button>
  );
}
