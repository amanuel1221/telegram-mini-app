const cron = require("node-cron");

const User = require("../models/User");

const {
  checkMembership,
} = require("../services/telegramService");



const startMembershipSync = () => {


  // Every 30 minutes
  cron.schedule("*/30 * * * *", async () => {


    console.log(
      "🔄 Starting Telegram membership sync..."
    );


    try {


      const users = await User.find();


      console.log(
        `Checking ${users.length} users`
      );



      for (const user of users) {


        try {


          const isMember =
            await checkMembership(
              user.telegramId
            );



          if(user.isMember !== isMember){


            user.isMember = isMember;


            await user.save();



            console.log(
              `Updated ${user.telegramId}: ${isMember}`
            );


          }



        } catch(error){


          console.log(
            `Failed checking ${user.telegramId}`,
            error.message
          );


        }


      }



      console.log(
        "✅ Membership sync completed"
      );


    } catch(error){


      console.error(
        "Membership Sync Error:",
        error
      );


    }


  });


};



module.exports = startMembershipSync;