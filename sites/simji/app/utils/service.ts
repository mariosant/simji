import { Permission, Query } from "appwrite";
import { tablesDB, storage, ID } from "~/utils/appwrite";

const databaseId = "68ffbc66003050654019";
const bucketId = "68ffdbc200251062ce56";

export const listPresets = async ({ page = 1, perPage = 10 }) => {
  const data = await tablesDB.listRows<Presets>({
    databaseId,
    tableId: "presets",
    queries: [Query.limit(perPage), Query.offset((page - 1) * perPage)],
  });

  return data;
};

export const getPreset = async ({ id }: { id: string }) => {
  const data = await tablesDB.getRow<Presets>({
    databaseId,
    tableId: "presets",
    rowId: id,
  });

  return data;
};

export const uploadSelfie = async (file: File) => {
  const data = await storage.createFile({
    bucketId,
    file,
    fileId: ID.unique(),
  });

  return data;
};

export const createPurchase = async ({
  preset,
  selfie,
  userId,
}: Record<string, any>) => {
  const data = await tablesDB.createRow<Purchases>({
    databaseId,
    tableId: "purchases",
    rowId: ID.unique(),
    data: {
      preset: preset.$id,
      selfieId: selfie.$id,
      status: Status.NEW,
      owner: userId,
      artifactId: null,
    },
  });

  return data;
};

export const listPurchases = async ({ page = 1, perPage = 10 }) => {
  const data = await tablesDB.listRows<Purchases>({
    databaseId,
    tableId: "purchases",
    queries: [
      Query.limit(perPage),
      Query.offset((page - 1) * perPage),
      Query.orderDesc("$createdAt"),
    ],
  });

  return data;
};
