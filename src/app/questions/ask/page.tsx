import React from "react";
import ShimmerButton from "@/components/magicui/shimmer-button";

const AskQuestionPage = () => {
  return (
    <div className="container mx-auto px-4 pt-32 pb-20">
      <h1 className="mb-6 text-3xl font-bold">Ask a Question</h1>

      <form className="space-y-4 max-w-2xl">
        <input
          type="text"
          placeholder="Title"
          className="w-full rounded-lg border p-3 text-black"
        />

        <textarea
          placeholder="Describe your problem..."
          className="w-full rounded-lg border p-3 h-40 text-black"
        />

        <input
          type="text"
          placeholder="Tags (comma separated)"
          className="w-full rounded-lg border p-3 text-black"
        />

        <ShimmerButton>
          <span className="text-white">Post Question</span>
        </ShimmerButton>
      </form>
    </div>
  );
};

export default AskQuestionPage;