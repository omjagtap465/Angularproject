import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators'; // Import operators from 'rxjs/operators'
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { createCommentActions } from './action';
import { CommentService } from '../services/comment.service';
import { CommentResponseInterface } from '../types/commentResponse.interface';
export const createCommentEffects = createEffect(
    (
        actions$ = inject(Actions),
        commentService = inject(CommentService),

    ) => {
        return actions$.pipe(
            ofType(createCommentActions.createComment),
            switchMap(({ slug, comment }) => {

                return commentService.createComment(slug, comment).pipe(
                    map((comment: CommentResponseInterface) => {
                        // persistanceService.set('accessToken', currentUser.token)
                        console.log(comment, "Response");

                        const response = createCommentActions.createCommentSuccess({ comment });
                        console.log(response);
                        response.comment.comment
                        return response
                    }),
                    catchError((errorResponse: HttpErrorResponse) => {
                        console.log("Error");

                        return of(
                            createCommentActions.createCommentFailure()
                        );
                    })
                );
            })
        );
    },
    { functional: true }
);