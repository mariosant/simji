import { Client, Storage, TablesDB } from 'node-appwrite';
import { GoogleGenAI } from '@google/genai';

const bucketId = '68ffdbc200251062ce56';

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

export default async ({ req, res, log, error }) => {
  const body = req.bodyJson;

  if (body.$tableId !== 'purchases') {
    return;
  }

  const client = new Client()
    .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(req.headers['x-appwrite-key'] ?? '');
  const tablesDB = new TablesDB(client);
  const storage = new Storage(client);

  const purchase = await tablesDB.getRow({
    databaseId: body.$databaseId,
    tableId: body.$tableId,
    rowId: body.$id,
  });

  await tablesDB.updateRow({
    databaseId: body.$databaseId,
    tableId: body.$tableId,
    rowId: body.$id,
    data: {
      status: 'processing',
    },
  });

  const selfieFile = await storage.getFileDownload(bucketId, purchase.selfieId);

  const selfieImagePart = {
    inlineData: {
      data: Buffer.from(selfieFile).toString('base64'),
      mimeType: 'image/jpeg',
    },
  };

  const imageResponse = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: [body.preset.prompt, selfieImagePart],
  });

  const generatedImageBytes = (imageResponse.candidates || [])
    .flatMap((candidate) => candidate.content?.parts || [])
    .find(
      (part) =>
        part.inlineData && part.inlineData.mimeType?.startsWith('image/')
    )?.inlineData?.data;

  const imageBuffer = Buffer.from(generatedImageBytes, 'base64');

  const generatedFile = await storage.createFile(
    bucketId,
    'unique()',
    new File([imageBuffer], 'generated-image.jpg', { type: 'image/jpeg' })
  );

  await tablesDB.updateRow({
    databaseId: body.$databaseId,
    tableId: body.$tableId,
    rowId: body.$id,
    data: {
      status: 'complete',
      artifactId: generatedFile.$id,
    },
  });

  await storage.deleteFile({
    $id: purchase.selfieId,
    bucketId,
  });

  return res.json({
    success: true,
    status: 'completed',
  });
};
