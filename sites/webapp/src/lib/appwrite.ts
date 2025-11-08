import { Client, Account, TablesDB, Storage } from 'appwrite';

export const client = new Client();

client.setEndpoint('https://fra.cloud.appwrite.io/v1').setProject('68f34d680034ef213d70');

export const account = new Account(client);
export const tablesDB = new TablesDB(client);
export const storage = new Storage(client);

export const filesBucketId = '68ffdbc200251062ce56';
