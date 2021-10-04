import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { PostModel } from 'src/app/shared/post-model';

@Component({
  selector: 'app-post-title',
  templateUrl: './post-title.component.html',
  styleUrls: ['./post-title.component.css']
})
export class PostTitleComponent implements OnInit {
  @Input() data?: Array<PostModel>;
  faComments = faComments;
  id?:number;
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  goToPost(id: number): void {
  //  this.router.navigateByUrl('/view-post/' + id);
  }
}