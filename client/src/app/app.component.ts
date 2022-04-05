import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContentService } from './content.service';
import { IPost } from './shared/interfaces/post';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  posts: IPost[] | undefined;

  get isAuthenticating(): boolean {
    return this.userService.user === undefined;
  }

  constructor(private userService: UserService, private router: Router) {
    // console.log(userService)
    // this.userService.getUserInfo().subscribe({
    //   error: (error) => {
    //     this.userService.user = null;

    //     throw error;

    //   }
    // })
    // console.log(this.userService)
  }

  ngOnInit(): void {
    console.log(this.userService)
    this.userService.getUserInfo().subscribe({
      error: (error) => {
        this.userService.user = null;
        this.router.navigate(['/home'])
        // throw error;

      }
    })
    console.log(this.userService)
  }



}
