import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

//The config is for adding the api key
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

//Use the config inside the new OpenAIApi to be able to use it
const openai = new OpenAIApi(config);

const router = express.Router();

router.route("/").get((req, res) => {
  res.status(200).json({ message: "Hello from DALLE routes" });
});

//This is the route that takes the prompt from the client side
router.route("/").post(async (req, res) => {
  try {
    //Desctructures the prompt from the req body
    const { prompt } = req.body;
    //This is the image response which is the create image function from open ai
    const response = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });
    //This the image in b64_json format
    const image = response.data.data[0].b64_json;
    //Sends the photo in json format to the front end
    res.status(200).json({ photo: image });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
