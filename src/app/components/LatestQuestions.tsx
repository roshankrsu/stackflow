import { unstable_noStore } from "next/cache";
import QuestionCard from "@/components/QuestionCard";
import {
  answerCollection,
  db,
  questionCollection,
  voteCollection,
} from "@/models/name";
import { databases, users } from "@/models/server/config";
import { UserPrefs } from "@/store/Auth";
import { Query } from "node-appwrite";
import React from "react";
import { enrichQuestions } from "@/lib/questions";
import { normalizeTags } from "@/lib/utils";

const LatestQuestions = async () => {
  unstable_noStore(); // disables caching
  const questions = await databases.listDocuments(db, questionCollection, [
    Query.limit(5),
    Query.orderDesc("$createdAt"),
  ]);

  console.log("Fetched Questions:", questions);

  questions.documents = await enrichQuestions(questions.documents);

  questions.documents = questions.documents.map((q) => ({
    ...q,
    tags: normalizeTags(q.tags),
  }));

  return (
    <div className="space-y-6">
      {questions.documents.map((question) => (
        <QuestionCard key={question.$id} ques={question} />
      ))}
    </div>
  );
};

export default LatestQuestions;
