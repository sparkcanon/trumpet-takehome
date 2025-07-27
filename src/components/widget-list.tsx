import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { WidgetTextarea } from "./widget-textarea";

export function WidgetList() {
  const widgets = useLiveQuery(() => db.textWidgets.toArray(), []);

  if (!widgets?.length)
    return (
      <div className="text-center text-sm text-muted-foreground h-full flex items-center justify-center gap-2">
        <span>No widgets found. Add one above.</span>
        <span className="sr-only" aria-live="polite" role="status">
          No widgets found. Add one above.
        </span>
      </div>
    );

  return (
    <>
      <ul className="flex flex-col gap-4 w-md mx-auto">
        {widgets?.map((widget) => (
          <li key={widget.id}>
            <Card>
              <CardHeader>
                <CardTitle>Widget #{widget.id}</CardTitle>
              </CardHeader>
              <CardContent>
                <WidgetTextarea widget={widget} />
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
          </li>
        ))}
      </ul>
      <span className="sr-only" aria-live="polite" role="status">
        {widgets.length} widgets found
      </span>
    </>
  );
}
