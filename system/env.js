process.env.NODE_TLS_REJECT_UNAUTHORIZED = process.env.NODE_TLS_REJECT_UNAUTHORIZED || '0';
try {
  require('./secret');
} catch (error) {
  process.env.DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID || 'discord-client-id';
  process.env.DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET || 'discord-client-secret';
  process.env.DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN || 'discord-bot-token';
  process.env.PORT = process.env.PORT || '3000';
}