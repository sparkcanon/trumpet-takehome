import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

export function WidgetList() {
  const widgets = useLiveQuery(() => db.textWidgets.toArray(), []);

  if (!widgets?.length)
    return (
      <div className="text-center text-sm text-muted-foreground h-full flex items-center justify-center">
        No widgets found. Add one above.
      </div>
    );

  return (
    <div className="flex flex-col gap-4 w-md mx-auto">
      {widgets?.map((widget) => (
        <Card key={widget.id}>
          <CardHeader>
            <CardTitle>Widget #{widget.id}</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={widget.content}
              onChange={(e) => {
                db.textWidgets.update(widget.id, { content: e.target.value });
              }}
            />
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              onClick={() => {
                db.textWidgets.delete(widget.id);
              }}
            >
              Delete
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
