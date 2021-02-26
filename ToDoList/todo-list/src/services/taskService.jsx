import db from "./dbProvider";

export default class TaskService {
  async addTask(title, description, category) {
    db.table("tasks")
      .add({ title, description, category })
      .then((id) => {
        return id;
      });
  }
  async getById(id) {
    db.table("tasks")
      .get(id)
      .then((task) => {
        return task;
      });
  }
  async remove(id) {
    await db.table("tasks").delete(id);
  }
  async getAll() {
    return await db.table("tasks").toArray();
  }
  async update(task) {
    db.table("tasks").update(task.id, task);
  }
}
