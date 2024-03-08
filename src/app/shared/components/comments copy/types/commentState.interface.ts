import {
  CommentGetInterface,
  CommentResponseInterface,
} from './commentResponse.interface';

export interface CommentStateInterface {
  isLoading: boolean;
  comments: CommentResponseInterface[];
  isSubmitting: boolean;
}
export interface CommentGetInitialState {
  isLoading: boolean;
  comments: CommentGetInterface | null;
  isSubmitting: boolean;
}
