/** @format */

import type { Command } from "../../interfaces/command";
import { spawn } from "child_process";

export default {
  name: "upgrade",
  description: "Upgrade the bot",
  category: "Dev",
  needsPermissions: true,
  run: async (interaction) => {
    const subprocess = spawn("/home/ubuntu/monkey-bot/upgrade.sh", [], {
      detached: true,
      stdio: "ignore"
    });

    subprocess.unref();

    interaction.reply("🤔 Upgrading...");
  }
} as Command;
