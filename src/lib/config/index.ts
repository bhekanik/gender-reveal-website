const isDev = process.env.NODE_ENV === "development";
const domain = isDev ? "localhost:3000" : "pinkandblue.live";

export const config = {
  projectName: "Pink and Blue",
  projectDescription: "Create your personalized baby gender reveal site",
  baseUrl: `http://${domain}`,
  domain,
  supportEmail: `${domain.split(".")[0]}@bhekani.com`,
  discordUserId: "549143313257725969",
  defaults: {
    settings: {
      accountName: "my-baby-reveal",
      announcementDate: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days from now
      welcomeHeroText: "Welcome to Our Baby Reveal!",
      revealText: "We can't wait to meet our little one!",
      features: {
        showCountdown: true,
        showGenderPoll: true,
        showGenderQuiz: true,
      },
    },
    baby: {
      gender: "girl" as const,
    },
  },
};
