import * as dotenv from "dotenv";
import { createError } from "../error.js";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

// Setup open ai api key
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Controller to generate Image

export const generateImage = async (req, res, next) => {
  try {
    const {prompt} = req.body;

    const response = await openai.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });
    const generatedImage = response.data.data[0].b64_json;
    return res.status(200).json({ photo: generatedImage });
  } catch (error) {
    next(
      createError(
        error.status,
        error?.response?.data?.error?.message || error?.message
      )
    );
  }
};
 
// import * as dotenv from "dotenv";
// import { createError } from "../error.js";
// import Replicate from "replicate";

// dotenv.config();

// // ✅ Initialize Replicate with your token
// const replicate = new Replicate({
//   auth: process.env.REPLICATE_API_TOKEN,
// });

// // ✅ Controller to generate image
// export const generateImage = async (req, res, next) => {
//   try {
//     const { prompt } = req.body;

//     // Running a model (e.g., SDXL or Flux-Schnell)
//     const output = await replicate.run(
//       "black-forest-labs/flux-schnell", // Or use a different model ID like "black-forest-labs/flux-schnell"
//       {
//         input: {
//           prompt: prompt,
//         },
//       }
//     );

//     // Send the image URL back
//     return res.status(200).json({ photo: output[0] });

//   } catch (error) {
//     next(
//       createError(
//         error.status || 500,
//         error?.response?.data?.error?.message || error?.message
//       )
//     );
//   }
// };
