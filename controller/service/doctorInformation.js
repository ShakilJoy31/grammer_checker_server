const GrammerCorrectionModel = require("../../models/doctor");

// Create (POST)
const createGrammerPrompt = async (req, res, next) => {
  try {
    const { text, correctedText, mode } = req.body;

    const newDoctor = await GrammerCorrectionModel.create({
      text,
      correctedText,
      mode
    });

    return res.status(201).json({
      message: "Prompt successfully saved to database.",
      doctor: newDoctor,
    });
  } catch (error) {
    next(error);
  }
};

// Get all data with pagination (GET)
const getAllGrammerPrompts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    // Sequelize uses findAndCountAll for pagination
    const { count, rows } = await GrammerCorrectionModel.findAndCountAll({
      offset,
      limit,
      order: [['createdAt', 'DESC']] // Sort by newest first
    });

    return res.status(200).json({
      message: "Prompts retrieved successfully",
      data: rows,
      pagination: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit),
        hasNextPage: page * limit < count,
        hasPreviousPage: page > 1
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createGrammerPrompt,
  getAllGrammerPrompts
};
























// Open api integration controller. 





// const GrammerCorrectionModel = require("../../models/doctor");
// const OpenAI = require('openai'); // Updated import

// // Initialize OpenAI with your API key
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY // Make sure this is in your .env file
// });

// const processGrammarCorrection = async (req, res, next) => {
//   try {
//     const { text, mode } = req.body;

//     // Input validation
//     if (!text || !mode) {
//       return res.status(400).json({ 
//         success: false,
//         message: "Both text and mode are required" 
//       });
//     }

//     // Validate mode
//     const validModes = ['basic', 'explanation', 'formal'];
//     if (!validModes.includes(mode)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid mode. Must be one of: basic, explanation, formal"
//       });
//     }

//     // Process with OpenAI
//     const correctionResult = await generateAICorrection(text, mode);

//     // Save to database
//     const savedCorrection = await GrammerCorrectionModel.create({
//       original_text: text,
//       corrected_text: correctionResult.correctedText,
//       mode: mode,
//       corrections: correctionResult.corrections || null,
//       usage_details: correctionResult.usage || null
//     });

//     // Prepare response
//     const response = {
//       success: true,
//       correctionId: savedCorrection.id,
//       originalText: savedCorrection.original_text,
//       correctedText: savedCorrection.corrected_text,
//       mode: savedCorrection.mode,
//       createdAt: savedCorrection.created_at
//     };

//     if (mode === 'explanation') {
//       response.explanations = correctionResult.corrections;
//     }

//     return res.status(201).json(response);

//   } catch (error) {
//     console.error("Error in processGrammarCorrection:", error);
//     next(error);
//   }
// };

// // AI Correction Generation
// async function generateAICorrection(text, mode) {
//   const prompts = {
//     basic: `Correct the following English text grammatically without changing its meaning:\n\n"${text}"`,
//     explanation: `Correct the following text grammatically, and for each correction, provide a brief explanation in this exact format: "[Original]->[Corrected] (Explanation: [Reason])":\n\n"${text}"`,
//     formal: `Rewrite the following text in formal, professional English while preserving its original meaning:\n\n"${text}"`
//   };

//   // Updated OpenAI API call
//   const response = await openai.chat.completions.create({
//     model: "gpt-3.5-turbo",
//     messages: [
//       {
//         role: "system",
//         content: "You are a professional English grammar correction system."
//       },
//       {
//         role: "user",
//         content: prompts[mode]
//       }
//     ],
//     temperature: 0.3,
//     max_tokens: 1000
//   });

//   // Updated response structure
//   const result = {
//     correctedText: response.choices[0].message.content.trim(), // Updated path
//     corrections: [],
//     usage: {
//       prompt_tokens: response.usage.prompt_tokens,
//       completion_tokens: response.usage.completion_tokens,
//       total_tokens: response.usage.total_tokens
//     }
//   };

//   if (mode === 'explanation') {
//     result.corrections = parseExplanations(result.correctedText);
//     // Extract just the corrected text without explanations
//     result.correctedText = result.correctedText.replace(/\[.+?\]->.+?\(Explanation: .+?\)/g, '')
//       .replace(/\n+/g, '\n').trim();
//   }

//   return result;
// }

// // Parse explanations in format: [Original]->[Corrected] (Explanation: [Reason])
// function parseExplanations(text) {
//   const regex = /\[(.+?)\]->\[(.+?)\] \(Explanation: (.+?)\)/g;
//   const corrections = [];
//   let match;

//   while ((match = regex.exec(text)) !== null) {
//     corrections.push({
//       original: match[1].trim(),
//       corrected: match[2].trim(),
//       explanation: match[3].trim()
//     });
//   }

//   return corrections;
// }

// module.exports = {
//   processGrammarCorrection
// };


