// import express from "express";
// import cors from "cors";
// import stripeRouter from "./src/routes/striperoute.js";
// import "dotenv/config";
// import connectDB from "./src/dbconnect/db.js";
// connectDB();
// const PORT = process.env.PORT || 4000;
// const app = express();

// app.use(express.json());
// app.use(cors());
// app.use("/api/stripe", stripeRouter);

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// app.listen(PORT, () => {
//   console.log(`Server running at port ${PORT}`);
// });

// import express from "express";
// import pkg from "agora-token";
// import cors from 'cors'
// const { RtcTokenBuilder, RtcRole } = pkg;

// const app = express();
// app.use(express.json());
// app.use(cors());
// const APP_ID = "f120bd205878472d9e31b701ddf2235f";
// const APP_CERTIFICATE = "bb0d61d7f1ed4cf79dd6ba88c0c2081e";

// app.post("/getRtcToken", (req, res) => {
//   const channelName = req.body.channelName;
//   const uid = req.body.uid || 0;
//   const role = RtcRole.PUBLISHER;
//   const expireTime = 3600;

//   const token = RtcTokenBuilder.buildTokenWithUid(
//     APP_ID,
//     APP_CERTIFICATE,
//     channelName,
//     uid,
//     role,
//     expireTime
//   );

//   res.send({ token });
// });

// app.listen(3000, () => {
//   console.log("Server running on port 3000");
// });

import express from "express";
import pkg from "agora-token";
import cors from "cors";
const { RtcTokenBuilder, RtmTokenBuilder, RtcRole } = pkg;

const app = express();
app.use(express.json());
app.use(cors());

const APP_ID = "f120bd205878472d9e31b701ddf2235f";
const APP_CERT = "bb0d61d7f1ed4cf79dd6ba88c0c2081e";
app.post("/token", (req, res) => {
  const { channel, uid } = req.body;
  const expire = Math.floor(Date.now() / 1000) + 3600;
  const numericUid = parseInt(uid.split("-")[0], 36) % 2147483647 || 0;
  const cleanRTMuid = String(uid).replace(/[^A-Za-z0-9_]/g, "");
  const rtcToken = RtcTokenBuilder.buildTokenWithUid(
    APP_ID,
    APP_CERT,
    channel,
    numericUid,
    RtcRole.PUBLISHER,
    expire
  );
  const rtmToken = RtmTokenBuilder.buildToken(
    APP_ID,
    APP_CERT,
    cleanRTMuid,
    1,
    expire
  );

  res.json({
    rtcToken,
    rtmToken,
    uid: numericUid,
    rtmUid: cleanRTMuid,
    displayUid: uid,
  });
});

app.listen(5000, () => console.log("✅ Token Server: http://localhost:5000"));
