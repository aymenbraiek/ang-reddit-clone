import { environment } from './../../environments/environment.prod';
import { SignupRequestPayload } from './../components/auth/signup/signup-request-payload';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  singup(signupRequestPayload: SignupRequestPayload): Observable<any> {
    // { responseType: 'text' } car la methode de backend return responseentity
    return this.http.post('http://localhost:8080/api/auth/signup', signupRequestPayload, { responseType: 'text' });
    }}
