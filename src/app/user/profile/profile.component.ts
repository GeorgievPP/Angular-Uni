import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
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
  get GetOtherProjects(): string[] {
    return this.userService.user?.otherProjects || [];
  }


  constructor(private userService: UserService) { }


}
