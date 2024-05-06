//"use strict";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

const main = async (chatQuestion: string) => {
  const chatCompletion = await getGroqChatCompletion(chatQuestion);
  return chatCompletion.choices[0]?.message.content || "No results found foud!";
};

const getGroqChatCompletion = async (chatQuestion: string) => {
  return await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        //content: "Explain the importance of fast language models",
        content: chatQuestion,
      },
    ],
    model: "mixtral-8x7b-32768",
  });
};

export default main;
