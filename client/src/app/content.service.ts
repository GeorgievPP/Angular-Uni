import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IPost } from './shared/interfaces/post';
import { IComment } from './shared/interfaces/comment';

import { environment } from 'src/environments/environment';
const API_URL = environment.apiUrl;

@Injectable()
export class ContentService {
  constructor(private http: HttpClient) {}

  loadPost(id: string) {
    return this.http.get<IPost>(`${API_URL}/v1/posts/${id}`);
  }

  loadPosts() {
    return this.http.get<IPost[]>(`${API_URL}/v1/posts/all`);
  }

  loadProfilePosts(data: {userId: string | undefined}) {
    return this.http.post<IPost[]>(`${API_URL}/v1/posts/profile-posts`, data);
  }

  savePost(data: any) {
    return this.http.post<IPost>(`${API_URL}/v1/posts/create`, data);
  }

  editPost(data: any) {
    return this.http.post<IPost>(`${API_URL}/v1/posts/edit`, data);
  }

  likePost(data: {postId: string, email: string}) {
    return this.http.post<IPost>(`${API_URL}/v1/posts/like`, data);
  }

  unlikePost(data: {postId: string, email: string}) {
    return this.http.post<IPost>(`${API_URL}/v1/posts/unlike`, data);
  }

  deletePost(data: {id: string}) {
    console.log(data);
    console.log(data.id);
    return this.http.post<IPost>(`${API_URL}/v1/posts/delete`, data);
  }

  getComments(data: {neshto: string}) {
    return this.http.post<IComment[]>(`${API_URL}/v1/comments/all`, data);
  }

  addComment(data: {description: string, author: string | undefined, jimHelper: string | undefined, post: string | undefined}) {
    return this.http.post<IComment>(`${API_URL}/v1/comments/add-comment`, data);
  }

  deleteComment(data: { commentId: string}) {
    return this.http.post<IComment>(`${API_URL}/v1/comments/del-comment`, data);
  }






}
