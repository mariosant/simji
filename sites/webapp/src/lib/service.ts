import { Permission, Query, ID, Role } from 'appwrite';
import { tablesDB, storage } from './appwrite';
import { type Presets, type Purchases, Status } from './appwrite-types';

const databaseId = '68ffbc66003050654019';
const bucketId = '68ffdbc200251062ce56';

export const listPresets = async ({ page = 1, perPage = 10 }) => {
	const data = await tablesDB.listRows<Presets>({
		databaseId,
		tableId: 'presets',
		queries: [Query.limit(perPage), Query.offset((page - 1) * perPage)]
	});

	return data;
};

export const getPreset = async ({ id }: { id: string }) => {
	const data = await tablesDB.getRow<Presets>({
		databaseId,
		tableId: 'presets',
		rowId: id
	});

	return data;
};

export const uploadSelfie = async (file: File) => {
	const data = await storage.createFile({
		bucketId,
		file,
		fileId: ID.unique()
	});

	return data;
};

export const createPurchase = async ({ preset, selfie, userId }: Record<string, any>) => {
	const data = await tablesDB.createRow<Purchases>({
		databaseId,
		tableId: 'purchases',
		rowId: ID.unique(),
		data: {
			preset: preset.$id,
			selfieId: selfie.$id,
			status: Status.NEW,
			owner: userId,
			artifactId: null
		},
		permissions: [Permission.read(Role.user(userId)), Permission.update(Role.user(userId))]
	});

	return data;
};

export const listPurchases = async ({ page = 1, perPage = 10 }) => {
	const data = await tablesDB.listRows<Purchases>({
		databaseId,
		tableId: 'purchases',
		queries: [
			Query.limit(perPage),
			Query.offset((page - 1) * perPage),
			Query.orderDesc('$createdAt')
		]
	});

	return data;
};

export const getPurchase = async ({ id }: { id: string }) => {
	console.log({
		databaseId,
		tableId: 'purchases',
		rowId: id
	});
	const data = await tablesDB.getRow<Purchases>({
		databaseId,
		tableId: 'purchases',
		rowId: id
	});

	return data;
};
