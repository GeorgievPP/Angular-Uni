import { Component } from '@angular/core';
import { ContentService } from './content.service';
import { IPost } from './shared/interfaces/post';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  posts: IPost[] | undefined;

  get isAuthenticating(): boolean {
    return this.userService.user === undefined;
  }

  constructor(private userService: UserService) {
    // this.userService.getProfileInfo(this.userService.user?._id!).subscribe({
    //   error: (error) => {
    //     this.userService.user = null;
    //     throw error;

    //   }
    // })
    // console.log(this.userService.user)
  }



}
