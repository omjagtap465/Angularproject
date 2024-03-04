import { CreateCommentInterface } from "./createcomment.interface";

export interface CommentInterface extends CreateCommentInterface {
    author: string;
}