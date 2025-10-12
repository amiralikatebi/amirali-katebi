import { useState, useRef, useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function Ai() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "I am AmirAli Katbi’s AI programming assistant. If you have any questions, feel free to ask!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // اینجا ref جدید برای کانتینر پیام‌ها:
  const messagesContainerRef = useRef(null);

  // تابع اسکرول به پایین فقط برای div پیام‌ها:
  const scrollToBottom = () => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      if (data.response) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.response },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "❌ Server error" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full gap-5 lg:w-2/3 mx-auto mt-10">
      <h1 className="text-2xl font-semibold text-center">💬 AI Chat</h1>

      <div
        ref={messagesContainerRef} // اضافه کردن رفرنس به div پیام‌ها
        className="flex flex-col gap-4 p-4 bg-muted rounded-xl max-h-[420px] min-h-[420px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`p-3 rounded-2xl max-w-[80%] text-sm leading-7 ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start text-muted-foreground text-sm">
            <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Thinking...
          </div>
        )}
      </div>

      <form
        onSubmit={handleSend}
        className="flex items-center gap-2 border rounded-lg p-2 bg-background"
      >
        <input
          type="text"
          className="flex-1 px-3 py-2 rounded-md bg-transparent outline-none text-sm"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}
