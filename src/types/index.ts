export interface Question {
  $id: string;
  title: string;
  content: string;
  tags: string[];
  authorId: string;
  attachmentId?: string;

  totalAnswers?: number;
  totalVotes?: number;

  author?: {
    $id: string;
    name: string;
    reputation: number;
  };
}