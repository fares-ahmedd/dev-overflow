"use server";

import { connectToDatabase } from "@/db/mongoose";
import { CreateAnswerParams, GetAnswersParams } from "./shared.types";
import Answer from "@/db/answer.model";
import Question from "@/db/question.model";
import { revalidatePath } from "next/cache";
import { AnswerType } from "@/lib/types";

export async function createAnswer(params: CreateAnswerParams) {
  try {
    connectToDatabase();

    const { content, author, question, path } = params;

    const newAnswer: AnswerType = await Answer.create({
      content,
      author,
      question,
    });

    await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });

    // Todo : Add Interaction

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAnswers(params: GetAnswersParams) {
  try {
    connectToDatabase();

    const { questionId, sortBy, page = 1, pageSize = 20 } = params;

    const answers: AnswerType[] = await Answer.find({ question: questionId })
      .populate("author", "_id clerkId name picture")
      .sort({ createdAt: -1 });

    return answers;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
