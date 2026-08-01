const TelegramBot =
  require("node-telegram-bot-api").default ||
  require("node-telegram-bot-api");

const bot = new TelegramBot(
  process.env.BOT_TOKEN,
  {
    polling: false,
  }
);

exports.sendPdfAnnouncements = async (pdf) => {
  try {
    console.log("========== TELEGRAM ANNOUNCEMENT ==========");
    console.log("PDF:", pdf.title);
    console.log("GROUP_ID:", process.env.GROUP_ID);
    console.log("CLIENT_URL:", process.env.CLIENT_URL);

    const teacherName = pdf.uploadedBy
      ? (
        `${pdf.uploadedBy.firstName || ""} ${pdf.uploadedBy.lastName || ""}`
      ).trim() ||
      `@${pdf.uploadedBy.username || "Teacher"}`
      : "Teacher";

    const message = `
📚 *New Learning Material Uploaded*

📄 *Title:*
${pdf.title}

👨‍🏫 *Uploaded by:*
${teacherName}

📝 *Description:*
${pdf.description || "Course material"}

👇 Tap the button below to open the LMS.
`;

    const keyboard = {
      inline_keyboard: [
        [
          {
            text: "📖 Open LMS",
            web_app: {
              url: process.env.CLIENT_URL,
            },
          },
        ],
      ],
    };

    await bot.sendMessage(
      process.env.GROUP_ID,
      message,
      {
        parse_mode: "Markdown",
        reply_markup: keyboard,
      }
    );

    console.log("✅ LMS announcement sent");
    console.log("==========================================");
  } catch (error) {
    console.error("❌ Telegram Announcement Error");
    console.error(error.message);

    if (error.response) {
      console.error(error.response.body);
    }
  }
};