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
  GetAllTagsReturnType,
  GetQuestionsByTagIdType,
  PopularTagType,
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

export async function getAllTags(
  params: GetAllTagsParams
): Promise<GetAllTagsReturnType> {
  try {
    connectToDatabase();

    const { page = 1, pageSize = 10, searchQuery, filter } = params;

    const query: FilterQuery<ITag> = {};
    const skipAmount = (page - 1) * pageSize;

    if (searchQuery) {
      query.$or = [{ name: { $regex: new RegExp(searchQuery, "i") } }];
    }

    let sortOptions = {};

    switch (filter) {
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

    const tags: TagType[] = await Tag.find(query)
      .skip(skipAmount)
      .limit(pageSize)
      .sort(sortOptions);

    const totalTags = await Tag.countDocuments(query);
    const totalPages = Math.ceil(totalTags / pageSize);
    const isNext = totalTags > skipAmount + tags.length;

    return { tags, meta: { totalPages, isNext } };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getQuestionsByTagId(
  params: GetQuestionsByTagIdParams
): Promise<GetQuestionsByTagIdType> {
  try {
    connectToDatabase();

    const { tagId, page = 1, pageSize = 10, searchQuery } = params;

    const skipAmount = (page - 1) * pageSize;
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
        skip: skipAmount,
        limit: pageSize + 1,
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkId name picture" },
      ],
    });

    if (!tag) {
      throw new Error("Tag not found");
    }

    const tagWithAllQuestions = await Tag.findOne(tagFilter);
    const totalPages = tagWithAllQuestions.questions.length;

    const isNext = tag.questions.length > pageSize;

    return {
      questions: tag.questions,
      name: tag.name,
      meta: {
        totalPages,
        isNext,
      },
    };
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
