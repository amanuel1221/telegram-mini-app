const { TelegramBot } = require("node-telegram-bot-api");

const bot = new TelegramBot(process.env.BOT_TOKEN);

const checkMembership = async (userId) => {
  try {
    const member = await bot.getChatMember(
      process.env.GROUP_ID,
      userId
    );

    return ["member", "administrator", "creator"].includes(member.status);
  } catch (error) {
    return false;
  }
};

module.exports = {
  checkMembership,
};