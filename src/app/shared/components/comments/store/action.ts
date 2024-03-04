import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CreateCommentInterface } from '../types/createcomment.interface';
import { CommentResponseInterface } from '../types/commentResponse.interface';



export const createCommentActions = createActionGroup({
    source: 'createComment',
    events: {
        'Create  Comment': props<{ slug: any, comment: CreateCommentInterface }>(),
        'Create  Comment success': props<{ comment: CommentResponseInterface }>(),
        'Create  Comment failure': emptyProps(),

        // 'Get  article success': props<{ article: ArticleInterface }>(),
        // 'Get  article failure': emptyProps(),
        // 'Update  article': props<{ request: ArticleRequestInterface, slug: string }>(),
        // 'Update  article success': props<{ article: ArticleInterface }>(),
        // 'Update  article failure': props<{ errors: BackendErrorsInterface }>(),
    },
});
