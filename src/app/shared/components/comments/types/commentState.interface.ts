import { CommentResponseInterface } from "./commentResponse.interface";

export interface CommentStateInterface {
    isLoading: boolean,
    comment: CommentResponseInterface[],
    isSubmitting: boolean,

};