import { createFeature, createReducer, on } from '@ngrx/store';
import { routerNavigationAction } from '@ngrx/router-store';

import { createCommentActions } from './action';
import {
  CommentGetInitialState,
  CommentStateInterface,
} from '../types/commentState.interface';

const initialStateComments: CommentGetInitialState = {
  isLoading: false,
  comments: null,
  isSubmitting: false,
};
// const commentFeature = createFeature({
//   name: 'comment',
//   reducer: createReducer(
//     initialState,
//     on(createCommentActions.createComment, (state) => ({
//       ...state,
//       isLoading: true,
//       isSubmitting: true,
//     })),
//     on(createCommentActions.createCommentSuccess, (state, action) => ({
//       ...state,
//       isLoading: false,
//       isSubmitting: false,
//       comments: [...state.comments, action.comment],
//     })),
//     on(createCommentActions.createCommentFailure, (state) => ({
//       ...state,
//       isLoading: false,
//     })),
//     on(createCommentActions.getComment, (state) => ({
//       ...state,
//       isLoading: true,
//       isSubmitting: true,
//     })),
//     on(createCommentActions.getCommentSuccess, (state, action) => ({
//       ...state,
//       isLoading: false,
//       isSubmitting: false,
//       comments: action.comment,
//     })),
//     on(createCommentActions.createCommentFailure, (state) => ({
//       ...state,
//       isLoading: false,
//     })),

//     on(routerNavigationAction, () => initialState)
//   ),
// });
const commentFeature = createFeature({
  name: 'comment',
  reducer: createReducer(
    initialStateComments,
    on(createCommentActions.createComment, (state) => ({
      ...state,
      isLoading: true,
      isSubmitting: true,
    })),
    on(createCommentActions.createCommentSuccess, (state, action) => {
      const comment = state.comments?.comments ?? [];
      return {
        ...state,
        isLoading: false,
        isSubmitting: false,
        comments: { comments: [...comment, action.comment] },
      };
    }),

    on(createCommentActions.createCommentFailure, (state) => ({
      ...state,
      isLoading: false,
    })),
    on(createCommentActions.getComment, (state) => ({
      ...state,
      isLoading: true,
      isSubmitting: true,
    })),
    on(createCommentActions.getCommentSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      isSubmitting: false,
      comments: action.comment,
    })),
    on(createCommentActions.deleteComment, (state) => ({
      ...state,
      isLoading: true,
      isSubmitting: true,
    })),
    on(createCommentActions.deleteCommentSuccess, (state, action) => {
      const comments = state.comments?.comments ?? [];
      return {
        ...state,
        isLoading: false,
        isSubmitting: false,
        comments: {
          comments: comments.filter((comment) => action.id !== comment.id),
        },
      };
    }),
    on(createCommentActions.deleteCommentFailure, (state) => ({
      ...state,
      isLoading: false,
    })),

    on(routerNavigationAction, () => initialStateComments)
  ),
});

export const {
  name: commentFeatureKey,
  reducer: commentReducer,
  selectIsLoading,
  selectComments,
  selectIsSubmitting,
} = commentFeature;
