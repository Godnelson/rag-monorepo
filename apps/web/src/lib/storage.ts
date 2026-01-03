const K = {
  apiKey: "ragui_api_key",
  apiBase: "ragui_api_base",
  convoId: "ragui_active_conversation",
  convos: "ragui_conversations",
};

export const storage = {
  getApiKey: () => (typeof window === "undefined" ? "" : localStorage.getItem(K.apiKey) || ""),
  setApiKey: (v: string) => localStorage.setItem(K.apiKey, v),

  getApiBase: () =>
    typeof window === "undefined"
      ? process.env.NEXT_PUBLIC_API_BASE || ""
      : localStorage.getItem(K.apiBase) || process.env.NEXT_PUBLIC_API_BASE || "",
  setApiBase: (v: string) => localStorage.setItem(K.apiBase, v),

  getActiveConversationId: () =>
    typeof window === "undefined" ? "" : localStorage.getItem(K.convoId) || "",
  setActiveConversationId: (v: string) => localStorage.setItem(K.convoId, v),

  getConversations: (): { id: string; title: string }[] => {
    if (typeof window === "undefined") return [];
    try { return JSON.parse(localStorage.getItem(K.convos) || "[]"); } catch { return []; }
  },
  setConversations: (v: { id: string; title: string }[]) =>
    localStorage.setItem(K.convos, JSON.stringify(v)),
};
