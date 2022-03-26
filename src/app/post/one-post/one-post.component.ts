import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentService } from 'src/app/content.service';
import { IPost } from 'src/app/shared/interfaces';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-one-post',
  templateUrl: './one-post.component.html',
  styleUrls: ['./one-post.component.scss'],
})
export class OnePostComponent {
  post: IPost | undefined;

  form: FormGroup;

  get getEmail(): string {
    return this.userService.user?.email || '';
  }

  get getComments(): boolean {
    return this.post!.comment.length > 0
  }

  constructor(
    private contentService: ContentService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.fetchPost();
    this.form = fb.group({
      comment: ['', Validators.required]
    })
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

  addComment(): void {
    if (this.form.invalid) {
      return;
    }

    const data = {
      comment: this.form.value.comment,
      postId: this.post?._id
    }

    this.contentService.addComment(data).subscribe({
      next: () => {
        this.fetchPost();
        this.router.navigate(['/posts', data.postId]);
      },
      error: (err) => {
        console.log(err);
      },

    })
  }
}
