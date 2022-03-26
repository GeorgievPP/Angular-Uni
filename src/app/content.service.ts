import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPost } from './shared/interfaces/post';

import { environment } from 'src/environments/environment';
import { IComment } from './shared/interfaces/comment';
const API_URL = environment.apiUrl;

@Injectable()
export class ContentService {
  constructor(private http: HttpClient) {}

  loadPost(id: string) {
    return this.http.get<IPost>(`${API_URL}/v1/projects/${id}`);
  }

  loadPosts() {
    return this.http.get<IPost[]>(`${API_URL}/v1/projects/all`);
  }

  savePost(data: any) {
    return this.http.post<IPost>(`${API_URL}/v1/projects/create`, data);
  }

  editPost(data: any) {
    return this.http.post<IPost>(`${API_URL}/v1/projects/edit`, data);
  }

  likePost(data: {postId: string, email: string}) {
    return this.http.post<IPost>(`${API_URL}/v1/projects/like`, data);
  }

  unlikePost(data: {postId: string, email: string}) {
    return this.http.post<IPost>(`${API_URL}/v1/projects/unlike`, data);
  }

  deletePost(data: {id: string}) {
    console.log(data);
    console.log(data.id);
    return this.http.post<IPost>(`${API_URL}/v1/projects/delete`, data);
  }

  getComments(data: {neshto: string}) {
    return this.http.post<IComment[]>(`${API_URL}/v1/comments/all`, data);
  }

  addComment(data: {description: string, author: string | undefined, post: string | undefined}) {
    return this.http.post<IPost>(`${API_URL}/v1/comments/add-comment`, data);
  }


}
