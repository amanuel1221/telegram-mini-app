const TelegramBot = require("node-telegram-bot-api").default || require("node-telegram-bot-api");


const bot = new TelegramBot(
    process.env.BOT_TOKEN,
    {
        polling: false,
    }
);



exports.sendPdfAnnouncements = async (pdf) => {


    try {


        const teacherName =
            pdf.uploadedBy
                ?
                `${pdf.uploadedBy.firstName || ""} ${pdf.uploadedBy.lastName || ""}`.trim()
                :
                "Teacher";



        const message = `

📚 *New Learning Material Uploaded*

📄 *Title:*
${pdf.title}


👨‍🏫 *Uploaded by:*
${teacherName}


📝 *Description:*
${pdf.description || "Course material"}


`;



        const keyboard = {

            inline_keyboard: [

                [
                    {
                        text: "📖 Read PDF",
                        web_app: {
                            url:
                                `${process.env.CLIENT_URL}/pdfs/${pdf._id}`
                        }
                    }
                ]

            ]

        };



        await bot.sendMessage(

            process.env.GROUP_ID,

            message,

            {
                parse_mode: "Markdown",
                reply_markup: keyboard
            }

        );



        console.log(
            "✅ PDF announcement sent"
        );



    }
    catch (error) {

        console.error(
            "Telegram announcement error:",
            error.message
        );

    }



};