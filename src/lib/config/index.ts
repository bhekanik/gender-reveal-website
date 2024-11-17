const isDev = process.env.NODE_ENV === "development";
const domain = isDev ? "localhost:3000" : "genderreveal.bhekani.com";

export const config = {
  projectName: "Gender Reveal",
  projectDescription: "Reveal your baby's gender with your friends and family",
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
