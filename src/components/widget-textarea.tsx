import { db, type TextWidget } from "@/lib/db";
import { Textarea } from "./ui/textarea";
import { useEffect, useState } from "react";

export function WidgetTextarea({ widget }: { widget: TextWidget }) {
  const [content, setContent] = useState(widget.content);

  useEffect(() => {
    const timeout = setTimeout(() => {
      db.textWidgets.update(widget.id, { content });
    }, 1000);

    return () => clearTimeout(timeout);
  }, [content, widget.id]);

  return (
    <div className="flex flex-col gap-2">
      <Textarea
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
        maxLength={1000}
        className="resize-none"
        aria-label="Widget text area"
      />
      <p className="text-sm text-muted-foreground text-right">
        {content.length} / 1000
      </p>
      <span className="sr-only" aria-live="polite" role="status">
        {content.length} characters
      </span>
    </div>
  );
}
