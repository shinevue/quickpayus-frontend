export interface FeedbackType {
  id: string;
  user: any;
  rating: number;
  comment: string;
  image: string;
  createdAt: string;
}

export interface FetchFeedbackResponse {
  success: boolean;
  totalCount: number;
  feedbacks: FeedbackType[];
}
