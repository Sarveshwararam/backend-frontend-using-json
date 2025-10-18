import { Client } from '@elastic/elasticsearch';
import dotenv from 'dotenv';
dotenv.config();

const elasticUrl = process.env.ELASTIC_URL || 'http://localhost:9200';

export const esClient = new Client({
  node: elasticUrl,
});

export const createIndexIfNotExists = async (index: string) => {
  const exists = await esClient.indices.exists({ index });
  if (!exists) {
    await esClient.indices.create({ index });
    console.log(`✅ Created index: ${index}`);
  } else {
    console.log(`ℹ️ Index already exists: ${index}`);
  }
};
