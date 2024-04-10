import { ChatOpenAI } from "@langchain/openai";

const model = new ChatOpenAI({
  modelName: "gpt-3.5-turbo",
  temperature: 0.5,
  openAIApiKey: process.env.OPEN_AI_KEY,
});

const response = await model.invoke("Hello, who are you");

console.log(response.content);
