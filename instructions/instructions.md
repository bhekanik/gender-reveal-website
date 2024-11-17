# **Updated Product Requirements Document (PRD): Baby Reveal Website Micro SaaS**

## **Table of Contents**

1. [Project Overview](#project-overview)
2. [Objectives](#objectives)
3. [Scope](#scope)
4. [Functional Requirements](#functional-requirements)
   - [1. Marketing Landing Page](#1-marketing-landing-page)
   - [2. Pricing Page](#2-pricing-page)
   - [3. Authentication Flow](#3-authentication-flow)
   - [4. User Settings Dashboard](#4-user-settings-dashboard)
   - [5. Customization Features](#5-customization-features)
   - [6. Publishing and Sharing](#6-publishing-and-sharing)
   - [7. Existing Features Adaptation](#7-existing-features-adaptation)
     - [7.1. Landing Page for Individual Reveal Sites](#71-landing-page-for-individual-reveal-sites)
     - [7.2. Gender Poll](#72-gender-poll)
     - [7.3. Mini-Quiz](#73-mini-quiz)
     - [7.4. Countdown Timer](#74-countdown-timer)
     - [7.5. Gender Reveal Page](#75-gender-reveal-page)
     - [7.6. Easter Eggs](#76-easter-eggs)
5. [Non-Functional Requirements](#non-functional-requirements)
   - [1. Design and Aesthetic](#1-design-and-aesthetic)
   - [2. Accessibility](#2-accessibility)
   - [3. Performance](#3-performance)
   - [4. Security](#4-security)
6. [Technical Requirements](#technical-requirements)
   - [Technology Stack](#technology-stack)
   - [Database](#database)
   - [Hosting and Deployment](#hosting-and-deployment)
7. [System Architecture](#system-architecture)
8. [Data Models](#data-models)
9. [File Structure](#file-structure)
10. [Development Plan](#development-plan)
    - [Phase 1: Extend Infrastructure](#phase-1-extend-infrastructure)
    - [Phase 2: Implement New Features](#phase-2-implement-new-features)
    - [Phase 3: Adapt Existing Features](#phase-3-adapt-existing-features)
    - [Phase 4: Testing and Optimization](#phase-4-testing-and-optimization)
    - [Phase 5: Deployment](#phase-5-deployment)
11. [Testing Requirements](#testing-requirements)
    - [1. Functional Testing](#1-functional-testing)
    - [2. User Experience Testing](#2-user-experience-testing)
    - [3. Security Testing](#3-security-testing)
12. [Documentation and Resources](#documentation-and-resources)

## **Project Overview**

The Baby Reveal Website is evolving into a **Micro SaaS platform** that enables users to create their own personalized baby gender reveal pages. The platform offers an easy and straightforward way for expecting parents to share their joy with friends and family through customizable and interactive reveal sites.

## **Objectives**

1. **Empower Users:** Allow users to create and customize their own baby reveal pages effortlessly.
2. **Monetize the Service:** Introduce a pricing model to generate revenue.
3. **Maintain Existing Features:** Adapt existing interactive elements for individual user sites.
4. **Enhance User Experience:** Provide a seamless onboarding and customization process.
5. **Ensure Scalability:** Build a platform that can handle multiple users and sites efficiently.

## **Scope**

### **In Scope**

- Development of a marketing landing page and pricing page.
- User authentication and account management.
- User dashboard for settings and customization.
- Customizable features: quizzes, polls, countdowns, and reveal mechanisms.
- Generation of unique, shareable links for user reveal sites.
- Adaptation of existing features to support multiple users.

### **Out of Scope**

- Mobile application development.
- Multi-language support beyond English.
- Advanced analytics for user behavior on reveal sites.
- Integration with external CMS platforms.

## **Functional Requirements**

### **1. Marketing Landing Page**

- **Purpose:** Introduce the platform to potential users, highlighting features and ease of use.

#### **Components:**

- **Hero Section:**

  - Catchy headline and subheadline.
  - Visuals showcasing sample reveal pages.
  - "Create My Baby Reveal" CTA button.

- **Features Section:**

  - Highlight key features (customization, quizzes, polls, countdowns).
  - Brief descriptions and icons for each feature.

- **How It Works Section:**

  - Step-by-step guide on creating a reveal page.
  - Emphasize simplicity and speed.

- **Testimonials Section:**

  - Quotes from satisfied users (placeholder content initially).

- **Footer:**
  - Links to Terms of Service, Privacy Policy, and contact information.

#### **Implementation Details:**

- **SEO Optimization:** Use relevant keywords and meta tags.
- **Responsive Design:** Ensure compatibility across devices.

### **2. Pricing Page**

- **Purpose:** Inform users about pricing plans and encourage sign-ups.

#### **Components:**

- **Pricing Tiers:**

  - Free Tier: Limited features (e.g., basic customization).
  - Premium Tier(s): Full features, possibly with additional perks.

- **Comparison Table:**

  - Side-by-side comparison of features included in each plan.

- **CTA Buttons:**
  - "Get Started" buttons that lead to the sign-up flow.

#### **Implementation Details:**

- **Payment Integration:** Set up with payment gateway (e.g., Stripe) for premium tiers.
- **FAQ Section:** Address common questions about pricing and features.

### **3. Authentication Flow**

- **Purpose:** Allow users to create accounts and manage their reveal pages.

#### **Components:**

- **Sign-Up Page:**

  - Email and password fields.
  - Option to sign up with social accounts (optional).

- **Login Page:**

  - Email and password fields.
  - "Forgot Password" functionality.

- **Email Verification:**

  - Send verification email upon sign-up (optional but recommended).

- **Password Reset:**
  - Allow users to reset their password via email link.

#### **Implementation Details:**

- **Security:** Hash passwords and follow best practices for authentication.
- **Session Management:** Use secure cookies or tokens to maintain user sessions.

### **4. User Settings Dashboard**

- **Purpose:** Provide a centralized place for users to customize their reveal sites.

#### **Components:**

- **Navigation Sidebar or Tabs:**

  - Sections for Site Settings, Customization, Babies, Features, CMS, Danger Zone.

- **Site Settings:**

  - **Account Name:** Input field for the account name (used in the site's URL).
    - Validation to allow only URL-friendly characters.
  - **Announcement Date:** Date and time picker for the reveal.

- **Babies Section:**

  - Add/Edit/Remove babies.
  - Set each baby's name and gender.
  - Support for multiple babies.

- **Features Selection:**

  - Toggle switches or checkboxes for:
    - Show Countdown
    - Show Gender Poll
    - Show Mini-Quiz

- **CMS Section:**

  - Text fields or rich text editors for:
    - Welcome Hero Message
    - Reveal Page Message

- **Danger Zone:**
  - Option to delete account and all associated data.
  - Confirmation dialog to prevent accidental deletion.

#### **Implementation Details:**

- **Form Validation:** Ensure all inputs are validated before submission.
- **Auto-Save Feature:** Optionally save changes automatically or provide a "Save" button.
- **User Feedback:** Provide success/error messages after actions.

### **5. Customization Features**

- **Purpose:** Allow users to tailor the interactive elements of their reveal pages.

#### **Components:**

- **Quiz Customization:**

  - Add/Edit/Remove quiz questions and answers.
  - Option to enable/disable specific easter eggs.

- **Design Customization:**

  - Select from predefined themes or color schemes.
  - Upload custom images (e.g., background, logo).

- **Copy Customization:**
  - Modify default text across the site (e.g., button labels, messages).

#### **Implementation Details:**

- **Content Management:**
  - Store custom content in the database linked to the user's account.
- **Media Handling:**
  - Implement image upload functionality with size/type restrictions.
- **Preview Functionality:**
  - Allow users to preview changes before publishing.

### **6. Publishing and Sharing**

- **Purpose:** Enable users to publish their reveal sites and share them with others.

#### **Components:**

- **Publish Button:**

  - Generates a unique link based on the account name (e.g., `babyreveal.com/your-account-name`).
  - Validates that all required settings are complete before publishing.

- **Sharing Options:**

  - Provide direct sharing buttons for social media platforms (Facebook, Twitter, etc.).
  - Display the shareable link prominently.

- **Unpublish Option:**
  - Allow users to unpublish their site if needed.

#### **Implementation Details:**

- **URL Management:**
  - Ensure uniqueness of account names to prevent URL conflicts.
- **SEO for Individual Sites:**
  - Set meta tags based on user-provided content for better sharing previews.

### **7. Existing Features Adaptation**

Adapt the existing features to function within each user's reveal site.

#### **7.1. Landing Page for Individual Reveal Sites**

- **Components:**
  - Welcome Message: User-customizable greeting.
  - CTAs: Links to quiz, poll, or countdown based on enabled features.
  - Visuals: Reflect user's selected theme and uploaded images.
  - Countdown Timer: Counts down to the user's announcement date.
  - Gender Poll Results: Specific to the user's site.

#### **Implementation Details:**

- **Data Isolation:** Ensure data (e.g., poll results) are scoped to each user's site.

#### **7.2. Gender Poll**

- **Functionality remains the same**, but votes are specific to the user's reveal page.

#### **7.3. Mini-Quiz**

- **Customization:**
  - Users can add/edit/remove questions.
  - Option to use default questions if none are provided.

#### **7.4. Countdown Timer**

- **Functionality remains the same**, counting down to the user's set announcement date.

#### **7.5. Gender Reveal Page**

- **Customization:**
  - Users can customize the reveal message and visual effects.
  - Option to select different reveal animations.

#### **7.6. Easter Eggs**

- **Customization:**
  - Users can enable/disable easter eggs.
  - Customize easter egg triggers and effects.

## **Non-Functional Requirements**

### **1. Design and Aesthetic**

- **Consistency:** Maintain a cohesive design language across the platform.
- **Customization:** Allow users to select themes while ensuring overall aesthetic quality.
- **Branding:** Incorporate platform branding on user sites subtly (e.g., footer note).

### **2. Accessibility**

- **Compliance:** Adhere to WCAG 2.1 AA standards across all new features.
- **User Content:** Guide users to provide accessible content (e.g., alt text for images).

### **3. Performance**

- **Scalability:** Optimize the platform to handle multiple concurrent users and sites.
- **Caching:** Implement caching strategies for static assets and user sites.
- **Load Times:** Ensure fast load times even with user-customized content.

### **4. Security**

- **Data Protection:** Secure user data, especially personal and payment information.
- **Authentication Security:** Protect against common vulnerabilities (e.g., SQL injection, XSS).
- **GDPR Compliance:** Allow users to delete their data and inform them about data usage.

## **Technical Requirements**

### **Technology Stack**

- **Front-end Framework:** Next.js (React framework).
- **Styling:** Tailwind CSS.
- **JavaScript/TypeScript:** Use TypeScript for type safety.
- **State Management:** React's Context API or state management libraries if necessary.
- **Authentication:** Use NextAuth.js or a similar authentication library.
- **Payment Processing:** Integrate with Stripe for handling payments.

### **Database**

- **Database Service:** Convex.
- **Data Storage:**
  - User accounts and settings.
  - Customized content (quizzes, messages, themes).
  - Poll results and quiz responses specific to each user site.

### **Hosting and Deployment**

- **Platform:** Vercel or similar for hosting Next.js applications.
- **CI/CD:** Set up continuous integration and deployment pipelines.

## **System Architecture**

- **Multi-Tenant Architecture:**

  - Each user's data is isolated within the database.
  - URLs are generated based on unique account names.

- **Client-Server Model:**

  - **Client:** User's browser running the Next.js front-end.
  - **Server:** Next.js server handling SSR, API routes, and serving user sites.
  - **Database:** Convex database for data persistence.

- **Authentication and Authorization:**
  - Secure endpoints to prevent unauthorized access.
  - Role-based access control if admin features are added later.

## **Data Models**

### **User Account**

```typescript
type User = {
  id: string;
  email: string;
  passwordHash: string;
  accountName: string; // Used for URL slug
  plan: "free" | "premium";
  createdAt: Date;
  updatedAt: Date;
};
```

### **User Settings**

```typescript
type UserSettings = {
  userId: string;
  announcementDate: Date;
  features: {
    showCountdown: boolean;
    showPoll: boolean;
    showQuiz: boolean;
  };
  theme: string; // Theme or color scheme selected
  customMessages: {
    welcomeMessage: string;
    revealMessage: string;
  };
};
```

### **Baby**

```typescript
type Baby = {
  id: string;
  userId: string;
  name: string;
  gender: "boy" | "girl";
};
```

### **Quiz Question**

```typescript
type UserQuizQuestion = {
  id: string;
  userId: string;
  question: string;
  options: string[];
  correctOptionIndex?: number;
  easterEggOptionIndex?: number;
};
```

### **Poll Vote**

```typescript
type PollVote = {
  id: string;
  userId: string;
  choice: "boy" | "girl";
  timestamp: Date;
};
```

### **Payment Record**

```typescript
type Payment = {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  timestamp: Date;
  status: "pending" | "completed" | "failed";
};
```

## **File Structure**

```
.
├── README.md
├── components.json
├── convex
│   ├── README.md
│   ├── _generated
│   │   ├── api.d.ts
│   │   ├── api.js
│   │   ├── dataModel.d.ts
│   │   ├── server.d.ts
│   │   └── server.js
│   ├── babies.ts
│   ├── payments.ts
│   ├── pollVotes.ts
│   ├── quizQuestions.ts
│   ├── schema.ts
│   ├── settings.ts
│   ├── tsconfig.json
│   └── users.ts
├── fixtures
│   └── defaultQuestions.json
├── instructions
│   └── instructions.md
├── next-env.d.ts
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── public
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── sw.js
│   ├── vercel.svg
│   ├── window.svg
│   └── workbox-e9849328.js
├── src
│   ├── app
│   │   ├── (admin)
│   │   ├── (auth)
│   │   │   ├── error.tsx
│   │   │   ├── layout.tsx
│   │   │   ├── loading.tsx
│   │   │   ├── sign-in
│   │   │   │   └── page.tsx
│   │   │   └── sign-up
│   │   │       └── page.tsx
│   │   ├── (marketing)
│   │   │   ├── cookie-policy
│   │   │   ├── privacy-policy
│   │   │   ├── terms-of-service
│   │   │   ├── pricing
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx // Marketing landing page
│   │   ├── (public)
│   │   │   └── [accountName]
│   │   │       ├── page.tsx // User's reveal landing page
│   │   │       ├── quiz
│   │   │       │   └── page.tsx
│   │   │       ├── reveal
│   │   │       │   └── page.tsx
│   │   │       └── poll
│   │   │           └── page.tsx
│   │   ├── api
│   │   │   ├── auth
│   │   │   │   └── [...nextauth].ts // NextAuth configuration
│   │   │   ├── payments
│   │   │   │   ├── webhook.ts // Stripe webhook handler
│   │   │   │   └── checkout.ts // Create checkout sessions
│   │   │   ├── questions
│   │   │   ├── users
│   │   │   └── webhooks
│   │   ├── emails
│   │   │   ├── account-deleted.tsx
│   │   │   ├── welcome.tsx
│   │   │   └── password-reset.tsx
│   │   ├── error.tsx
│   │   ├── favicon.ico
│   │   ├── fonts
│   │   │   ├── GeistMonoVF.woff
│   │   │   └── GeistVF.woff
│   │   ├── global-error.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── not-found.tsx
│   │   ├── settings
│   │   │   └── page.tsx // User dashboard
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   ├── components
│   │   ├── account-name-input.tsx
│   │   ├── animated-background.tsx
│   │   ├── countdown-timer.tsx
│   │   ├── gender-poll.tsx
│   │   ├── posthog-pageview.tsx
│   │   ├── providers
│   │   │   ├── convex-client-provider.tsx
│   │   │   ├── posthog-provider.tsx
│   │   │   ├── react-query-provider.tsx
│   │   │   └── auth-provider.tsx // For authentication context
│   │   ├── quiz
│   │   │   ├── question-card.tsx
│   │   │   ├── question-options.tsx
│   │   │   └── question-stats.tsx
│   │   ├── settings
│   │   │   ├── baby-list.tsx
│   │   │   ├── danger-zone.tsx
│   │   │   ├── feature-selection.tsx
│   │   │   ├── site-settings-form.tsx
│   │   │   ├── cms-form.tsx
│   │   │   └── customization-form.tsx
│   │   ├── ui
│   │   │   ├── alert-dialog.tsx
│   │   │   ├── alert.tsx
│   │   │   ├── aspect-ratio.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── date-picker.tsx // New component for announcement date
│   │   │   ├── dialog.tsx
│   │   │   ├── form.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── radio-group.tsx
│   │   │   ├── select.tsx // New component for theme selection
│   │   │   ├── skeleton.tsx
│   │   │   ├── sonner.tsx
│   │   │   ├── switch.tsx
│   │   │   ├── textarea.tsx
│   │   │   └── tooltip.tsx
│   │   ├── welcome-hero.tsx
│   │   └── pricing-table.tsx // For pricing page
│   ├── lib
│   │   ├── config
│   │   │   └── index.ts
│   │   ├── discord.ts
│   │   ├── formatEntity.ts
│   │   ├── hooks
│   │   │   ├── use-local-storage.ts
│   │   │   ├── use-user-id.ts
│   │   │   └── use-auth.ts // New hook for authentication
│   │   ├── logger.ts
│   │   ├── payments.ts // Payment utility functions
│   │   └── utils.ts
│   └── middleware.ts
├── tailwind.config.ts
└── tsconfig.json
```

## **Development Plan**

### **Phase 1: Extend Infrastructure**

- **1.1 Authentication Setup:**

  - Integrate Clerk for user authentication.
  - Configure providers (email/password, social logins if applicable).

- **1.2 Payment Integration:**

  - Set up Stripe for handling payments.
  - Implement API routes for creating checkout sessions and handling webhooks.

- **1.3 Database Schema Update:**
  - Extend Convex schema to include user accounts, settings, payments.

### **Phase 2: Implement New Features**

- **2.1 Marketing Landing Page:**

  - Develop `(marketing)/page.tsx`.
  - Implement sections as per the functional requirements.

- **2.2 Pricing Page:**

  - Create `(marketing)/pricing/page.tsx`.
  - Set up pricing tiers and integrate with the payment flow.

- **2.3 Authentication Pages:**

  - Develop sign-in and sign-up pages under `(auth)`.

- **2.4 User Dashboard:**
  - Build `settings/page.tsx` with navigation for different settings sections.
  - Implement forms and components for site settings, babies, features, CMS, and danger zone.

### **Phase 3: Adapt Existing Features**

- **3.1 Update Existing Pages:**

  - Modify existing reveal site pages to fetch data based on `accountName` from the URL.
  - Ensure data isolation between different user sites.

- **3.2 Customization:**

  - Implement theme and design customization options.
  - Update components to use user-specific styles and content.

- **3.3 Publishing Flow:**
  - Add publish functionality to generate and display the user's unique link.
  - Handle validation to ensure all required settings are completed.

### **Phase 4: Testing and Optimization**

- **4.1 Functional Testing:**

  - Test new features for correct functionality.
  - Verify data is correctly associated with the right user accounts.

- **4.2 Security Testing:**

  - Conduct vulnerability assessments for authentication and data access.
  - Ensure proper error handling and data validation.

- **4.3 Performance Optimization:**
  - Optimize database queries.
  - Implement code splitting and lazy loading where beneficial.

### **Phase 5: Deployment**

- **5.1 Update Deployment Configurations:**

  - Ensure environment variables for authentication and payments are set.
  - Update build scripts if necessary.

- **5.2 Deploy Updated Application:**
  - Deploy to the hosting platform.
  - Perform smoke testing on the live environment.

## **Testing Requirements**

### **1. Functional Testing**

- **Authentication Flow:**

  - Test sign-up, login, logout, password reset.
  - Verify email verification if implemented.

- **Payment Processing:**

  - Test payment flow with test cards.
  - Ensure webhooks correctly update user plans.

- **User Dashboard:**

  - Test all forms for adding/editing data.
  - Verify that customization settings reflect on the user's reveal site.

- **Publishing and Sharing:**
  - Ensure the unique link works and displays the correct content.
  - Test sharing functionality on social media platforms.

### **2. User Experience Testing**

- **Onboarding Flow:**

  - Evaluate the ease of signing up and creating a reveal site.
  - Gather feedback on the intuitiveness of the dashboard.

- **Responsiveness and Accessibility:**
  - Test across different devices and browsers.
  - Ensure compliance with accessibility standards.

### **3. Security Testing**

- **Authentication Security:**

  - Test for vulnerabilities like SQL injection, XSS, CSRF.
  - Ensure session management is secure.

- **Data Protection:**
  - Verify that users cannot access or modify other users' data.
  - Test the account deletion process to ensure data is completely removed.

## **Documentation and Resources**

- **Convex Database Guide:**

  - [Convex Quickstart with Next.js](https://docs.convex.dev/quickstart/nextjs)

- **Next.js Documentation:**

  - [Next.js Docs](https://nextjs.org/docs)

- **Stripe Integration Guide:**

  - [Stripe Docs](https://stripe.com/docs)

- **Tailwind CSS Documentation:**

  - [Tailwind CSS Docs](https://tailwindcss.com/docs)

- **Accessibility Guidelines:**
  - [WCAG 2.1 Guidelines](https://www.w3.org/TR/WCAG21/)
