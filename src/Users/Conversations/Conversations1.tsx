import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/Layout/Layout";
import { Fragment, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  MessageSquarePlus,
  SendHorizontal,
  Trash2,
  PanelLeftClose,
  PanelLeftOpen,
  Loader2,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import {
  createConversation,
  getAllConversations,
  getConversationById,
  deleteConversationById,
} from "@/Services/conversation.service";
import { Message, Conversation } from "./conver.types";
import { toast } from "sonner";
import { ConversationDialog } from "./Conversations2";

export default function Conversations1() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<string | null>(
    null
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoadingConversations, setIsLoadingConversations] = useState(true);

  const deleteConversation = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const response = await deleteConversationById(id);
      console.log(response);
      setConversations((prev) => prev.filter((conv) => conv.id !== id));
      if (activeConversation === id) {
        setActiveConversation(null);
        setMessages([]);
      }
      toast.success("Conversation deleted successfully");
    } catch (error) {
      console.error("Error deleting conversation:", error);
      toast.error("Failed to delete conversation");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !activeConversation) return;

    const userMessage: Message = {
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Update conversation last message
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === activeConversation
          ? { ...conv, lastMessage: userMessage.content, timestamp: new Date() }
          : conv
      )
    );

    try {
      // Simulate API response
      setTimeout(() => {
        const assistantMessage: Message = {
          role: "assistant",
          content:
            "This is a sample response. Replace with actual API integration.",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Failed to send message:", error);
      setIsLoading(false);
    }
  };

  //   get all conversations

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setIsLoadingConversations(true);
        const response = await getAllConversations();
        const transformedConversations: Conversation[] = response.data.map(
          (conv) => ({
            id: conv._id,
            title: conv.title,
            lastMessage: "", // You might want to get this from the last message in conv.messages
            timestamp: new Date(conv.createdAt),
            messages: conv.messages,
          })
        );

        setConversations(transformedConversations);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      } finally {
        setIsLoadingConversations(false);
      }
    };

    fetchConversations();
  }, []);

  //   get conversation by id

  useEffect(() => {
    const fetchConversationById = async () => {
      if (activeConversation) {
        try {
          const response = await getConversationById(activeConversation);
          if (response.data) {
            // Transform the messages from the response
            const transformedMessages: Message[] = response.data.messages.map(
              (msg: any) => ({
                role: msg.role,
                content: msg.content,
                timestamp: new Date(msg.timestamp),
              })
            );
            setMessages(transformedMessages);
          }
        } catch (error) {
          console.error("Error fetching conversation:", error);
        } finally {
          setIsLoading(false); // Reset loading state after fetch completes
        }
      }
    };

    if (activeConversation) {
      fetchConversationById();
    }
  }, [activeConversation]);

  //   create new conversation

  const createNewConversation = async (title: string) => {
    try {
      // Assuming you have documentIds available in your component
      const data = {
        title: title,
        documentIds: [],
      };
      const response = await createConversation(data);
      const newConversation: Conversation = {
        id: response.data._id,
        title: response.data.title,
        lastMessage: "",
        timestamp: new Date(response.data.createdAt),
        messages: [],
      };

      setConversations((prev) => [newConversation, ...prev]);
      setActiveConversation(newConversation.id);
      setMessages([]);
      toast.success("Conversation created successfully");
    } catch (error) {
      console.error("Error creating conversation:", error);
      toast.error("Failed to create conversation");
    }
  };

  return (
    <Fragment>
      <Layout>
        <div className="flex h-[calc(100vh-8rem)] relative">
          {/* Sidebar Card */}
          <Card
            className={cn(
              "transition-all duration-500 ease-in-out h-full absolute z-40 lg:relative",
              "w-[320px]",
              "max-w-[90vw] sm:max-w-[320px]",
              isSidebarOpen
                ? "translate-x-0 opacity-100 shadow-xl lg:shadow-none"
                : "-translate-x-full opacity-0 lg:hidden"
            )}
          >
            <CardHeader className="p-4 flex flex-row items-center justify-between space-y-0">
              <ConversationDialog
                onCreateConversation={createNewConversation}
              />
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0 ml-2"
                onClick={() => setIsSidebarOpen(false)}
              >
                <PanelLeftClose className="h-4 w-4" />
              </Button>
            </CardHeader>

            <CardContent className="p-2 flex-1 overflow-auto">
              {isLoadingConversations ? (
                <div className="flex items-center justify-center h-full">
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Loading conversations...
                    </p>
                  </div>
                </div>
              ) : conversations.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                  <MessageSquarePlus className="h-8 w-8 mb-2" />
                  <p className="text-sm">No conversations yet</p>
                  <p className="text-xs">Start a new chat to begin</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {conversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      onClick={() => {
                        setActiveConversation(conversation.id);
                        setMessages([]); // Clear messages while loading
                        setIsLoading(true); // Show loading state
                      }}
                      className={cn(
                        "p-3 rounded-lg cursor-pointer group flex justify-between items-start",
                        activeConversation === conversation.id
                          ? "bg-primary/10"
                          : "hover:bg-muted"
                      )}
                    >
                      <div className="flex-1 min-w-0 items-center">
                        <p className="font-medium truncate">
                          {conversation.title}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {conversation.lastMessage || "No messages yet"}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={(e) => deleteConversation(conversation.id, e)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Main Chat Card with Toggle Button */}
          <Card
            className={cn(
              "transition-all duration-300 ease-in-out flex flex-col flex-1",
              "w-full",
              isSidebarOpen && "lg:ml-4"
            )}
          >
            <CardHeader className="p-4 flex flex-row items-center">
              {!isSidebarOpen && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="mr-4"
                  onClick={() => setIsSidebarOpen(true)}
                >
                  <PanelLeftOpen className="h-4 w-4" />
                </Button>
              )}
              <CardTitle className="text-xl">
                {activeConversation
                  ? conversations.find((c) => c.id === activeConversation)
                      ?.title
                  : "Select or start a new conversation"}
              </CardTitle>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col overflow-hidden p-4">
              {activeConversation ? (
                <>
                  {/* Messages Area */}
                  <div className="flex-1 overflow-auto pr-4 mb-4">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex gap-3 mb-4 ${
                          message.role === "assistant"
                            ? "bg-muted/50 p-4 rounded-lg"
                            : ""
                        }`}
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={
                              message.role === "assistant"
                                ? "/ai-avatar.png"
                                : "/user-avatar.png"
                            }
                            alt={message.role}
                          />
                          <AvatarFallback>
                            {message.role === "assistant" ? "AI" : "ME"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="font-medium mb-1">
                            {message.role === "assistant"
                              ? "AI Assistant"
                              : "You"}
                          </div>
                          <div className="text-sm text-muted-foreground whitespace-pre-wrap">
                            {message.content}
                          </div>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex gap-3 mb-4 bg-muted/50 p-4 rounded-lg">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>AI</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="font-medium mb-1">AI Assistant</div>
                          <div className="text-sm text-muted-foreground">
                            Thinking...
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Input Area */}
                  <form onSubmit={handleSubmit} className="relative">
                    <Textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Type your message here..."
                      className="min-h-[100px] max-h-[200px] pr-12 resize-none"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSubmit(e);
                        }
                      }}
                    />
                    <Button
                      size="icon"
                      type="submit"
                      disabled={isLoading || !input.trim()}
                      className="absolute bottom-4 right-4"
                    >
                      <SendHorizontal className="h-4 w-4" />
                    </Button>
                  </form>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Select a conversation or start a new one
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </Layout>
    </Fragment>
  );
}
