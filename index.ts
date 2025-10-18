import express from 'express';
import dotenv from 'dotenv';
import { createIndexIfNotExists } from './elastic';
import { connectToImap, fetchRecentEmails } from './imapService';
import { categorizeEmail } from './aicategorizer';
import { notifySlack } from './slackWebhook';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('✅ OneBox Backend Running');
});

app.post('/sync', async (req, res) => {
  const { email, password, host } = req.body;

  if (!email || !password || !host) {
    return res.status(400).json({ message: 'Missing email credentials' });
  }

  try {
    const indexName = email.replace(/[@.]/g, '_');

    await createIndexIfNotExists(indexName);

    const connection = await connectToImap(email, password, host);
    await fetchRecentEmails(connection, indexName);

    res.json({ message: `Synced and indexed emails for ${email}` });
  } catch (error) {
    console.error('❌ Error syncing emails:', error);
    res.status(500).json({ error: 'Failed to sync emails' });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
