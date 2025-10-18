# OneBox Email Aggregator

A highly functional **onebox email aggregator** inspired by Reachinbox. This project synchronizes multiple IMAP email accounts in real-time and provides a searchable, AI-powered interface for managing and responding to emails.

Built with **TypeScript** and **Node.js**, the project supports end-to-end functionality from backend email sync to frontend AI-assisted email management.

---

## 🚀 Features

### 1. Real-Time Email Synchronization
- Connect and sync multiple IMAP accounts (minimum 2).
- Fetch emails from the last 30 days.
- Maintain persistent IMAP connections using **IDLE mode** for real-time updates (no cron jobs).

### 2. Searchable Storage using Elasticsearch
- Store emails in a locally hosted **Elasticsearch** instance (via Docker).
- Indexed storage for fast and accurate search.
- Support filtering by folder and account.

### 3. AI-Based Email Categorization
- Automatically categorize emails into:
  - Interested
  - Meeting Booked
  - Not Interested
  - Spam
  - Out of Office
- Uses AI/ML model for smart classification.

### 4. Slack & Webhook Integration
- Send Slack notifications for every new **Interested** email.
- Trigger external automation using webhooks (e.g., [webhook.site](https://webhook.site)).

### 5. Frontend Interface
- Display emails with AI categorization.
- Filter by folder/account.
- Search emails using Elasticsearch.
- Simple, responsive UI for easy email management.

### 6. AI-Powered Suggested Replies
- Store product and outreach agenda in a **vector database**.
- Use **RAG (Retrieval-Augmented Generation)** with an LLM to suggest replies automatically.
- Example:

  **Training Data:**  
  "I am applying for a job position. If the lead is interested, share the meeting booking link: https://cal.com/example"

  **Email Received:**  
  "Hi, Your resume has been shortlisted. When will be a good time for you to attend the technical int
