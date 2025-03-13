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
import Interaction from "@/db/interaction.model";

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDatabase();
    const { userId, limit = 3 } = params;

    const user: UserType | null = await User.findById(userId);

    if (!user) throw new Error("User not found");

    const userInteractions = await Interaction.find({ user: userId }).populate({
      path: "tags",
      model: Tag,
      select: "_id name",
    });
    const tagFreqMap: { [key: string]: number } = {};
    const tagNameToIdMap: { [key: string]: any } = {};
    for (const interaction of userInteractions) {
      if (interaction && interaction.tags) {
        for (const tag of interaction.tags) {
          if (!tagNameToIdMap[tag.name]) {
            tagNameToIdMap[tag.name] = tag._id;
          }
          if (!tagFreqMap[tag.name]) {
            tagFreqMap[tag.name] = 1;
          } else {
            tagFreqMap[tag.name]++;
          }
        }
      }
    }
    const topInteractedTags = Object.keys(tagFreqMap).map((tagName) => ({
      _id: tagNameToIdMap[tagName],
      name: tagName,
      count: tagFreqMap[tagName],
    }));
    // Sort the tags by count in descending order
    topInteractedTags.sort((a, b) => b.count - a.count);
    return topInteractedTags
      .filter((tag) => ({
        _id: tag._id,
        name: tag.name,
      }))
      .slice(0, limit);
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
