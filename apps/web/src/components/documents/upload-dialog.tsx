"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { uploadDocument } from "@/lib/api";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

export function UploadDialog() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function onUpload() {
    if (!file) return;
    setLoading(true);
    try {
      const res = await uploadDocument(file);
      toast.success("Documento indexado", { description: `${res.chunks_added ?? 0} chunks` });
      setFile(null);
    } catch (e: any) {
      toast.error("Falha no upload", { description: String(e?.message || e) });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="w-full justify-start gap-2">
          <Upload className="h-4 w-4" />
          Upload docs (RAG)
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload de documento</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <Input
            type="file"
            accept=".txt,.md"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          <Button onClick={onUpload} disabled={!file || loading} className="w-full">
            {loading ? "Indexando..." : "Enviar e indexar"}
          </Button>

          <p className="text-xs text-zinc-400">
            MVP suporta .txt/.md. Se quiser PDF/DOCX, eu te passo a versão com loaders.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
