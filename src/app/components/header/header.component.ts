import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { CommentPayload } from 'src/app/comment/comment.payload';
import { PostModel } from 'src/app/shared/post-model';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
@Input() post?:PostModel
  isLoggedIn?: boolean;
  username?: string;
  faUser = faUser;
  
  constructor(private router:Router,private authService:AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUserName();
  }

  goToUserProfile()
  {
    this.router.navigateByUrl('/user-profile/' + this.username);
  }

  logout()
  {
    
  }


}
