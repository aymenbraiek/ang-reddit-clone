import { SignupComponent } from './components/auth/signup/signup.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/auth/login/login.component";
import {HomeComponent} from "./components/home/home.component";
import { CreatePostComponent } from './components/posts/create-post/create-post.component';
import { CreateSubredditComponent } from './subreddits/create-subreddit/create-subreddit.component';
import { ListSubredditsComponent } from './subreddits/list-subreddits/list-subreddits.component';
import { ViewPostComponent } from './components/posts/view-post/view-post.component';
import { UserProfileComponent } from './components/auth/user-profile/user-profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'view-post/:id', component: ViewPostComponent },
  { path: 'sign-up', component: SignupComponent },
  { path: 'user-profile/:name', component: UserProfileComponent },
  { path: 'login', component: LoginComponent },
  {path: 'create-post', component: CreatePostComponent },
  { path: 'create-subreddit', component: CreateSubredditComponent},
  {path:'list-subreddits',component:ListSubredditsComponent},
 // {path:'subreddits',component:}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
