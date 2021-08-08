const Discord = require("discord.js");
const client = new Discord.Client();

const ytdl = require("ytdl-core");

client.config = require("./config.json");

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
  client.user.setActivity(client.config.activity, { type: "PLAYING" });
});

client.on("ready", async () => {
  const channel = client.channels.cache.get(client.config.channel);
  if (!channel) return;

  const connection = await channel.join();
  connection.play(ytdl(client.config.live));
});

setInterval(async function() {
  if (!client.voice.connections.get(client.config.server)) {
    const channel = client.channels.cache.get(client.config.channel);
    if (!channel) return;

    const connection = await channel.join();
    connection.play(ytdl(client.config.live));
  }
}, 10000);

client.login(client.config.token);
