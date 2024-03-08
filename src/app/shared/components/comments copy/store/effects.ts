import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators'; // Import operators from 'rxjs/operators'
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { createCommentActions } from './action';
import { CommentService } from '../services/comment.service';
import {
  CommentGetInterface,
  CommentResponseInterface,
} from '../types/commentResponse.interface';
export const createCommentEffects = createEffect(
  (actions$ = inject(Actions), commentService = inject(CommentService)) => {
    return actions$.pipe(
      ofType(createCommentActions.createComment),
      switchMap(({ slug, comment }) => {
        return commentService.createComment(slug, comment).pipe(
          map((comment: CommentResponseInterface) => {
            console.log(comment);

            return createCommentActions.createCommentSuccess({ comment });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            console.log('Error');

            return of(
              createCommentActions.createCommentFailure(errorResponse.error)
            );
          })
        );
      })
    );
  },
  { functional: true }
);
export const getCommentsEffects = createEffect(
  (actions$ = inject(Actions), commentService = inject(CommentService)) => {
    return actions$.pipe(
      ofType(createCommentActions.getComment),
      switchMap(({ slug }) => {
        return commentService.getComments(slug).pipe(
          map((comment: CommentGetInterface) => {
            console.log(comment);

            return createCommentActions.getCommentSuccess({ comment: comment });
          }),
          catchError(() => {
            console.log('Error');

            return of(createCommentActions.getCommentFailure());
          })
        );
      })
    );
  },
  { functional: true }
);
export const deleteCommentEffects = createEffect(
  (actions$ = inject(Actions), commentService = inject(CommentService)) => {
    return actions$.pipe(
      ofType(createCommentActions.deleteComment),
      switchMap(({ slug, id }) => {
        return commentService.deleteComment(slug, id).pipe(
          map(() => createCommentActions.deleteCommentSuccess({ id })),
          catchError(() => {
            console.log('Error');
            return of(createCommentActions.getCommentFailure());
          })
        );
      })
    );
  },
  { functional: true }
);
