import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthActivate } from '../core/guards/auth.activates';
import { EditPostComponent } from './edit-post/edit-post.component';
import { NewPostComponent } from './new-post/new-post.component';
import { OnePostComponent } from './one-post/one-post.component';
import { PostComponent } from './post/post.component';

const routes: Routes = [
  {
    path: 'posts',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: PostComponent,
      },
      {
        path: ':postId',
        children:[
          {
            path: '',
            pathMatch: 'full',
            component: OnePostComponent,
          },
          {
            path: 'edit',
            component: EditPostComponent,
          }
        ]
      },
    ],
  },
  {
    path: 'add-post',
    component: NewPostComponent,
    canActivate: [AuthActivate],
    data: {
      authenticationRequired: true,
      authenticationFailureRedirectUrl: '/login',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostRoutingModule {}
