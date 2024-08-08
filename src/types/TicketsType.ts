export interface TicketType {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  createdAt: string;
  createdBy: string;
  image?: string;
}

export interface FetchTicketResponse {
  success: boolean;
  totalCount: number;
  tickets: TicketType[];
}

export interface SendTicketReplyResponse {
  success: boolean;
  message: string;
}

export interface TicketReplyPayload {
  ticketId: string;
  title: string;
  content: string;
  username: string;
}
