export interface TicketType {
  id: string;
  description: string;
  image: string;
  priority: string;
  status: string;
  title: string;
  createdAt: string;
  createdBy: {
    avatarBg: string;
    id: string;
    username: string;
  }
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
