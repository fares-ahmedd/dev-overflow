"use server";

import { connectToDatabase } from "@/db/mongoose";

export async function createQuestion(params: any) {
  try {
    connectToDatabase();
  } catch (error) {}
}
