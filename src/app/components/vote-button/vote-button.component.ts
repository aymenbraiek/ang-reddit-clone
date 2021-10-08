import { Component, Input, OnInit } from '@angular/core';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { PostModel } from 'src/app/shared/post-model';
import { PostService } from 'src/app/shared/post.service';
import { AuthService } from '../auth/services/auth.service';
import { VotePayload } from './vote-payload';
import { VoteType } from './vote-type';
import { VoteService } from './vote.service';


@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.css']
})
export class VoteButtonComponent implements OnInit {
  @Input() post?: any;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  upvoteColo?: string;
  downvoteColor?: string;
  votePayload?:any;
  constructor(private voteService: VoteService,
    private authService: AuthService,
    private postService: PostService, private toastr: ToastrService) { 

      this.votePayload = {
        voteType: undefined,
        postId: undefined
      }
    }

  ngOnInit(): void {
  }
  upvotePost(){
    this.votePayload.voteType = VoteType.UPVOTE;
    console.log('this.votePayload.voteType',this.votePayload.voteType)
    this.vote();
  }
  downvotePost(){ this.votePayload.voteType = VoteType.DOWNVOTE;
    console.log('this.votePayload.voteType',this.votePayload.voteType)
    this.vote();}
  private vote() {
    this.votePayload.postId = this.post.postId;
    console.log('this.votePayload.postId',this.votePayload.postId)
    this.voteService.vote(this.votePayload).subscribe(() => {
      this.updateVoteDetails();
    }, error => {
      this.toastr.error(error.error.message);
      throwError(error);
    });
  }
  private updateVoteDetails() {
    this.postService.getPost(this.post.postId).subscribe(post => {
      this.post = post;
    });
  }
}
