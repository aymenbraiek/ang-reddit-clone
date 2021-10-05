import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { PostService } from 'src/app/shared/post.service';
import { SubredditModel } from 'src/app/subreddits/model/subreddit-response';
import { SubredditService } from 'src/app/subreddits/services/subreddit.service';
import { CreatePostPayload } from './create-post.payload';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  //form
  createPostForm?:FormGroup;
  //Model 
  postPayload?: any;
  //array of Subreddit
  subreddits$:Array<SubredditModel>=[]
  
  constructor(private subredditService:SubredditService,private fb:FormBuilder,private postService:PostService,private router:Router) {
    this.postPayload={
      postName:'',
      subredditName:'',
      url:'',
      description:''
    }
   }
  
  ngOnInit(): void {
    
    this.createPostForm=this.fb.group({

      postName: ['', Validators.required],
      subredditName: ['', Validators.required],
      url: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.subredditService.getAllSubreddits().subscribe(data => {
      this.subreddits$ = data;
    }, error => {
      throwError(error);
    })
  }
  discardPost(){
    this.router.navigateByUrl('/')
  }

  createPost(){
    this.postPayload.postName =this.createPostForm?.get('postName')?.value;
    this.postPayload.subredditName = this.createPostForm?.get('subredditName')?.value;
    this.postPayload.url = this.createPostForm?.get('url')?.value;
    this.postPayload.description= this.createPostForm?.get('description')?.value;
console.log('data',this.createPostForm?.value)



this.postService.createPost(this.postPayload).subscribe(data=>{
 this.router.navigateByUrl('/')
},error=>{
  throwError(error);
}
)
  }
}
