export interface BlogPost {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  userRating: number;
  date: Date;
  content: string;
  images: string[];
  likes: number;
  isLiked: boolean;
  comments: Comment[];
  location?: string;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  date: Date;
}