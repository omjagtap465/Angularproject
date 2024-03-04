import { Component, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CreateCommentInterface } from '../../types/createcomment.interface';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from '../../services/comment.service';
import { createCommentActions } from '../../store/action';
import { selectCommentState, selectIsLoading, selectIsSubmitting } from '../../store/reducer';
import { CommonModule, NgFor } from '@angular/common';
import { combineLatest } from 'rxjs';
@Component({
  selector: 'mc-comment',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, CommonModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent {
  form = this.fb.nonNullable.group({
    body: '',
  })
  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    comment: this.store.select(selectCommentState),
    isLoading: this.store.select(selectIsLoading),

  });
  constructor(private fb: FormBuilder, private store: Store, private route: ActivatedRoute) { }
  Comment = inject(CommentService)
  slug = this.route.snapshot.paramMap.get('slug');
  onSubmit(): void {
    const formValue = this.form.getRawValue()

    let comment: CreateCommentInterface = {
      body: formValue.body
    }
    console.log(comment)
    this.store.dispatch(createCommentActions.createComment({ slug: this.slug, comment }))
    this.data$.subscribe(data => {
      console.log(data.comment)
      // let d = data.comment
      // d?.forEach(comment => console.log(comment.commnet)
      // )

    }
    )

  }

}
