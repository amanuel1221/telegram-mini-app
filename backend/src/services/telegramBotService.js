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
          `${pdf.uploadedBy.firstName || ""} ${
            pdf.uploadedBy.lastName || ""
          }`
        ).trim()
        ||
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

`;



    // Mini App URL

    const miniAppUrl = new URL(
      `/pdfs/${encodeURIComponent(
        pdf._id.toString()
      )}`,
      process.env.CLIENT_URL
    ).toString();



    console.log(
      "Mini App URL:",
      miniAppUrl
    );



    const keyboard = {

      inline_keyboard: [

        [

          {

            text: "📖 Read PDF",

            web_app: {

              url: miniAppUrl,

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



    console.log(
      "✅ PDF Mini App announcement sent"
    );


    console.log(
      "=========================================="
    );


  } catch (error) {


    console.error(
      "❌ Telegram Announcement Error:"
    );


    console.error(
      error.message
    );


    if(error.response){

      console.error(
        error.response.body
      );

    }


  }

};