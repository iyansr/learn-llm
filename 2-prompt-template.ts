import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "langchain/prompts";

const model = new ChatOpenAI({
  modelName: "gpt-3.5-turbo",
  temperature: 0.5,
  openAIApiKey: process.env.OPEN_AI_KEY,
});

// const template = ChatPromptTemplate.fromTemplate(
//   "You are a helpful assistant that translates {input_language} to {output_language}. Response must be in {output_language}. Input: {text}"
// );

const template = ChatPromptTemplate.fromMessages([
  ["system", "You are a helpful assistant that translates {input_language} to {output_language} based on user input"],
  ["human", "{text}"],
]);

const prompt = await template.format({
  input_language: "English",
  output_language: "French",
  text: "Hello, who are you?",
});

console.log(prompt);

const chain = template.pipe(model);

const response = await chain.invoke({
  input_language: "English",
  output_language: "French",
  text: "Hello, who are you?",
});

console.log(response.content);
