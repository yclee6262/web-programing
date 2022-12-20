import mongoose from "mongoose";
import { dataInit } from "./upload.js";

import "dotenv-defaults/config.js";

mongoose.set("strictQuery", true);

async function connect() {
  // TODO 1 Connect to your MongoDB and call dataInit()
  const dboptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }

  mongoose.connect(
    // TODO Part I-3: connect the backend to mongoDB
    // dotenv.config(),
    process.env.MONGO_URL, dboptions
).then(async res => {
    dataInit()
    console.log("db connection is created")
})
  // TODO 1 End
}

export default { connect };
