import db from "./dbProvider";

export default class CategoryService {
  async addCategory(title, description) {
    db.table("categories")
      .add({ title, description })
      .then((id) => {
        return id;
      });
  }
  async getById(id) {
    await db.table("categories").get(id);
  }
  async remove(id) {
    await db.table("categories").delete(id);
  }
  async getAll() {
    return await db.table("categories").toArray();
  }
  async update(category) {
    db.table("categories").update(category.id, category);
  }
}
