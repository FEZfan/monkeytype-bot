import type { MonkeyTypes } from "../../types/types";
import { spawn } from "child_process";
import { randomChance } from "../../functions/random";

export default {
  name: "upgrade",
  description: "Upgrade the bot",
  category: "Dev",
  needsPermissions: true,
  run: async (interaction) => {
    const subprocess = spawn("/root/bot_deploy.sh", [], {
      detached: true,
      stdio: "ignore"
    });

    subprocess.unref();

    interaction.reply(randomChance(1) ? "🤔 Upgrading..." : "🤔 Thonking...");
  }
} as MonkeyTypes.Command;
