import Imap from 'imap-simple';
import { simpleParser } from 'mailparser';
import { esClient } from './elastic';

export const connectToImap = async (email: string, password: string, host: string, port = 993) => {
  const config = {
    imap: {
      user: email,
      password,
      host,
      port,
      tls: true,
      authTimeout: 3000,
    },
  };
  return await Imap.connect(config);
};

export const fetchRecentEmails = async (connection: any, indexName: string) => {
  await connection.openBox('INBOX');
  const sinceDate = new Date();
  sinceDate.setDate(sinceDate.getDate() - 30);

  const searchCriteria = [['SINCE', sinceDate.toISOString().split('T')[0]]];
  const fetchOptions = { bodies: ['HEADER', 'TEXT'], markSeen: false };

  const messages = await connection.search(searchCriteria, fetchOptions);

  for (const item of messages) {
    const all = item.parts.find((part: any) => part.which === 'TEXT');
    const parsed = await simpleParser(all.body);
    const doc = {
      subject: parsed.subject,
      from: parsed.from?.text,
      to: parsed.to?.text,
      date: parsed.date,
      text: parsed.text,
    };

    await esClient.index({
      index: indexName,
      body: doc,
    });

    console.log(`📨 Indexed email: ${parsed.subject}`);
  }

  console.log(`✅ Finished syncing emails for ${indexName}`);
};
