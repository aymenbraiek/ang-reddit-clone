import { Component, OnInit } from '@angular/core';
import { SubredditModel } from 'src/app/subreddits/model/subreddit-response';
import { SubredditService } from 'src/app/subreddits/services/subreddit.service';

@Component({
  selector: 'app-subreddit-side-bar',
  templateUrl: './subreddit-side-bar.component.html',
  styleUrls: ['./subreddit-side-bar.component.css']
})
export class SubredditSideBarComponent implements OnInit {
  subreddits: Array<SubredditModel> = [];
  displayViewAll?: boolean;
  constructor(private subredditService:SubredditService) {
    this.subredditService.getAllSubreddits().subscribe(data=>{
      if (data.length > 3) {
        //juste show 3 element only
        this.subreddits = data.splice(0, 3);
        this.displayViewAll = true;
      } else {
        this.subreddits = data;
      }
    })
   }

  ngOnInit(): void {
 
  }

}
