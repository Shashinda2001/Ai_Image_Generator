// import * as dotenv from "dotenv";
// import { createError } from "../error.js";
// import { Configuration, OpenAIApi } from "openai";

// dotenv.config();

// // Setup open ai api key
// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

// // Controller to generate Image

// export const generateImage = async (req, res, next) => { 
//   try {
//     const {prompt} = req.body;

//     const response = await openai.createImage({ 
//       prompt,
//       n: 1,
//       size: "1024x1024",
//       response_format: "b64_json",
//     });
//     const generatedImage = response.data.data[0].b64_json;
//     return res.status(200).json({ photo: generatedImage });
//   } catch (error) {
//     next(
//       createError(
//         error.status,
//         error?.response?.data?.error?.message || error?.message
//       )
//     );
//   }
// };
 
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
  
import axios from "axios";
import * as dotenv from "dotenv";
import { createError } from "../error.js";

dotenv.config();

export const generateImage = async (req, res, next) => {
  try {
    const { prompt } = req.body;

    // 1. First try with Stable Diffusion XL
    let response;
    try {
      response = await axios.post(
        "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
        { inputs: prompt },
        {
          headers: { Authorization: `Bearer ${process.env.HF_API_KEY}` },
          responseType: "arraybuffer",
          timeout: 30000 // 30 seconds timeout
        }
      );
    } catch (sdError) {
      console.warn("SDXL failed, trying smaller model...");
      // 2. Fallback to smaller model if SDXL fails
      response = await axios.post(
        "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
        { inputs: prompt },
        {
          headers: { Authorization: `Bearer ${process.env.HF_API_KEY}` },
          responseType: "arraybuffer",
          timeout: 30000
        }
      );
    }

    // Convert to base64
    const imageBase64 = Buffer.from(response.data).toString("base64");
    return res.status(200).json({ 
      photo: `data:image/png;base64,${imageBase64}`,
      model: response.config.url.includes("xl-base") ? "SDXL" : "SDv1.5"
    });
    
  } catch (error) {
    console.error("Full error details:", error.response?.data || error.message);
    
    // Specific error handling
    if (error.response?.status === 503) {
      return next(createError(503, "Model is loading, please try again in 30 seconds"));
    }
    if (error.response?.status === 429) {
      return next(createError(429, "Too many requests - free tier limit reached"));
    }
    
    next(createError(500, "Image generation failed. Please try a different prompt."));
  }
};