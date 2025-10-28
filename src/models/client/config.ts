import env from "@/env";
import { Client, Account, Avatars, Databases, Storage } from "appwrite";

const client = new Client()
  .setEndpoint(env.appwrite.endpoint) // Your API Endpoint
  .setProject(env.appwrite.projectId); // Your project ID

const database = new Databases(client);
const account = new Account(client);
const avatar = new Avatars(client);
const storage = new Storage(client);

export { database, account, avatar, storage };
