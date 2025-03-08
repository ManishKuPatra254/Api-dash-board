import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquarePlus } from "lucide-react";

interface ConversationDialogProps {
  onCreateConversation: (title: string) => void;
  trigger?: React.ReactNode;
}

export function ConversationDialog({
  onCreateConversation,
  trigger,
}: ConversationDialogProps) {
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onCreateConversation(title.trim());
      setTitle(""); // Reset the input
      setOpen(false); // Close the dialog
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        {trigger || (
          <Button
            variant="outline"
            className="gap-2 cursor-pointer flex-1 text-xs"
          >
            <MessageSquarePlus className="h-4 w-4" />
            New Chat
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create New Conversation</AlertDialogTitle>
          <AlertDialogDescription>
            Enter a title for your new conversation
          </AlertDialogDescription>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter conversation title"
            className="mt-4"
          />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-xs">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit} className="text-xs">
            Create
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
