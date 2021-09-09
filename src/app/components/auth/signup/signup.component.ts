import { AuthService } from './../../../services/auth.service';
import { SignupRequestPayload } from './signup-request-payload';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  //on a utiliser reactive form
  signupForm?: FormGroup;
  // j ai creer un interface module qui contient les fields de notre classe sign-up
  signupRequestPayload?: SignupRequestPayload;


  constructor(private fb: FormBuilder, private router: Router,private authService:AuthService) {
    //initialiser signupRequestPayload
    this.signupRequestPayload = {
      username: '',
      email: '',
      password: ''
    };


  }

  ngOnInit(): void {
    //utliser FormBuilder +validators
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  //Buton sign-up effecter le valeur de la form pour notre module
  signup() {
    this.signupRequestPayload?.email == this.signupForm?.get('email')?.value;
    this.signupRequestPayload?.username == this.signupForm?.get('username')?.value;
    this.signupRequestPayload?.password == this.signupForm?.get('password')?.value;

    this.authService.singup(this.signupForm?.value)
    .subscribe(data=>{
      console.log(data);
    })



  }

}
