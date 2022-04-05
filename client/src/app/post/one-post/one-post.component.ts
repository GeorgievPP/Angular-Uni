import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ContentService } from 'src/app/content.service';
import { IPost } from 'src/app/shared/interfaces';
import { IComment } from 'src/app/shared/interfaces/comment';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-one-post',
  templateUrl: './one-post.component.html',
  styleUrls: ['./one-post.component.scss'],
})
export class OnePostComponent {
  post: IPost | undefined;

  form: FormGroup;

  help?: boolean;

  comments: IComment[] = [];

  get getEmail(): string {
    return this.userService.user?.email || '';
  }

  get fullName(): string {
    return this.userService.user?.fullName || '';
  }

  get getUserId(): string {
    return this.userService.user?._id || '';
  }


  get credit(): boolean {
    return this.fullName == this.post?.creatorName;
  }

  get leketa(): boolean {
    for (const like of this.post!.groupMembers) {
      if (this.getUserId == like._id) {
        return true;
      }
    }
    return false;
  }

  constructor(
    private contentService: ContentService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.fetchPost();
    this.getComments();
    this.form = fb.group({
      description: ['', Validators.required],
    });
  }

  fetchPost(): void {
    this.post = undefined;
    const id = this.activatedRoute.snapshot.params['postId'];
    // console.log(this.activatedRoute.snapshot.params) !BETON!;
    this.contentService.loadPost(id).subscribe((post) => (this.post = post));
  }

  likePost(postId: string, email: string): void {
    const data = {
      postId,
      email,
    };

    this.contentService.likePost(data).subscribe({
      next: () => {
        this.fetchPost();
        this.router.navigate(['/posts', data.postId]);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  unlikePost(postId: string, email: string): void {
    const data = {
      postId,
      email,
    };

    this.contentService.unlikePost(data).subscribe({
      next: () => {
        this.fetchPost();
        this.router.navigate(['/posts', data.postId]);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onDeletePost(id: string): void {
    const data = {
      id: id,
    };
    // console.log(id);
    if (!confirm('Are you sure you want to delete this!')) {
      return;
    }
    this.contentService.deletePost(data).subscribe({
      next: () => {
        this.router.navigate(['/posts']);
      },
      error: (err) => {
        console.log(err);
      },
    });
    // this.router.navigate(['/posts']);
  }

  getComments(): void {
    // this.post = undefined;
    const id = this.activatedRoute.snapshot.params['postId'];
    // console.log(this.activatedRoute.snapshot.params) !BETON!;
    const data = {
      neshto: id,
    };

    this.contentService
      .getComments(data)
      .subscribe((comments) => (this.comments = comments));

    this.contentService.getComments(data).subscribe({
      next: () => {
        this.fetchPost();
        // this.author;
        this.router.navigate(['/posts', data.neshto]);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addComment(): void {
    if (this.form.invalid) {
      return;
    }

    const data = {
      description: this.form.value.description,
      author: this.userService.user?.fullName,
      jimHelper: this.userService.user?._id,
      post: this.post?._id,
    };

    this.form.reset();

    this.contentService.addComment(data).subscribe({
      next: () => {
        // this.fetchPost();
        this.getComments();
        this.router.navigate(['/posts', data.post]);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onDeleteComment(id: string, postId: string): void {
    const data = {
      commentId: id,
    };
    // console.log(id);
    if (!confirm('Are you sure you want to delete this!')) {
      return;
    }
    this.contentService.deleteComment(data).subscribe({
      next: () => {
        this.getComments();
        this.router.navigate(['/posts', postId]);
      },
      error: (err) => {
        console.log(err);
      },
    });
    // this.router.navigate(['/posts']);
  }
}
