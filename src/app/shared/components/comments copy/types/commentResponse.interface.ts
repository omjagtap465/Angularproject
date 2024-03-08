// import { CurrentUserInterface } from "src/app/shared/types/currentUser.interface"
import { CurrentUserRequestInterface } from '../../articleForm/types/currentUser.interface';
export interface AuthorInterface {
  username: string;
  bio: string | null;
  image: string;
  following: false;
}
export interface CommentResponseInterface {
  author: AuthorInterface;
  body: string;
  createdAt: string;
  id: number;
  updatedAt: string;
}

export interface CommentGetInterface {
  comments: CommentResponseInterface[] | null;
}
export interface CommentApiResponse {
  comment: CommentResponseInterface;
}
