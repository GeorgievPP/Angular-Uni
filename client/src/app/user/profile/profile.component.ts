import { Component, OnInit } from '@angular/core';
import { IPost } from 'src/app/shared/interfaces';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  get fullName(): string {
    return this.userService.user?.fullName || '';
  }
  get getId(): string {
    return this.userService.user?._id || 'nema';
  }

  get getEmail(): string {
    return this.userService.user?.email || '';
  }

  get GetOwnProjects(): string[] {
    return this.userService.user?.ownProjects || [];
  }
  get getLikedPosts(): IPost[] {
    return this.userService.user?.otherProjects || [];
  }

  constructor(private userService: UserService) {
    this.fetchUser();
    //   this.GetOtherProjects.forEach((element) => {
    //     if(element._id){
    //       console.log(element._id); // 100, 200, 300
    //     } else {
    //       console.log(element)
    //     }
    //     // console.log(index); // 0, 1, 2
    //     // console.log(array); // same myArray object 3 times
    // });
    // this.fetchOtherPost();
  }

  fetchUser(): void {
    const data = {
      userId: this.getId,
    };
    this.userService
      .getProfileInfo(data)
      .subscribe((user) => (this.userService.user = user));
  }

  fetchOtherPost(): void {
    this.getLikedPosts.forEach((element) => {
      if (element._id) {
        console.log(element._id); // 100, 200, 300
      } else {
        console.log(element);
      }
      // console.log(index); // 0, 1, 2
      // console.log(array); // same myArray object 3 times
    });
  }
}
