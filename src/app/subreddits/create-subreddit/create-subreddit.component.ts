import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { SubredditModel } from 'src/app/subreddits/model/subreddit-response';
import { SubredditService } from 'src/app/subreddits/services/subreddit.service';

@Component({
  selector: 'app-create-subreddit',
  templateUrl: './create-subreddit.component.html',
  styleUrls: ['./create-subreddit.component.css']
})
export class CreateSubredditComponent implements OnInit {
  createSubredditForm?: FormGroup;
  subredditModel?: SubredditModel;
  //title = new FormControl('');
  //description = new FormControl('');
  constructor( private toastr: ToastrService, private fb: FormBuilder,private router: Router, private subredditService: SubredditService) {
    this.subredditModel = {
      name: '',
      description: ''
    }
   }

  ngOnInit(): void {
    this.createSubredditForm =  this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });

    
   
  }

  createSubreddit() {
    this.subredditModel?.name == this.createSubredditForm?.get('name')?.value;

    
    this.subredditModel?.description == this.createSubredditForm?.get('description')?.value;

    console.log('data',this.createSubredditForm?.value)
    this.subredditService.createSubreddit(this.createSubredditForm?.value).subscribe(data => {
      //this.toastr.success('Succeful create sub')
      this.router.navigateByUrl('/list-subreddits');
    }, error => {
      throwError(error);
    })
  }

  discard(){
    this.router.navigateByUrl('/');
  }

}
