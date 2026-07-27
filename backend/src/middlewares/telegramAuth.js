const crypto = require("crypto");


const verifyTelegramWebAppData = (initData) => {

  const params = new URLSearchParams(initData);

  const hash = params.get("hash");

  if (!hash) {
    return null;
  }

  params.delete("hash");


  const dataCheckString = [...params.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");


  const secretKey = crypto
    .createHmac(
      "sha256",
      "WebAppData"
    )
    .update(process.env.BOT_TOKEN)
    .digest();


  const calculatedHash = crypto
    .createHmac(
      "sha256",
      secretKey
    )
    .update(dataCheckString)
    .digest("hex");


  if (calculatedHash !== hash) {
    return null;
  }


  return JSON.parse(
    params.get("user")
  );

};



const telegramAuth = (req,res,next)=>{

  try {

    const initData =
      req.body.initDataRaw;


    if(!initData){
      return res.status(401).json({
        success:false,
        message:"Telegram Init Data missing"
      });
    }


    const telegramUser =
      verifyTelegramWebAppData(initData);


    if(!telegramUser){
      return res.status(401).json({
        success:false,
        message:"Invalid Telegram authentication"
      });
    }


    req.telegramUser = telegramUser;


    next();


  } catch(error){

    console.error(error);

    return res.status(401).json({
      success:false,
      message:"Authentication failed"
    });

  }

};


module.exports = telegramAuth;