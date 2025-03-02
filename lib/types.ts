export type Theme = "light" | "dark";

export type QuestionWithAnswersAndTags = {
  _id: string;
  title: string;
  content: string;
  tags: TagType[];
  upvotes: string[];
  views: number;
  downvotes: string[];
  author: UserType;
  answers: string[];
  createdAt: Date;
};

export type AnswerType = {
  _id: string;
  author: UserType;
  question: string;
  content: string;
  upvotes: string[];
  downvotes: string[];
  createdAt: Date;
};

export type QuestionType = {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  views: number;
  upvotes: string[];
  downvotes: string[];
  author: string;
  answers: string[];
  createdAt: Date;
};

export type TagType = {
  _id: string;
  name: string;
  questions: string[];
  followers: string[];
  createdOn: Date;
};
export type UserType = {
  _id: string;
  clerkId: string;
  name: string;
  username: string;
  email: string;
  picture: string;
  location?: string;
  bio?: string;
  portfolioWebsite?: string;
  reputation: number;
  saved: string[];
  joinedAt: Date;
};

export type UserAnswerType = {
  _id: string;
  author: {
    _id: string;
    clerkId: string;
    picture: string;
    name: string;
  };
  question: {
    _id: string;
    title: string;
  };
  content: string;
  upvotes: string[];
  downvotes: string[];
  createdAt: Date;
};
