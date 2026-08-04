import { useEffect, useState } from "react";
import { StickyNote } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/input";

const KEY = "eaa.quicknotes";

/** A persistent scratchpad widget (stored separately in localStorage). */
export function QuickNotes() {
  const [notes, setNotes] = useState("");

  useEffect(() => {
    setNotes(localStorage.getItem(KEY) ?? "Board deck due Friday.\nAsk Lena to shadow Sara's next demo.");
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => localStorage.setItem(KEY, notes), 300);
    return () => window.clearTimeout(id);
  }, [notes]);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm">
          <StickyNote className="h-4 w-4 text-warning" /> Quick notes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Jot something down…"
          className="min-h-[120px] resize-none border-0 bg-transparent px-0 focus-visible:ring-0"
        />
      </CardContent>
    </Card>
  );
}
