import {
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  inject,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CreateCommentRequestInterface } from '../../types/createcomment.interface';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from '../../services/comment.service';
import { createCommentActions } from '../../store/action';
import {
  selectComments,
  selectIsLoading,
  selectIsSubmitting,
} from '../../store/reducer';
import { CommonModule, NgFor, NgForOf } from '@angular/common';
import { Observable, combineLatest, map } from 'rxjs';
import { CommentResponseInterface } from '../../types/commentResponse.interface';
import { LoadingComponent } from '../../../loading/loading.component';
// import { ToastModule } from 'primeng/toast
// import { BrowserModule } from '@angular/platform-browser'
@Component({
  selector: 'mc-comment',
  standalone: true,
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    NgFor,
    NgForOf,
    LoadingComponent,
  ],
})
export class CommentComponent implements OnInit {
  form = this.fb.nonNullable.group({
    body: '',
  });
  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    comment: this.store.select(selectComments),
    isLoading: this.store.select(selectIsLoading),
  });
  comment: CommentResponseInterface = {
    id: 0,
    createdAt: '',
    updatedAt: '',
    body: '',
    author: { username: '', bio: '', image: '', following: false },
  };
  comments$: Observable<CommentResponseInterface[]> | undefined;
  constructor(
    private fb: FormBuilder,
    private store: Store,
    private route: ActivatedRoute
  ) {}
  commentArray: CommentResponseInterface[] = [];
  Comment = inject(CommentService);
  slug = this.route.snapshot.paramMap.get('slug');
  onSubmit(): void {
    const formValue = this.form.getRawValue();

    let comment: CreateCommentRequestInterface = {
      comment: {
        body: formValue.body,
      },
    };
    // console.log(comment);
    this.store.dispatch(
      createCommentActions.createComment({ slug: this.slug, comment: comment })
    );
  }
  ngOnInit() {
    console.log('Comments');

    this.store.dispatch(createCommentActions.getComment({ slug: this.slug }));

    // this.comments$ = this.store.select(selectComments);
    // this.comments$.subscribe((comment) => console.log(comment));
    // this.Comment.getComments(this.slug).subscribe((data) => {
    //   console.log(data);
    // });
    // console.log();
  }
  deleteComment(id: number) {
    console.log(id);

    this.store.dispatch(
      createCommentActions.deleteComment({ slug: this.slug, id: id })
    );
  }
}
