import Dexie from "dexie";

const db = new Dexie("myDb");
db.version(1).stores({
  categories: "++id",
  tasks: "++id",
});

export default db;
