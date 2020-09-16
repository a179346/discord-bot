require('./system/env');
require('./server');
const Discord = require('discord.js');
const bot = new Discord.Client();
const Music = require('./utils/Music');
const music = new Music();

bot.on('ready', () => {
  console.info('Successfully logged in!');
});

bot.on('message', async (msg) => {
  if (msg.author.bot) return;
  if (!msg.content.includes('咩噗')) return;
  if (!msg.member.voice.channel) {
    msg.reply('你必須先加入語音頻道');
    return;
  }

  await music.join(msg);
  music.play(msg);
});

bot.login(process.env.DISCORD_BOT_TOKEN);