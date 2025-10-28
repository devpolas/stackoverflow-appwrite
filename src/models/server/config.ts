import env from "@/env";
import { Avatars, Client, Databases, Storage, Users } from "node-appwrite";

const client = new Client();

client
  .setEndpoint(env.appwrite.endpoint) // Your API Endpoint
  .setProject(env.appwrite.projectId) // Your project ID
  .setKey(env.appwrite.apikey); // Your secret API key

const database = new Databases(client);
const user = new Users(client);
const avatar = new Avatars(client);
const storage = new Storage(client);

export { database, user, avatar, storage };
