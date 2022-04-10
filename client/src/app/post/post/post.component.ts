import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../content.service';
import { IPost } from '../../shared/interfaces/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  posts: IPost[] | undefined;

  totalLength: any;
  page: number = 1;

  constructor(private contentService: ContentService) {
    this.fetchPosts();
  }

  fetchPosts(): void {
    this.posts = undefined;
    this.contentService.loadPosts().subscribe((posts) => {
      this.posts = posts;
      this.totalLength = posts.length;
    });
  }
}
