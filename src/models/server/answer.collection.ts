import { Permission } from "node-appwrite";
import { answerCollection, db } from "../name";
import { database } from "./config";

export default async function createAnswerCollection() {
  // create answer collection
  await database.createCollection(db, answerCollection, answerCollection, [
    Permission.read("any"),
    Permission.read("users"),
    Permission.write("users"),
    Permission.update("users"),
    Permission.delete("users"),
  ]);

  console.log("Answer Collection Created!");

  await Promise.all([
    database.createStringAttribute(
      db,
      answerCollection,
      "content",
      10000,
      true
    ),
    database.createStringAttribute(
      db,
      answerCollection,
      "questionId",
      100,
      true
    ),
    database.createStringAttribute(db, answerCollection, "authorId", 100, true),
  ]);
  console.log("Answer Collection Attributes are Created!");
}
