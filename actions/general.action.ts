"use server";

import { connectToDatabase } from "@/db/mongoose";
import { SearchParams } from "./shared.types";
import Question from "@/db/question.model";
import Tag from "@/db/tag.model";
import Answer from "@/db/answer.model";
import User from "@/db/user.model";

const searchableTypes = ["question", "answer", "tag", "user"];

export async function globalSearchResults(params: SearchParams) {
  try {
    connectToDatabase();

    const { query, type } = params;
    const regexQuery = { $regex: query, $options: "i" };

    let results = [];

    const modelsAndTypes = [
      { model: Question, searchField: "title", type: "question" },
      { model: User, searchField: "name", type: "user" },
      { model: Answer, searchField: "content", type: "answer" },
      { model: Tag, searchField: "name", type: "tag" },
    ];

    const typeToLower = type?.toLocaleLowerCase();

    if (!typeToLower || !searchableTypes.includes(typeToLower)) {
      for (const { model, searchField, type } of modelsAndTypes) {
        const queryResults = await model
          .find({ [searchField]: regexQuery })
          .limit(2);

        results.push(
          ...queryResults.map((result) => ({
            title:
              type === "answer"
                ? `Answers containing ${query}`
                : result[searchField],
            type,
            id:
              type === "user"
                ? result.clerkId
                : type === "answer"
                ? result.question
                : result._id,
          }))
        );
      }
    } else {
      const modelInfo = modelsAndTypes.find(
        (item) => item.type === typeToLower
      );

      if (!modelInfo) throw new Error("Invalid Type");

      const queryResults = await modelInfo.model
        .find({
          [modelInfo.searchField]: regexQuery,
        })
        .limit(8);

      results = queryResults.map((result) => ({
        title:
          type === "answer"
            ? `Answers containing ${query}`
            : result[modelInfo.searchField],
        type,
        id:
          type === "user"
            ? result.clerkId
            : type === "answer"
            ? result.question
            : result._id,
      }));
    }
    return JSON.stringify(results);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
