import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  loginForm: any;

  // loginForm: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
  ) { }
  
  ngOnInit(): void {
      this.loginForm = new FormGroup({
        email: new FormControl(null, [
          Validators.required,
          Validators.email,
          Validators.minLength(5),
        ]),
        password: new FormControl(null, [
          Validators.required,
          Validators.minLength(5),
        ])
      });
  }
//button for it
  onSubmit(){
    if(this.loginForm.invalid){
      return;
    }
    this.authService.login(this.loginForm.value).pipe(
      map(token => this.router.navigate(['admin']))
    ).subscribe();
  }

}













// export class LoginComponent implements OnInit {
//   constructor(private authService: AuthenticationService) {}
//   ngOnInit(): void {

//   }
//   login(){
//     this.authService.login('rafi@gmail.com', 'abc123').subscribe(data => console.log("success"));
//   }
// }

