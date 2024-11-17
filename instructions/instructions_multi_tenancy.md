# **Updated Product Requirements Document (PRD): Pink and Blue**

---

## **Table of Contents**

1. [Project Overview](#project-overview)
2. [Objectives](#objectives)
3. [Scope](#scope)
4. [Functional Requirements](#functional-requirements)
   - [1. Marketing Landing Page](#1-marketing-landing-page)
   - [2. Pricing and Packaging](#2-pricing-and-packaging)
   - [3. Authentication Flow](#3-authentication-flow)
   - [4. User Dashboard](#4-user-dashboard)
   - [5. Site Management](#5-site-management)
   - [6. Site Customization](#6-site-customization)
   - [7. Preview and Publishing Workflow](#7-preview-and-publishing-workflow)
   - [8. Existing Features Adaptation](#8-existing-features-adaptation)
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
9. [Updated Database Schema](#updated-database-schema)
10. [File Structure](#file-structure)
11. [Development Plan](#development-plan)
12. [Testing Requirements](#testing-requirements)
13. [Documentation and Resources](#documentation-and-resources)
14. [Appendices](#appendices)

---

## **Project Overview**

**Pink and Blue** (accessible at [pinkandblue.live](https://www.pinkandblue.live)) is a Micro SaaS platform that enables expecting parents to create their own personalized baby gender reveal sites. Users can create, customize, and manage multiple reveal sites, offering an interactive and engaging way to share their joy with friends and family.

## **Objectives**

1. **Empower Users:** Allow users to create and customize multiple baby reveal sites effortlessly.
2. **Monetize the Service:** Introduce a pricing model where users pay per site to unlock publishing.
3. **Enhance User Experience:** Provide a seamless workflow for site creation, preview, and publishing.
4. **Maintain Existing Features:** Adapt interactive elements for individual user sites.
5. **Ensure Scalability:** Build a platform that efficiently handles multiple users and multiple sites per user.

## **Scope**

### **In Scope**

- Users can create, manage, and customize multiple reveal sites.
- Implement a workflow for site creation, previewing, and publishing.
- Introduce a pricing model where users pay per site to publish.
- Secure user authentication and authorization.
- Data isolation between different users and their sites.

### **Out of Scope**

- Mobile application development.
- Multi-language support beyond English.
- Advanced analytics for user behavior on reveal sites.
- Integration with external CMS platforms.

## **Functional Requirements**

### **1. Marketing Landing Page**

_(Remains the same as previously defined.)_

### **2. Pricing and Packaging**

- **Purpose:** Inform users about the cost of publishing a reveal site and encourage purchase.

#### **Components:**

- **Pricing Model:**
  - Users can create and customize sites for free.
  - To publish a site (make it publicly accessible), users must pay a one-time fee per site.
- **Pricing Page:**
  - Clearly display the cost per site.
  - Outline what is included with the purchase (e.g., hosting, customizable features).
- **CTA Buttons:**
  - "Buy Now" or "Unlock Publishing" buttons that lead to the payment flow.

#### **Implementation Details:**

- **Payment Integration:** Use Stripe for handling one-time payments per site.
- **Purchase Confirmation:** After successful payment, the site is marked as paid and can be published.

### **3. Authentication Flow**

_(Remains similar, with support for multiple sites per user.)_

### **4. User Dashboard**

- **Purpose:** Provide a centralized place for users to manage their sites and account settings.

#### **Components:**

- **Site List:**

  - Display a list of the user's existing sites with options to edit or view each site.
  - Include a "Create New Site" button.

- **Account Settings:**
  - Manage personal information (email, password).
  - View purchase history.

#### **Implementation Details:**

- **Navigation:** Use tabs or a sidebar to navigate between "My Sites" and "Account Settings".

### **5. Site Management**

- **Purpose:** Allow users to create, edit, and manage multiple reveal sites.

#### **Components:**

- **Create New Site:**
  - Button leading to a new site's settings page.
- **Site Overview:**
  - For each site, display:
    - Site name.
    - Published status (Draft, Published).
    - Payment status (Paid, Unpaid).
    - Options to Edit, Preview, Publish, or Delete.

#### **Implementation Details:**

- **Data Association:** Each site is linked to the user via `userId`.
- **Site Limits:** Optionally impose limits on the number of sites per user for free accounts.

### **6. Site Customization**

_(As previously defined, but now scoped per site.)_

- Users can customize settings for each site individually.
- Settings include announcement date, babies, features, CMS content, and design customization.

### **7. Preview and Publishing Workflow**

- **Purpose:** Enable users to preview their sites and publish them after payment.

#### **Components:**

- **Preview Functionality:**

  - Accessible via `/preview/:siteId`.
  - Authenticated endpoint; only the site owner can access.
  - Reflects all current customizations.

- **Publishing Flow:**

  - From the site settings, users can click "Publish".
  - If the site is unpaid, redirect to the pricing page.
  - After payment, the site becomes publishable.

- **Public Access:**
  - Published sites are accessible at `/:siteId`.
  - Unpublished or unpaid sites cannot be accessed publicly.

#### **Implementation Details:**

- **SiteId Uniqueness:**

  - Ensure `siteId` is unique across all sites.
  - Consider using a combination of `accountName` and a unique identifier.

- **Payment Flow:**
  - Implement a one-time payment process per site via Stripe.
  - Update the site's `paid` and `published` status upon successful payment.

### **8. Existing Features Adaptation**

_(Remains similar, but now all features are associated with a specific site.)_

- **Data Isolation:**
  - Polls, quizzes, and other interactive features are scoped to each site.
  - Votes and quiz responses are stored per site.

## **Non-Functional Requirements**

### **1. Design and Aesthetic**

_(Remains the same.)_

### **2. Accessibility**

_(Remains the same.)_

### **3. Performance**

- **Scalability:**
  - Optimize database queries for multi-tenancy.
  - Implement indexing where necessary.

### **4. Security**

- **Data Protection:**
  - Ensure users can only access and modify their own sites.
- **Payment Security:**
  - Secure payment processing with SSL and Stripe best practices.

## **Technical Requirements**

### **Technology Stack**

_(Remains the same.)_

### **Database**

- **Database Service:** Convex.
- **Data Storage:**
  - Add a `sites` table to store site-specific data.
  - Update existing tables to reference `siteId` instead of `userId` where appropriate.

### **Hosting and Deployment**

_(Remains the same.)_

## **System Architecture**

- **Multi-Tenant Architecture:**

  - Users can have multiple sites.
  - Each site is uniquely identifiable and associated with a user.

- **URL Structure:**

  - **Preview:** `/preview/:siteId` (authenticated).
  - **Published Site:** `/:siteId` (public).

- **Access Control:**
  - Only the site owner can access and edit their sites.
  - Published sites are publicly accessible after payment.

## **Data Models**

### **User**

_(Remains the same.)_

### **Site**

```typescript
type Site = {
  id: string;
  userId: string;
  siteName: string; // Derived from accountName, used in URLs
  paid: boolean;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
};
```

### **Settings**

```typescript
type Settings = {
  id: string;
  siteId: string; // References the Site
  announcementDate: Date;
  features: {
    showCountdown: boolean;
    showPoll: boolean;
    showQuiz: boolean;
  };
  customMessages: {
    welcomeMessage: string;
    revealMessage: string;
  };
  theme: string;
  createdAt: Date;
  updatedAt: Date;
};
```

### **Baby**

_(Update `userId` to `siteId`)_

```typescript
type Baby = {
  id: string;
  siteId: string;
  name: string;
  gender: "boy" | "girl";
};
```

### **PollVote**

_(Update `userId` to `siteId`)_

```typescript
type PollVote = {
  id: string;
  siteId: string;
  choice: "boy" | "girl";
  timestamp: Date;
};
```

### **QuizQuestion**

_(Now associated with a site; can use default questions if none are provided)_

```typescript
type QuizQuestion = {
  id: string;
  siteId: string; // References the Site
  question: string;
  options: string[];
  correctOptionIndex?: number;
  easterEggOptionIndex?: number;
};
```

### **Payment**

_(Now associated with a site)_

```typescript
type Payment = {
  id: string;
  userId: string;
  siteId: string;
  amount: number;
  currency: string;
  timestamp: Date;
  status: "pending" | "completed" | "failed";
};
```

## **Updated Database Schema**

```typescript
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    username: v.string(),
    firstname: v.optional(v.string()),
    lastname: v.optional(v.string()),
    role: v.union(v.literal("user"), v.literal("admin")),
    stripeCustomerId: v.optional(v.string()),
    isDeleted: v.boolean(),
    email: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_username", ["username"])
    .index("by_email", ["email"])
    .index("by_stripeCustomerId", ["stripeCustomerId"]),

  sites: defineTable({
    userId: v.id("users"),
    siteName: v.string(), // Used as the site identifier in URLs
    paid: v.boolean(),
    published: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_siteName", ["siteName"]),

  settings: defineTable({
    siteId: v.id("sites"),
    announcementDate: v.number(),
    welcomeHeroText: v.string(),
    revealText: v.string(),
    features: v.object({
      showCountdown: v.boolean(),
      showGenderPoll: v.boolean(),
      showGenderQuiz: v.boolean(),
    }),
    theme: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_siteId", ["siteId"]),

  babies: defineTable({
    siteId: v.id("sites"),
    name: v.string(),
    gender: v.union(v.literal("boy"), v.literal("girl")),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_siteId", ["siteId"]),

  votes: defineTable({
    siteId: v.id("sites"),
    gender: v.string(),
    visitorId: v.string(), // Use visitorId instead of userId for public visitors
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_siteId", ["siteId"]),

  quizQuestions: defineTable({
    siteId: v.id("sites"),
    question: v.string(),
    options: v.array(v.string()),
    easterEggOptionIndex: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_siteId", ["siteId"]),

  quizResponses: defineTable({
    siteId: v.id("sites"),
    visitorId: v.string(),
    questionId: v.id("quizQuestions"),
    sessionId: v.id("quizSessions"),
    selectedOption: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_siteId", ["siteId"])
    .index("by_questionId", ["questionId"])
    .index("by_sessionId", ["sessionId"]),

  quizSessions: defineTable({
    siteId: v.id("sites"),
    visitorId: v.string(),
    questionIds: v.array(v.id("quizQuestions")),
    completed: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_siteId", ["siteId"]),

  payments: defineTable({
    userId: v.id("users"),
    siteId: v.id("sites"),
    amount: v.number(),
    currency: v.string(),
    timestamp: v.number(),
    status: v.union(
      v.literal("pending"),
      v.literal("completed"),
      v.literal("failed")
    ),
  })
    .index("by_userId", ["userId"])
    .index("by_siteId", ["siteId"]),
});
```

## **File Structure**

_(Update to reflect changes in the data models and flow.)_

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
│   ├── schema.ts // Updated schema
│   ├── settings.ts
│   ├── sites.ts // New file for sites table
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
│   │   ├── (auth)
│   │   │   ├── sign-in
│   │   │   │   └── page.tsx
│   │   │   └── sign-up
│   │   │       └── page.tsx
│   │   ├── (marketing)
│   │   │   ├── pricing
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx // Marketing landing page
│   │   ├── (dashboard)
│   │   │   └── page.tsx // User dashboard
│   │   ├── (sites)
│   │   │   ├── [siteId]
│   │   │   │   ├── settings
│   │   │   │   │   └── page.tsx // Site settings page
│   │   │   │   ├── preview
│   │   │   │   │   └── page.tsx // Preview page (authenticated)
│   │   │   │   └── publish
│   │   │   │       └── page.tsx // Publish flow
│   │   │   └── create
│   │   │       └── page.tsx // Create new site
│   │   ├── [siteId]
│   │   │   ├── page.tsx // Public site landing page
│   │   │   ├── quiz
│   │   │   │   └── page.tsx
│   │   │   ├── reveal
│   │   │   │   └── page.tsx
│   │   │   └── poll
│   │   │       └── page.tsx
│   │   ├── api
│   │   │   ├── auth
│   │   │   ├── payments
│   │   │   ├── sites
│   │   │   ├── questions
│   │   │   └── webhooks
│   │   └── ... // Other pages and components
│   ├── components
│   │   ├── dashboard
│   │   │   ├── site-list.tsx
│   │   │   └── account-settings.tsx
│   │   ├── site
│   │   │   ├── site-settings-form.tsx
│   │   │   ├── preview-link.tsx
│   │   │   └── publish-button.tsx
│   │   ├── ui
│   │   │   └── ... // UI components
│   │   └── ... // Other components
│   ├── lib
│   │   ├── ... // Utility libraries
│   └── middleware.ts
├── tailwind.config.ts
└── tsconfig.json
```

## **Development Plan**

### **Phase 1: Update Database Schema**

- **1.1 Modify Schema:**

  - Add `sites` table.
  - Update `settings`, `babies`, `votes`, `quizQuestions`, `quizResponses`, and `quizSessions` tables to reference `siteId` instead of `userId`.

- **1.2 Update Convex Functions:**
  - Adjust existing database functions to accommodate the new schema.

### **Phase 2: Implement Site Management**

- **2.1 User Dashboard:**

  - Create a dashboard for users to view and manage their sites.
  - Implement "Create New Site" functionality.

- **2.2 Site Settings:**
  - Update the settings page to reference a specific `siteId`.
  - Ensure that settings are saved per site.

### **Phase 3: Implement Preview and Publishing Workflow**

- **3.1 Preview Functionality:**

  - Develop `/preview/:siteId` endpoint.
  - Ensure it is accessible only to the site owner.

- **3.2 Publish Flow:**

  - Implement the publish button in the site settings.
  - Redirect unpaid sites to the pricing page.
  - After payment, update the site's `paid` and `published` status.

- **3.3 Public Site Access:**
  - Ensure that published sites are accessible at `/:siteId`.

### **Phase 4: Update Existing Features**

- **4.1 Adapt Interactive Features:**
  - Ensure polls, quizzes, and other features function per site.
  - Update data retrieval and storage to include `siteId`.

### **Phase 5: Testing and Optimization**

_(As previously defined, focusing on the new multi-site functionality.)_

## **Testing Requirements**

### **Functional Testing**

- **Site Creation and Management:**

  - Test creating, editing, deleting multiple sites per user.
  - Ensure data is correctly associated with each site.

- **Preview and Publishing:**

  - Verify that preview works only for the site owner.
  - Test the payment flow for publishing a site.
  - Confirm that published sites are accessible publicly.

- **Data Isolation:**
  - Ensure that data from one site does not affect or is not accessible from another site.

### **User Experience Testing**

_(As previously defined.)_

### **Security Testing**

- **Access Control:**

  - Test that users cannot access or modify sites they do not own.
  - Verify that unpublished or unpaid sites are not publicly accessible.

- **Payment Security:**
  - Ensure payment processing is secure and handles edge cases.

## **Documentation and Resources**

_(Remains the same.)_

## **Appendices**

_(Include any additional information relevant to the new functionality.)_

---

**Note to Developers:**

This updated PRD reflects the new pricing and packaging model, allowing users to create and manage multiple reveal sites. The addition of the `sites` table and the adjustment of related data models are crucial for implementing this functionality. Please ensure that data integrity and security are maintained throughout the application.

For any questions or clarifications, please reach out to the project manager or relevant team leads.

---

# **Conclusion**

The PRD has been updated to include the new flow where users can create, preview, and publish multiple baby reveal sites. The database schema has been adjusted to reflect these changes, adding a `sites` table and updating existing tables to reference `siteId`.

If there's anything else you'd like to add or modify, please let me know!
