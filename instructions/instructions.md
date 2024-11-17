# **Product Requirements Document: Baby Reveal Website**

## **Project Overview**

The Baby Reveal Website is a digital experience designed to share the gender reveal of a baby in a fun, engaging, and interactive way. The site builds anticipation without directly giving away the gender until the specified reveal time. It includes interactive elements such as a mini-quiz, gender poll, countdown timer, and subtle easter eggs to enhance user engagement.

## **Objectives**

1. **Create Anticipation:** Build excitement for the gender reveal using a countdown timer and interactive features.
2. **Engage Users:** Incorporate a gender poll, mini-quiz and other elements to keep users entertained and curious.
3. **Maintain Secrecy:** Ensure no overt hints about the gender are given, while including subtle easter eggs for observant users.
4. **Celebrate the Reveal:** Deliver a visually spectacular reveal at the specified time.

## **Key Features**

### **1. Landing Page**

- **Purpose:** Welcome visitors, set the tone, and direct them to the interactive features.
- **Components:**
  - **Welcome Message:** A warm greeting (e.g., "Welcome to Our Baby Reveal!")
  - **Call to Action (CTA):** Buttons leading to the quiz or countdown timer.
  - **Gender Poll results:** Display live poll results for "Boy" and "Girl" votes.
  - **Visuals:** Neutral-themed decorations (balloons, stars, or soft patterns).
  - **Countdown Timer:** A real-time display showing the time remaining until the reveal.

### **2. Gender Poll**

- **Purpose:** Allow visitors to guess the baby's gender and view live results.
- **Details:**
  - **Voting Options:** "Boy" or "Girl" buttons on the poll page.
  - **Submission Confirmation:**
    - After voting, display a confirmation message: "Thank you for voting! Your guess has been recorded."
  - **Live Results:**
    - Real-time bar graph or pie chart showing percentages of votes for each gender.
    - Example: "60% think it's a Girl | 40% think it's a Boy."
  - **Display Location:**
    - Live poll results should appear prominently on the landing page.
  - **One Vote Per User:**
    - Enforce voting limits using cookies, or local storage.

### **3. Mini-quiz**

- **Purpose:** Engage users and build curiosity.
- **Details:**
  - **Question Pool:** 50 carefully crafted questions with 5 randomly selected per quiz session.
  - **Question Format:** Single-question display with four multiple-choice answers.
  - **Subtle Easter Eggs:** Certain answers trigger brief, unobtrusive effects (e.g., "Strawberry" briefly glows pink).
  - **Progress Indicator:** Bar or fraction (e.g., "Question 2 of 5").
  - **Post-Quiz Screen:** A "Thank you for playing" message with the countdown timer.
  - **Accessibility:** Ensure keyboard navigation and screen reader compatibility.

### **4. Countdown Timer**

- **Purpose:** Create anticipation for the big reveal.
- **Details:**
  - Prominently displayed on all major pages (Landing Page, Quiz Results, and Reveal Page).
  - Style: Elegant and neutral, using animated numbers or progress rings.

### **5. Gender Reveal Page**

- **Purpose:** Celebrate and reveal the baby’s gender.
- **Details:**
  - **Reveal Mechanism:** Dynamic animation (e.g., bursting balloon, confetti, or flipping card).
  - **Visual Effects:** Vibrant colors and animations triggered at the countdown’s end.
  - **Celebratory Music/Sounds:** Light celebratory audio to enhance the moment.
  - **Social Media Sharing:** Buttons to share the news on social platforms.

### **6. Easter Eggs**

- **Purpose:** Add intrigue for highly observant users.
- **Details:**
  - **Subtle Hints:** Embedded in quiz answers, visual designs, or metadata (e.g., inspecting elements on the webpage might reveal cryptic hints).
  - **Implementation:** Ensure no easter egg directly gives away the gender.

## **Non-Functional Requirements**

### **1. Design and Aesthetic**

- Neutral, elegant design (gold, white, pastel colors).
- Responsive and mobile-friendly.
- Fonts: Modern and playful (e.g., Nunito, Poppins, or Montserrat).

### **2. Accessibility**

- Ensure full compliance with WCAG standards:
  - Keyboard navigability.
  - Descriptive alt text for images.
  - High contrast for readability.

### **3. Performance**

- Optimize for fast load times, especially on mobile.
- Ensure smooth animations and transitions without lag.

## **Wireframes**

### **Landing Page**

- Header: Site title/logo and navigation.
- Hero Section: Welcome message, countdown timer, and CTAs.
- Footer: Social media links and additional details.

### **Poll Page**

- Centered voting buttons: "Boy" and "Girl."
- Confirmation message after voting.
- Button/link to return to the landing page.

### **Mini-quiz**

- Quiz Start Page: Title, description, and "Start Quiz" button.
- Question Screen: Progress bar, question card, and answer buttons.
- Post-Quiz Screen: Thank you message and countdown timer.

### **Reveal Page**

- Full screen reveal animation.
- Confetti, colors, and celebratory message.
- Share buttons.

## **Testing Requirements**

### **1. Functionality**

- Verify randomization of quiz questions.
- Confirm countdown timer syncs correctly across all devices.
- Ensure easter eggs function as intended.

### **2. User Experience**

- Test responsiveness on various devices and browsers.
- Validate accessibility for screen readers and keyboard navigation.

## Docs

I want to use convex as the database. Here is a link to the convex getting started guide [<https://docs.convex.dev/quickstart/nextjs](https://docs.convex.dev/quickstart/nextjs>).

## Current File Structure

├── README.md
├── components.json
├── instructions
│ └── instructions.md
├── next-env.d.ts
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── public
│ ├── file.svg
│ ├── globe.svg
│ ├── next.svg
│ ├── vercel.svg
│ └── window.svg
├── src
│ ├── app
│ │ ├── api
│ │ ├── error.tsx
│ │ ├── favicon.ico
│ │ ├── fonts
│ │ ├── global-error.tsx
│ │ ├── globals.css
│ │ ├── layout.tsx
│ │ ├── not-found.tsx
│ │ ├── page.tsx
│ │ ├── robots.ts
│ │ └── sitemap.ts
│ ├── components
│ │ ├── posthog-pageview.tsx
│ │ ├── providers
│ │ └── ui
│ └── lib
│ ├── config
│ ├── discord.ts
│ ├── formatEntity.ts
│ ├── logger.ts
│ └── utils.ts
├── tailwind.config.ts
└── tsconfig.json
