import { Permission } from "node-appwrite";
import { db, commentCollection, questionCollection } from "../name";
import { database } from "./config";

export default async function createCommentCollection() {
  await database.createCollection(db, commentCollection, commentCollection, [
    Permission.read("any"),
    Permission.read("users"),
    Permission.write("users"),
    Permission.update("users"),
    Permission.delete("users"),
  ]);

  console.log("Comment Collection Created!");

  await Promise.all([
    database.createEnumAttribute(
      db,
      commentCollection,
      "type",
      ["answer", "question"],
      true
    ),
    database.createStringAttribute(
      db,
      commentCollection,
      "content",
      10000,
      true
    ),
    database.createStringAttribute(db, commentCollection, "typeId", 50, true),
    database.createStringAttribute(db, commentCollection, "authorId", 50, true),
  ]);

  console.log("Comment Collection Attributes are Created!");
}
