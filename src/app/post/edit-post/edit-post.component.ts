import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ContentService } from 'src/app/content.service';
import { IPost } from 'src/app/shared/interfaces';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
})
export class EditPostComponent {
  post: IPost | undefined;

  // constructor(private contentService: ContentService, private activatedRoute: ActivatedRoute) {
  //   this.fetchPost();
  // }

  killSubscription = new Subject();
  proba!: string | Object;

  get fullName(): string {
    return this.userService.user?.fullName || '';
  }
  get getId(): string {
    return this.userService.user?._id || 'nema';
  }

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private contentService: ContentService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.fetchPost();

    this.form = fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      description: ['', [Validators.required, Validators.minLength(4)]],
      imageUrl: ['', [Validators.required]],
    });
  }

  editPost(): void {
    if (this.form.invalid) {
      return;
    }
    // const { name, description, imageUrl, author } = form.value;
    // console.log(this.activatedRoute.snapshot.params)
    this.proba = this.getId;
    console.log(this.proba);

    const data = {
      name: this.form.value.name,
      description: this.form.value.description,
      imageUrl: this.form.value.imageUrl,
      user_id: this.proba,
      projectId: this.post?._id,
      public: true,
    };
    this.contentService.editPost(data).subscribe({
      next: () => {
        this.router.navigate(['/posts', this.post?._id]);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  fetchPost(): void {
    this.post = undefined;
    const id = this.activatedRoute.snapshot.params['postId'];
    // console.log(this.activatedRoute.snapshot.params) !BETON!;
    this.contentService.loadPost(id).subscribe((post) => (this.post = post));
  }

  goBack(): void {
    this.router.navigate(['/posts', this.post?._id]);
  }

  ngOnDestroy(): void {
    this.killSubscription.next(undefined);
    this.killSubscription.complete();
  }
}
