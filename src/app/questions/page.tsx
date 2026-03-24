import { databases, users } from "@/models/server/config";
import {
  answerCollection,
  db,
  voteCollection,
  questionCollection,
} from "@/models/name";
import { Query } from "node-appwrite";
import React from "react";
import Link from "next/link";
import ShimmerButton from "@/components/magicui/shimmer-button";
import QuestionCard from "@/components/QuestionCard";
import { UserPrefs } from "@/store/Auth";
import Pagination from "@/components/Pagination";
import Search from "./Search";
import Footer from "../components/Footer";
import { enrichQuestions } from "@/lib/questions";
import { normalizeTags } from "@/lib/utils";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; tag?: string; search?: string }>;
}) => {
  const params = await searchParams;

  const page = params.page ?? "1";
  const tag = params.tag;
  const search = params.search;

  const queries = [Query.orderDesc("$createdAt"), Query.limit(25)];

  const questions = await databases.listDocuments(
    db,
    questionCollection,
    queries,
  );
  console.log("Questions", questions);

  questions.documents = await enrichQuestions(questions.documents);

  questions.documents = questions.documents.map((q) => ({
    ...q,
    tags: normalizeTags(q.tags),
  }));

  return (
    <div className="container mx-auto px-4 pb-20 pt-36">
      <div className="mb-10 flex items-center justify-between">
        <h1 className="text-3xl font-bold">All Questions</h1>
        <Link href="/questions/ask">
          <ShimmerButton className="shadow-2xl">
            <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
              Ask a question
            </span>
          </ShimmerButton>
        </Link>
      </div>
      <div className="mb-4">
        <Search />
      </div>
      <div className="mb-4">
        <p>{questions.total} questions</p>
      </div>
      <div className="mb-4 max-w-3xl space-y-6">
        {questions.documents.map((ques) => (
          <QuestionCard key={ques.$id} ques={ques} />
        ))}
      </div>
      <Pagination total={questions.total} limit={25} />
      <Footer />
    </div>
  );
};

export default Page;
