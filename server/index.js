require("dotenv").config();

const express = require("express");
const OpenAI = require("openai");

const app = express();

app.use(express.json());

app.use(express.static("public"));

const PORT = process.env.PORT || 3000;

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/", (req, res) => {
  res.send("My AI Chatbot Server is Running!");
});

app.post("/chat", async (req, res) => {

  try {

    const userMessage = req.body.message;

    console.log("User Message:", userMessage);

    const completion = await client.chat.completions.create({

      model: "gpt-4.1-mini",

      messages: [
        {
          role: "system",
          content: "You are a helpful AI assistant."
        },
        {
          role: "user",
          content: userMessage
        }
      ]

    });

    const aiReply = completion.choices[0].message.content;

    console.log("AI Reply:", aiReply);

    res.send(aiReply);

  } catch (error) {

    console.error("ERROR:", error);

    res.status(500).send("Something went wrong");

  }

});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});