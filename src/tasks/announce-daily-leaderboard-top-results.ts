import { MonkeyTypes } from "../types/types";
import { Client } from "../structures/client";
import { getPositionString } from "../functions/get-position-string";
import { EmbedFieldData } from "discord.js";

export default {
  name: "announceDailyLeaderboardTopResults",
  run: async (
    client,
    _guild,
    leaderboardID: string,
    leaderboardTimestamp: number,
    topResults: MonkeyTypes.DailyLeaderboardEntry[]
  ) => {
    if (
      leaderboardID === undefined ||
      leaderboardTimestamp === undefined ||
      topResults === undefined
    ) {
      return {
        status: false,
        message: "Invalid parameters"
      };
    }

    const fields: EmbedFieldData[] = topResults
      .map((entry, i) => [
        {
          name: getPositionString(entry.rank ?? i + 1),
          value: entry.name,
          inline: true
        },
        { name: `${entry.wpm} wpm`, value: `${entry.acc}% acc`, inline: true },
        {
          name: `${entry.raw} raw`,
          value: `${entry.consistency}% con`,
          inline: true
        }
      ])
      .flat();

    const embed = client.embed({
      title: `Daily ${leaderboardID} leaderboard result`,
      color: 0xe2b714,
      thumbnail: {
        url: Client.thumbnails.crown
      },
      fields
    });

    (await client.getChannel("typing"))?.send({
      embeds: [embed]
    });

    return {
      status: true,
      message: "Successfully announced leaderboard top results"
    };
  }
} as MonkeyTypes.TaskFile;
