import { databases, users } from "@/models/server/config";
import { answerCollection, db, voteCollection } from "@/models/name";
import { Query } from "node-appwrite";

export async function enrichQuestions(questions: any[]) {
  return Promise.all(
    questions.map(async (ques) => {
      let author;

      try {
        author = await users.get(ques.authorId);
      } catch {
        author = {
          $id: "unknown",
          name: "Anonymous",
          prefs: { reputation: 0 },
        };
      }

      const [answers, votes] = await Promise.all([
        databases.listDocuments(db, answerCollection, [
          Query.equal("questionId", ques.$id),
          Query.limit(1),
        ]),
        databases.listDocuments(db, voteCollection, [
          Query.equal("type", "question"),
          Query.equal("typeId", ques.$id),
          Query.limit(1),
        ]),
      ]);

      return {
        ...ques,
        totalAnswers: answers.total,
        totalVotes: votes.total,
        author: {
          $id: author.$id,
          name: author.name,
          reputation: author.prefs.reputation,
        },
      };
    })
  );
}