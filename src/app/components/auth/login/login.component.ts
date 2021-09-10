import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginRequestPayload} from "./login-request.payload";
import {AuthService} from "../../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm?: FormGroup;
  loginRequestPayload?: LoginRequestPayload;
  registerSuccessMessage?: string;
  isError?: boolean;
  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute,
              private router: Router, private authService : AuthService) {
    this.loginRequestPayload = {
      username: '',
      password: ''
    };
  }

  ngOnInit(): void {
    //utliser FormBuilder +validators
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

  }

  login() {
    this.loginRequestPayload?.username == this.loginForm?.get('username')?.value;
    this.loginRequestPayload?.password == this.loginForm?.get('password')?.value;



      this.authService.login(this.loginForm?.value).subscribe(data => {
        console.log('Login successful');
        console.log((data));


      });
    }

  }

