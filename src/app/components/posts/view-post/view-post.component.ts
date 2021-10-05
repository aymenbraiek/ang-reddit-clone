import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { CommentPayload } from 'src/app/comment/comment.payload';
import { CommentService } from 'src/app/comment/comment.service';
import { PostModel } from 'src/app/shared/post-model';
import { PostService } from 'src/app/shared/post.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {
post?:PostModel;
postId: number;
commentForm?:FormGroup;
comments?:CommentPayload[];
commentPayload?:any;
  constructor(private commentService:CommentService,private fb:FormBuilder,private postService: PostService,private activatedRoute:ActivatedRoute) { 
    this.postId =+this.activatedRoute.snapshot.params.id;

    this.commentForm=this.fb.group({
      text:['', Validators.required]
    });
    this.commentPayload={
      text:'',
      postId:this.postId,
    }

  }

  ngOnInit(): void {
   
    this.getPostById();
    this.getCommentsForPost();
    
   
  }

  private getPostById() {
    this.postService.getPost(this.postId!).subscribe(data=>{
      this.post=data;
      console.log('post',this.post)
    },
    error=>{
      throwError(error)
     })
  }
  postComment(){
    console.log('22222',this.commentForm?.get('text')?.value)
    //this.commentPayload.text == this.commentForm.get('text')?.value;
    this.commentPayload.text=this.commentForm?.get('text')?.value;
    console.log('33333', this.commentPayload)
    this.commentService.createComments(this.commentPayload).subscribe(data => {
      this.commentForm?.get('text')?.setValue('');
      this.getCommentsForPost();
    }, error => {
      throwError(error);
    })
  }
  getCommentsForPost() {
    console.log('postId',this.postId)
    this.commentService.getAllCommentsForPost(this.postId).subscribe(data => {
      this.comments = data;
      console.log('comments',this.comments)
    }, error => {
      throwError(error);
    });
    
  }
  
}
