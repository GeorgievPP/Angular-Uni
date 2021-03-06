import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post/post.component';
import { NewPostComponent } from './new-post/new-post.component';
import { OnePostComponent } from './one-post/one-post.component';
import { PostRoutingModule } from './post-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditPostComponent } from './edit-post/edit-post.component';
import { ProfilePostsComponent } from './profile-posts/profile-posts.component';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    PostComponent,
    NewPostComponent,
    OnePostComponent,
    EditPostComponent,
    ProfilePostsComponent,
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class PostModule { }
