import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


export interface LoginForm {
  email: string;
  password: string;
};

export interface User{
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  passwordConfirm?: string;
  role?: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(loginForm: LoginForm){
     // console.log('%cMyProject%cline:12%cemail', 'color:#fff;background:#ee6f57;padding:3px;border-radius:2px', 'color:#fff;background:#1f3c88;padding:3px;border-radius:2px', 'color:#fff;background:rgb(251, 178, 23);padding:3px;border-radius:2px', email)

    return this.http.post<any>('api/users/login', { email: loginForm.email, password: loginForm.password}).pipe(
      map((token) => {
        console.log('token');
        localStorage.setItem('blog-token', token.access_token);
        return token;
      })
    )
  } 

  register(user: any){
    return this.http.post<any>('/api/users', user).pipe(
      map(user => user)
    )
  }
}
