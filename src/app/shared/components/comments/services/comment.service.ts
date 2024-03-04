import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateCommentInterface, CreateCommentRequestInterface } from '../types/createcomment.interface';
import { Observable } from 'rxjs';
import { CommentResponseInterface } from '../types/commentResponse.interface';
@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) {
  }
  createComment(slug: string, comment: CreateCommentInterface): Observable<CommentResponseInterface> {
    const obj: CreateCommentRequestInterface = {
      comment: comment
    }
    console.log('Requesting to create article:', obj);
    const fullUrl = "https://api.realworld.io/api" + `/articles/${slug}/comments`;
    return this.http.post<CommentResponseInterface>(fullUrl, obj)
  }
}

