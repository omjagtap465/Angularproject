import { Route } from "@angular/router";
import { CommentComponent } from "./comment.component";
import { createCommentEffects } from "../../store/effects";
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { CommentService } from "../../services/comment.service";
import { commentFeatureKey, commentReducer } from "../../store/reducer";
export const routes: Route[] = [{
    path: '',
    component: CommentComponent,

}]