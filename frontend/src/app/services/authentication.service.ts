import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string){
    console.log('%cMyProject%cline:12%cemail', 'color:#fff;background:#ee6f57;padding:3px;border-radius:2px', 'color:#fff;background:#1f3c88;padding:3px;border-radius:2px', 'color:#fff;background:rgb(251, 178, 23);padding:3px;border-radius:2px', email)

    return this.http.post<any>('/users/login', { email: email, password: password}).pipe(
      map((token) => {
        console.log(token);
        localStorage.setItem('blog-token', token.access_token);
        return token;
      })
    )
  }
}
