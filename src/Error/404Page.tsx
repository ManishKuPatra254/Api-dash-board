import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Construction } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full bg-card rounded-lg border p-8 text-center">
        <Construction className="h-16 w-16 text-primary mx-auto mb-6 animate-bounce" />

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Page Under Construction</h2>

          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary animate-pulse w-1/2"></div>
          </div>

          <p className="text-muted-foreground text-sm">
            We're currently working on something awesome! Please check back
            later.
          </p>

          <Button
            onClick={() => navigate(-1)}
            className="mt-6 text-xs"
            variant="outline"
            size="sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
