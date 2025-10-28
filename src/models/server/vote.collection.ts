import { Permission } from "node-appwrite";
import { db, voteCollection } from "../name";
import { database } from "./config";

export default async function createVoteCollection() {
  // create question collection
  await database.createCollection(db, voteCollection, voteCollection, [
    Permission.read("any"),
    Permission.read("users"),
    Permission.write("users"),
    Permission.update("users"),
    Permission.delete("users"),
  ]);

  console.log("Question Collection Created!");

  await Promise.all([
    database.createStringAttribute(db, voteCollection, "votedById", 100, true),
    database.createStringAttribute(db, voteCollection, "typeId", 100, true),
    database.createEnumAttribute(
      db,
      voteCollection,
      "type",
      ["question", "answer"],
      true
    ),
    database.createEnumAttribute(
      db,
      voteCollection,
      "voteStatus",
      ["upvoted", "downvoted"],
      true
    ),
  ]);
  console.log("Question Collection Attributes are Created!");
}
