import mongoose from 'mongoose';
import dotenv from "dotenv-defaults";
import cors from 'cors';

dotenv.config();
app.use(cors());

mongoose.connect(
    process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then((res) => console.log("mongo db connection created"));
