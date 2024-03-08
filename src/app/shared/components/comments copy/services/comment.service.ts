import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CreateCommentInterface,
  CreateCommentRequestInterface,
} from '../types/createcomment.interface';
import { Observable, map, of } from 'rxjs';
import {
  CommentApiResponse,
  CommentGetInterface,
  CommentResponseInterface,
} from '../types/commentResponse.interface';
@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}
  createComment(
    slug: string,
    comment: CreateCommentRequestInterface
  ): Observable<CommentResponseInterface> {
    // const obj: CreateCommentRequestInterface = {
    const fullUrl =
      'https://api.realworld.io/api' + `/articles/${slug}/comments`;
    return this.http
      .post<CommentApiResponse>(fullUrl, comment)
      .pipe(map((response) => response.comment));
  }
  getComments(slug: string | null): Observable<CommentGetInterface> {
    const fullUrl =
      'https://api.realworld.io/api' + `/articles/${slug}/comments`;

    return this.http.get<CommentGetInterface>(fullUrl);
  }
  deleteComment(slug: string, id: number): Observable<{}> {
    const fullUrl =
      `https://api.realworld.io/api` + `/articles/${slug}/comments/${id}`;
    return this.http.delete(fullUrl);
  }
}
