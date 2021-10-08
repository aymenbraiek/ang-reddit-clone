import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentPayload } from 'src/app/comment/comment.payload';
import { CommentService } from 'src/app/comment/comment.service';
import { PostModel } from 'src/app/shared/post-model';
import { PostService } from 'src/app/shared/post.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
posts?:PostModel[];
name?:any;
comments?:CommentPayload[];
postLength?:number;
commentLength?:number;

  constructor(private activatedRoute:ActivatedRoute,private  postService:PostService ,private commentService:CommentService) { 
    this.name = this.activatedRoute.snapshot.params.name;
  }

  ngOnInit(): void {
    this.postService.getAllPostsByUser(this.name).subscribe(data => {
      this.posts = data;

      console.log('data post by user',this.posts)
      this.postLength = data.length;
    });

    this.commentService.getAllCommentsByUser(this.name).subscribe(data => {
      this.comments = data;
      this.commentLength = data.length;

      console.log('comment by user', this.comments)
      console.log('commentLength',this.commentLength)
    });
  }

 

}
