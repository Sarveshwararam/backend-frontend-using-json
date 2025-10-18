export const categorizeEmail = (text: string): string => {
  text = text.toLowerCase();

  if (text.includes('meeting')) return 'Meeting Booked';
  if (text.includes('interested')) return 'Interested';
  if (text.includes('not interested')) return 'Not Interested';
  if (text.includes('spam')) return 'Spam';
  if (text.includes('out of office')) return 'Out of Office';

  return 'Uncategorized';
};
