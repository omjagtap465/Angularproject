import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
  CreateCommentInterface,
  CreateCommentRequestInterface,
} from '../types/createcomment.interface';
import {
  CommentGetInterface,
  CommentResponseInterface,
} from '../types/commentResponse.interface';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';

export const createCommentActions = createActionGroup({
  source: 'createComment',
  events: {
    'Create  Comment': props<{
      slug: any;
      comment: CreateCommentRequestInterface;
    }>(),
    'Create  Comment success': props<{ comment: CommentResponseInterface }>(),
    'Create  Comment failure': props<{ errors: BackendErrorsInterface }>(),
    'Get  Comment': props<{
      slug: any;
    }>(),
    'Get  Comment success': props<{ comment: CommentGetInterface }>(),
    'Get  Comment failure': emptyProps(),
    'Delete  Comment': props<{
      slug: any;
      id: number;
    }>(),
    'Delete  Comment success': props<{
      id: number;
    }>(),
    'Delete  Comment failure': emptyProps(),

    // 'Get  article success': props<{ article: ArticleInterface }>(),
    // 'Get  article failure': emptyProps(),
    // 'Update  article': props<{ request: ArticleRequestInterface, slug: string }>(),
    // 'Update  article success': props<{ article: ArticleInterface }>(),
    // 'Update  article failure': props<{ errors: BackendErrorsInterface }>(),
  },
});
