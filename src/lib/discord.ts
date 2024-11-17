import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";
import { config } from "./config";
import { logger } from "./logger";

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;

const rest = new REST({ version: "10" }).setToken(DISCORD_BOT_TOKEN!);

export async function sendDiscordDM(content: string) {
  if (!DISCORD_BOT_TOKEN) {
    logger.warn("Discord bot token not found, skipping Discord notification");
    return;
  }

  try {
    // Create DM channel
    const channel = (await rest.post(Routes.userChannels(), {
      body: {
        recipient_id: config.discordUserId,
      },
    })) as { id: string };

    // Send message to DM channel
    await rest.post(Routes.channelMessages(channel.id), {
      body: {
        content,
      },
    });
    logger.info("Discord notification sent successfully");
  } catch (error) {
    logger.error(
      { error: error instanceof Error ? error.message : error },
      "Failed to send Discord notification"
    );
  }
}
