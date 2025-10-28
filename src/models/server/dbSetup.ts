import { db } from "../name";
import createAnswerCollection from "./answer.collection";
import createCommentCollection from "./comment.collection";
import { database } from "./config";
import createQuestionCollection from "./question.collection";
import createVoteCollection from "./vote.collection";

export default async function getOrCreateDB() {
  try {
    await database.get(db);
    console.log("Database Connected!");
  } catch (error) {
    try {
      await database.create(db, db);
      console.log("Database Created!");
      //create collections
      await Promise.all([
        createQuestionCollection(),
        createAnswerCollection(),
        createCommentCollection(),
        createVoteCollection(),
      ]);
      console.log("Collections Created!");
      console.log("Database Connected!");
    } catch (error) {
      console.error("Fail to create database or collections!", error);
    }
  }

  return database;
}
