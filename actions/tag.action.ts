"use server";

import { connectToDatabase } from "@/db/mongoose";
import { GetAllTagsParams, GetTopInteractedTagsParams } from "./shared.types";
import User from "@/db/user.model";
import Tag from "@/db/tag.model";
import { TagType, UserType } from "@/lib/types";

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
    console.log(error);
    throw error;
  }
}

export async function getAllTags(params: GetAllTagsParams) {
  try {
    connectToDatabase();

    const tags: TagType[] = await Tag.find({});

    return tags;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
