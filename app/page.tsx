import InteractiveLetter from './InteractiveLetter';

export default function MainPage() {
  const dialogueObject = JSON.parse(process.env.DIALOGUES ?? '[]');
  const questionsObject = JSON.parse(process.env.QUESTIONS ?? '[]');
  const letterContent = process.env.LETTER_CONTENT?.replace(/\\n/g, "\n") ?? '';
  
  return (
    <InteractiveLetter 
      dialogueObject={dialogueObject} 
      questionsObject={questionsObject} 
      header={process.env.HEADER ?? ''}
      partnerFirstName={process.env.PARTNER_FIRST_NAME ?? ''}
      partnerLastName={process.env.PARTNER_LAST_NAME ?? ''}
      yourFirstName={process.env.YOUR_FIRST_NAME ?? ''}
      letterContent={letterContent}
    />
  )
}