import { SignupRequestPayload } from './../components/auth/signup/signup-request-payload';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {LoginRequestPayload} from "../components/auth/login/login-request.payload";
import {LocalStorageService} from "ngx-webstorage";
import {LoginResponsePayload} from "../components/auth/login/login-response.payload";
import {map} from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,private localStorage:LocalStorageService) { }

  singup(signupRequestPayload: SignupRequestPayload): Observable<any> {
    // { responseType: 'text' } car la methode de backend return responseentity
    return this.http.post('http://localhost:8080/api/auth/signup', signupRequestPayload, { responseType: 'text' });
    }
    //Inside the login method, we are making a POST call to our Login REST API, and we will receive the LoginResponse object as the response.
  // We can map our response using the map method of rxjs, and we are storing the authToken, username, refreshToken and expirationTime inside the LocalStorage.
  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.http.post<LoginResponsePayload>('http://localhost:8080/api/auth/login', loginRequestPayload)
      .pipe(map(data => {
        this.localStorage.store('authenticationToken', data.authenticationToken);
        this.localStorage.store('username', data.username);
        this.localStorage.store('refreshToken', data.refreshToken);
        this.localStorage.store('expiresAt', data.expiresAt);
        return true;
      }));
  }
}
