"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
    id: number;
    text: string;
    sender: "user" | "bot";
}

const INITIAL_MESSAGE: Message = {
    id: 0,
    text: "Hello! I'm your HealthCareAI assistant. Ask me about volunteering, patient support, or our services!",
    sender: "bot",
};

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async () => {
        if (!inputValue.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now(),
            text: inputValue.trim(),
            sender: "user",
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue("");
        setIsLoading(true);

        try {
            const response = await fetch("https://health-care-ai-backend.vercel.app/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMessage.text }),
            });

            if (!response.ok) throw new Error("Failed to get response");

            const data = await response.json();
            const botMessage: Message = {
                id: Date.now() + 1,
                text: data.response,
                sender: "bot",
            };
            setMessages((prev) => [...prev, botMessage]);
        } catch {
            const errorMessage: Message = {
                id: Date.now() + 1,
                text: "Sorry, I'm having trouble connecting. Please try again later.",
                sender: "bot",
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <>
            {/* Chat Toggle Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-colors hover:bg-primary/90"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={isOpen ? "Close chat" : "Open chat"}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.15 }}
                        >
                            <X className="h-6 w-6" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="open"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.15 }}
                        >
                            <MessageCircle className="h-6 w-6" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-24 right-6 z-50 flex h-[28rem] w-80 flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-xl sm:w-96"
                    >
                        {/* Header */}
                        <div className="flex items-center gap-3 border-b border-border bg-primary/5 px-4 py-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                                <Bot className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground">
                                    HealthCareAI Assistant
                                </h3>
                                <p className="text-xs text-muted-foreground">
                                    Here to help you
                                </p>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4">
                            <div className="space-y-4">
                                {messages.map((msg) => (
                                    <motion.div
                                        key={msg.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`flex items-start gap-2 ${msg.sender === "user"
                                            ? "flex-row-reverse"
                                            : ""
                                            }`}
                                    >
                                        <div
                                            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${msg.sender === "user"
                                                ? "bg-primary/10"
                                                : "bg-muted"
                                                }`}
                                        >
                                            {msg.sender === "user" ? (
                                                <User className="h-4 w-4 text-primary" />
                                            ) : (
                                                <Bot className="h-4 w-4 text-muted-foreground" />
                                            )}
                                        </div>
                                        <div
                                            className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm ${msg.sender === "user"
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-muted text-foreground"
                                                }`}
                                        >
                                            <p className="whitespace-pre-wrap">
                                                {msg.text}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                                {isLoading && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex items-start gap-2"
                                    >
                                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted">
                                            <Bot className="h-4 w-4 text-muted-foreground" />
                                        </div>
                                        <div className="rounded-2xl bg-muted px-4 py-3">
                                            <div className="flex gap-1">
                                                <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:-0.3s]" />
                                                <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:-0.15s]" />
                                                <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50" />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>
                        </div>

                        {/* Input */}
                        <div className="border-t border-border p-3">
                            <div className="flex items-center gap-2">
                                <Input
                                    value={inputValue}
                                    onChange={(e) =>
                                        setInputValue(e.target.value)
                                    }
                                    onKeyDown={handleKeyDown}
                                    placeholder="Type your message..."
                                    className="flex-1"
                                    disabled={isLoading}
                                />
                                <Button
                                    onClick={sendMessage}
                                    size="icon"
                                    disabled={!inputValue.trim() || isLoading}
                                    aria-label="Send message"
                                >
                                    <Send className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
