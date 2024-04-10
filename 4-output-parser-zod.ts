import { ChatOpenAI } from "@langchain/openai";
import { StructuredOutputParser } from "langchain/output_parsers";
import { ChatPromptTemplate } from "langchain/prompts";
import * as z from "zod";

const model = new ChatOpenAI({
  modelName: "gpt-3.5-turbo",
  temperature: 0.5,
  openAIApiKey: process.env.OPEN_AI_KEY,
});

const template = ChatPromptTemplate.fromTemplate(
  "Answer the users question as best as possible.\n{format_instructions}\n{question}"
);

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    answer: z.string(),
    source: z.string(),
  })
);

const chain = template.pipe(model).pipe(parser);

console.log(parser.getFormatInstructions());

const res = await chain.invoke({
  question: "Where is Bali?",
  format_instructions: parser.getFormatInstructions(),
});

console.log(res);
