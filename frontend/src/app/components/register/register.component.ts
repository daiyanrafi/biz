import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: any;

  // registerForm: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
 
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['null', [Validators.required]],
      username: ['null', [Validators.required]],
      email: ['null', [Validators.required, Validators.email]],
      password: ['null', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['null', [Validators.required]],
    },{
      // validators: CustomValidators.passwordMatches
    })
  }

  onSubmit(){
    if(this.registerForm.invalid){
      return;
    }
    console.log(this.registerForm.value);
    this.authService.register(this.registerForm.value).pipe(
      map(user => this.router.navigate(['login']))
    ).subscribe();
  }

}

