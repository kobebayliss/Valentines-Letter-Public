# Valentines Letter

This is an interactive React love letter website with dialogue, a personalisable quiz, a personalisable letter, and a clean frontend with smooth animation.

## Features

- Clean frontend design – Tailwind used to create seamless animation and transitions between states
- Personalisable quiz – Add as many customised questions with their answers as you like as a prerequisite to open the letter
- Personalisable letter – Write a custom message on the card of any length for the recipient to read

<br>**Motivation**<br>
Built to turn a simple letter into an experience for someone.

**Technology**<br>
Frontend made with React and Tailwind. Development testing with Next.js.

## Future Plans
- More stages for letter (mini games, my favourite pictures, etc.)
- Move quiz questions and answers to Next.js server so inspecting bundle will not reveal answers<br>

## Installation and Setup
```bash
# Clone repository
git clone https://github.com/kobebayliss/Valentines-Letter-Public.git
cd Valentines-Letter-Public

# Install dependencies
npm install

# Set up environment variables
# Create .env file
# 'index' represents order in which dialogues/questions will be displayed
# Dialogues show for 5 seconds, and questions show until answered
# Insert these into .env:
# DIALOGUES=[{"index": 1, "dialogue": "DIALOGUE HERE"}, {"index": 2, "dialogue": "DIALOGUE HERE"}]
# QUESTIONS=[{"index": 3, "question": "QUESTION HERE", "answer": "ANSWER HERE"}]
# HEADER="HEADER FOR CARD (eg. To the love of my life,)"
# PARTNER_FIRST_NAME="RECIPIENT FIRST NAME"
# PARTNER_LAST_NAME="RECIPIENT LAST NAME"
# YOUR_FIRST_NAME="YOUR FIRST NAME"
# LETTER_CONTENT="WRITE LETTER HERE (use \n only for newline)"

# Insert three photos into the public folder: "cover_photo.png" (front cover of letter), "card_photo1.png", "card_photo2.png"

# Run development server
npm run dev

# For a live website, you must insert the above env vars into the respective fields on your host of choice's settings (Vercel makes this very simple)
```

## Legal and Contact
This Valentines Letter website is open-source. All personal data provided by users is stored locally and inaccessible. No personal data is shared outside of the website without explicit user consent.
<br><br>Contact: kobebayliss1@gmail.com
