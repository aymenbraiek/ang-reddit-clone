import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginRequestPayload} from "./login-request.payload";
import {AuthService} from "../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {throwError} from "rxjs";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm?: FormGroup;
  loginRequestPayload?: LoginRequestPayload;
  registerSuccessMessage: string | null=null;
  isError?: boolean;
  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute,
              private router: Router, private authService : AuthService,private toastr: ToastrService) {
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
    this.activatedRoute.queryParams
      .subscribe(params => {
        if (params.registered !== undefined && params.registered === 'true') {
          this.toastr.success('Signup Successful');
          this.registerSuccessMessage = 'Please Check your inbox for activation email '
            + 'activate your account before you Login!';
        }
      });

  }

  login() {
    this.loginRequestPayload?.username == this.loginForm?.get('username')?.value;
    this.loginRequestPayload?.password == this.loginForm?.get('password')?.value;



    this.authService.login(this.loginForm?.value).subscribe(data => {
      this.isError = false;
      this.router.navigateByUrl('');
      this.toastr.success('Login Successful');
    }, error => {
      this.isError = true;
      throwError(error);
    });
    }

  }

