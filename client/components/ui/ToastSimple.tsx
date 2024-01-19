"use client";

import { Button } from "@/components/UI/button";
import { useToast } from "@/components/UI/use-toast";

export function ToastSimple() {
  const { toast } = useToast();

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          description: "Your message has been sent.",
        });
      }}
    >
      Show Toast
    </Button>
  );
}
