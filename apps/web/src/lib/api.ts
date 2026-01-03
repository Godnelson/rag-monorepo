import { storage } from "./storage";

type Role = "user" | "assistant" | "system";
export type ChatMessage = { role: Role; content: string; created_at?: string };
export type ConversationDTO = { conversation_id: string; messages: ChatMessage[] };

function baseUrl() {
  const b = storage.getApiBase();
  if (!b) throw new Error("API base não configurada");
  return b.replace(/\/$/, "");
}

function apiKeyHeader() {
  const apiKey = storage.getApiKey();
  return { "X-API-Key": apiKey };
}

export async function createConversation(): Promise<{ conversation_id: string }> {
  const res = await fetch(`${baseUrl()}/conversations`, { method: "POST", headers: apiKeyHeader() });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function getConversation(conversationId: string): Promise<ConversationDTO> {
  const res = await fetch(`${baseUrl()}/conversations/${conversationId}`, { headers: apiKeyHeader() });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function chat(conversationId: string | null, message: string) {
  const res = await fetch(`${baseUrl()}/chat`, {
    method: "POST",
    headers: { ...apiKeyHeader(), "Content-Type": "application/json" },
    body: JSON.stringify({ conversation_id: conversationId || undefined, message }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json() as Promise<{ conversation_id: string; answer: string }>;
}

export async function uploadDocument(file: File) {
  const form = new FormData();
  form.append("file", file);

  const res = await fetch(`${baseUrl()}/documents/upload`, {
    method: "POST",
    headers: apiKeyHeader(),
    body: form,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
