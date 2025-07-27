import Dexie, { type EntityTable } from "dexie";

interface TextWidget {
  id: string;
  content: string;
}

const db = new Dexie("TextWidgetDatabase") as Dexie & {
  textWidgets: EntityTable<TextWidget, "id">;
};

db.version(1).stores({
  textWidgets: "++id, content",
});

export type { TextWidget };
export { db };
