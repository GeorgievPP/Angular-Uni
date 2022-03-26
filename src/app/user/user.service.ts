import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../shared/interfaces';

const apiUrl = environment.apiUrl;

@Injectable()
export class UserService {
  user: IUser | null | undefined = undefined;

  get isLogged(): boolean {
    return !!this.user;
  }

  constructor(private http: HttpClient) {}

  login(data: { email: string; password: string }) {
    return this.http
      .post<IUser>(`${apiUrl}/v1/auth/login`, data, { withCredentials: true })
      .pipe(tap((user) => (this.user = user)));
  }

  register(data: { fullName: string; email: string; password: string }) {
    return this.http
      .post<IUser>(`${apiUrl}/v1/auth/register`, data, {
        withCredentials: true,
      })
      .pipe(tap((user) => (this.user = user)));
  }

  getProfileInfo(user_Id: string) {
    return this.http
      .post<IUser>(`${apiUrl}/v1/auth/profile`, user_Id, { withCredentials: true })
      .pipe(tap((user) => (this.user = user)));
  }

  logout() {
    return this.http.post<IUser>(`${apiUrl}/v1/auth/logout`, {}, { withCredentials: true }).pipe(
      tap(() => this.user = null)
    );
  }
}
