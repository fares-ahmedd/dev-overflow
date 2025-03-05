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
import {
  PopularTagType,
  QuestionWithAnswersAndTags,
  TagType,
  UserType,
} from "@/lib/types";
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

    const { page = 1, pageSize = 10, searchQuery, filter } = params;

    const query: FilterQuery<ITag> = {};

    if (searchQuery) {
      query.$or = [{ name: { $regex: new RegExp(searchQuery, "i") } }];
    }

    let sortOptions = {};

    switch (filter) {
      case "popular":
        // Use aggregation to sort by the length of the `questions` array
        const tags: TagType[] = await Tag.aggregate([
          { $match: query }, // Apply the search query
          { $addFields: { questionsCount: { $size: "$questions" } } }, // Add a field for the length of the `questions` array
          { $sort: { questionsCount: -1 } }, // Sort by the new `questionsCount` field
        ]);
        return tags;
      case "recent":
        sortOptions = { createdOn: -1 };
        break;
      case "old":
        sortOptions = { createdOn: 1 };
        break;
      case "name":
        sortOptions = { name: 1 };
        break;
      default:
        sortOptions = {};
    }

    const tags: TagType[] = await Tag.find(query).sort(sortOptions);
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

export async function getPopularTags() {
  try {
    connectToDatabase();

    const popularTags: PopularTagType[] = await Tag.aggregate([
      { $project: { name: 1, numberOfQuestions: { $size: "$questions" } } },
      { $sort: { numberOfQuestions: -1 } },
      { $limit: 5 },
    ]);

    return popularTags;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
