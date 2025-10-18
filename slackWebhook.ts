import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export const notifySlack = async (subject: string, sender: string) => {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) return;

  await axios.post(webhookUrl, {
    text: `📩 New *Interested* email from ${sender}: "${subject}"`,
  });

  console.log('✅ Sent Slack notification');
};
