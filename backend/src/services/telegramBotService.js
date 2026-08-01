const TelegramBot =
  require("node-telegram-bot-api").default ||
  require("node-telegram-bot-api");

const bot = new TelegramBot(process.env.BOT_TOKEN, {
  polling: false,
});

exports.sendPdfAnnouncements = async (pdf) => {
  try {
    console.log("========== TELEGRAM ANNOUNCEMENT ==========");
    console.log("PDF:", pdf.title);
    console.log("GROUP_ID:", process.env.GROUP_ID);
    console.log("CLIENT_URL:", process.env.CLIENT_URL);

    const teacherName = pdf.uploadedBy
      ? `${pdf.uploadedBy.firstName || ""} ${pdf.uploadedBy.lastName || ""}`.trim() ||
        `@${pdf.uploadedBy.username || "Teacher"}`
      : "Teacher";

    const message = `
📚 *New Learning Material Uploaded*

📄 *Title:* ${pdf.title}

👨‍🏫 *Uploaded by:* ${teacherName}

📝 *Description:* ${pdf.description || "Course material"}
`;

    // First test: send message only
    await bot.sendMessage(
      process.env.GROUP_ID,
      message,
      {
        parse_mode: "Markdown",
      }
    );

    console.log("✅ Plain message sent.");

    // Second test: send button
    await bot.sendMessage(
      process.env.GROUP_ID,
      "Open the PDF below:",
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "📖 Read PDF",
                url: `${process.env.CLIENT_URL}/pdfs/${pdf._id}`,
              },
            ],
          ],
        },
      }
    );

    console.log("✅ Button message sent.");
    console.log("==========================================");

  } catch (error) {
    console.error("❌ Telegram Error:");
    console.error(error);

    if (error.response) {
      console.error(error.response.body);
    }
  }
};