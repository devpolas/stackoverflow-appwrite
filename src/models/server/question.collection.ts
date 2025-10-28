import { IndexType, Permission } from "node-appwrite";
import { db, questionCollection } from "../name";
import { database } from "./config";

export default async function createQuestionCollection() {
  // create collection
  await database.createCollection(db, questionCollection, questionCollection, [
    Permission.read("any"),
    Permission.read("users"),
    Permission.write("users"),
    Permission.update("users"),
    Permission.delete("users"),
  ]);

  console.log("Question Collection Created!");

  // create attributes

  await Promise.all([
    database.createStringAttribute(db, questionCollection, "title", 100, true),
    database.createStringAttribute(
      db,
      questionCollection,
      "content",
      10000,
      true
    ),
    database.createStringAttribute(
      db,
      questionCollection,
      "authorId",
      50,
      true
    ),
    database.createStringAttribute(
      db,
      questionCollection,
      "tags",
      100,
      true,
      undefined,
      true
    ),
    database.createStringAttribute(
      db,
      questionCollection,
      "attachmentId",
      100,
      true
    ),
    database.createStringAttribute(db, questionCollection, "title", 50, false),
  ]);

  console.log("Question Collection Attributes Created!");

  // create index
  // now create index manually this code may work future
  /*
  await Promise.all([
    database.createIndex(
      db,
      questionCollection,
      "title",
      IndexType.Fulltext,
      ["title"],
      ["asc"]
    ),
    database.createIndex(
      db,
      questionCollection,
      "content",
      IndexType.Fulltext,
      ["content"],
      ["asc"]
    ),
  ]);
  console.log("Indexes are created!");
  */
}
