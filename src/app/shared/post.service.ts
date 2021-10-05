import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PostModel} from "./post-model";
import { CreatePostPayload } from '../components/posts/create-post/create-post.payload';
import { SubredditModel } from '../subreddits/model/subreddit-response';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<Array<PostModel>> {
    return this.http.get<Array<PostModel>>('http://localhost:8080/api/posts/');
  }

  createPost(createPostPayload: CreatePostPayload): Observable<CreatePostPayload> {
    return this.http.post<CreatePostPayload>('http://localhost:8080/api/posts/',
    createPostPayload);
  }

  getPost(id: number): Observable<PostModel> {
    return this.http.get<PostModel>('http://localhost:8080/api/posts/' + id);
  }
}
