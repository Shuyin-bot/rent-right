import { useState, useCallback, useRef } from "react";

export interface AgentResponse {
  message: string;
  case_type: string | null;
  urgency: "low" | "medium" | "high" | null;
  legal_basis: string[] | null;
  letter_subject: string | null;
  letter_body: string | null;
  legal_note: string | null;
  timeline: string[] | null;
}

export function useChat() {
  const [response, setResponse] = useState<AgentResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sessionId = useRef<string>(crypto.randomUUID());

  const ask = useCallback(async (prompt: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/assistant/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId.current, prompt }),
      });
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data: AgentResponse = await res.json();
      setResponse(data);
      return data;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setError(msg);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    sessionId.current = crypto.randomUUID();
    setResponse(null);
    setError(null);
  }, []);

  return { ask, reset, response, isLoading, error };
}
