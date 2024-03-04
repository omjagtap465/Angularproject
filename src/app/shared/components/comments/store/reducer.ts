import { createFeature, createReducer, on } from '@ngrx/store';
import { routerNavigationAction } from '@ngrx/router-store';
import { CommentResponseInterface } from '../types/commentResponse.interface';
import { createCommentActions } from './action';
import { CommentStateInterface } from '../types/commentState.interface';

const initialState: CommentStateInterface = {
    isLoading: false,
    comment: [],
    isSubmitting: false,

};
const commentFeature = createFeature({
    name: 'comment',
    reducer: createReducer(
        initialState,
        on(createCommentActions.createComment, (state) => ({
            ...state,
            isLoading: true,
            isSubmitting: true
        })),
        on(createCommentActions.createCommentSuccess, (state, action) => ({
            ...state,
            isLoading: false,
            isSubmitting: false,
            comment: state.comment ? [...state.comment, action.comment] : [action.comment],
        })),
        on(createCommentActions.createCommentFailure, (state, action) => ({
            ...state,
            isLoading: false,

        })),

        on(routerNavigationAction, () => initialState)
    ),
});

export const {
    name: commentFeatureKey,
    reducer: commentReducer,
    selectIsLoading,
    selectCommentState,
    selectIsSubmitting,

} = commentFeature;