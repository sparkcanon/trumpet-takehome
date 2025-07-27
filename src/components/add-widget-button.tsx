import { db } from "@/lib/db";
import { Button } from "./ui/button";

export function AddWidgetButton() {
  return (
    <Button
      onClick={() => {
        db.textWidgets.add({
          content: "Add some text here",
        });
      }}
    >
      Add Widget
    </Button>
  );
}
