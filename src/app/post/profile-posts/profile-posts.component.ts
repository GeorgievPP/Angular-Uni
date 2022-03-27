import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/content.service';
import { IPost } from 'src/app/shared/interfaces';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-profile-posts',
  templateUrl: './profile-posts.component.html',
  styleUrls: ['./profile-posts.component.scss']
})
export class ProfilePostsComponent  {

  posts: IPost[] | undefined;

  constructor(private contentService: ContentService, private userService: UserService) {
    this.getProfilePosts();
  }

  getProfilePosts(): void {
    this.posts = undefined;
    const data = {
      userId: this.userService.user?._id
    }
    this.contentService.loadProfilePosts(data).subscribe((posts) => (this.posts = posts));
  }
}
