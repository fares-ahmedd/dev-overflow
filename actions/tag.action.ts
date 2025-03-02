"use server";
import { FilterQuery } from "mongoose";
import { connectToDatabase } from "@/db/mongoose";
import {
  GetAllTagsParams,
  GetQuestionsByTagIdParams,
  GetTopInteractedTagsParams,
} from "./shared.types";
import User from "@/db/user.model";
import Tag, { ITag } from "@/db/tag.model";
import { QuestionWithAnswersAndTags, TagType, UserType } from "@/lib/types";
import Question from "@/db/question.model";

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDatabase();
    const { userId } = params;

    const user: UserType | null = await User.findById(userId);

    if (!user) throw new Error("User not found");

    return [
      { name: "tag1", id: "1" },
      { name: "tag2", id: "2" },
      { name: "tag3", id: "3" },
    ];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getAllTags(params: GetAllTagsParams) {
  try {
    connectToDatabase();

    const tags: TagType[] = await Tag.find({});

    return tags;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getQuestionsByTagId(params: GetQuestionsByTagIdParams) {
  try {
    connectToDatabase();

    const { tagId, page = 1, pageSize = 10, searchQuery } = params;

    const tagFilter: FilterQuery<ITag> = { _id: tagId };
    const tag = await Tag.findOne(tagFilter).populate({
      path: "questions",
      model: Question,
      match: searchQuery
        ? {
            title: { $regex: searchQuery, $options: "i" },
          }
        : {},
      options: {
        sort: { createdAt: -1 },
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkId name picture" },
      ],
    });

    if (!tag) {
      throw new Error("Tag not found");
    }

    return {
      questions: tag.questions,
      name: tag.name,
    } as { questions: QuestionWithAnswersAndTags[]; name: string };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
