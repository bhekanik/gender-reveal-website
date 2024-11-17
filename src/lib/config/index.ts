const isDev = process.env.NODE_ENV === "development";
const domain = isDev ? "localhost:3000" : "genderreveal.bhekani.com";

export const config = {
  projectName: "Gender Reveal",
  baseUrl: `http://${domain}`,
  domain,
  supportEmail: `${domain.split(".")[0]}@bhekani.com`,
  discordUserId: "549143313257725969",
};
