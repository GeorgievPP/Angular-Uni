import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ContentService } from 'src/app/content.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnDestroy{

  killSubscription = new Subject();
  proba!: string | Object;
  pub!: boolean;

  get fullName(): string {
    return this.userService.user?.fullName || '';
  }
  get getId(): string {
    return this.userService.user?._id || 'nema';
  }

  form: FormGroup;

  constructor(private fb: FormBuilder,
    private contentService: ContentService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
      this.form = fb.group({
        name: ['', [Validators.required, Validators.minLength(4)]],
        description: ['', [Validators.required, Validators.minLength(4)]],
        imageUrl: ['', [Validators.required]],
        public: ['']
      })
     }


  createPost(): void {
    if (this.form.invalid) {
      return;
    }
    // const { name, description, imageUrl, author } = form.value;
    // console.log(this.activatedRoute.snapshot.params)
    this.proba = this.getId;
    console.log(this.proba);

    this.pub = this.form.value.public ? true : false;

    const data = {
      name: this.form.value.name,
      description: this.form.value.description,
      imageUrl: this.form.value.imageUrl,
      public: this.pub,
      user_id: this.proba,
      creatorName: this.fullName,
    }
    this.contentService.savePost(data).subscribe({
      next: () => {
        this.router.navigate(['/posts']);
      },
      error: (err) => {
        console.log(err);
      }
    })

  }


  ngOnDestroy(): void {
    this.killSubscription.next(undefined);
    this.killSubscription.complete();
  }
}
