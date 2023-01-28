import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { NewPostsModal } from './NewPostsModal.model';
import { Post } from './post';
import { BlogServiceService } from './services/blog-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public formGroupValues = [];
  fetchPosts: any;
  constructor(
    private httpService: BlogServiceService,
    private formBuilder: FormBuilder,
    private NewPosts: NewPostsModal
  ) {}

  formValues!: FormGroup;
  PostsModalObj: NewPostsModal = new NewPostsModal();
  ngOnInit() {
    this.formValues = this.formBuilder.group({
      postTitle: [''],
      postBody: [''],
      postAuthor: [''],
      postReactions: [''],
      postTags: [''],
    });
  }
  AddNewPost() {
    this.PostsModalObj.postTitle = this.formValues.value.postTitle;
    this.PostsModalObj.postAuthor = this.formValues.value.postAuthor;
    this.PostsModalObj.postBody = this.formValues.value.postBody;
    this.PostsModalObj.postReactions = this.formValues.value.postReactions;
    this.PostsModalObj.postTags = this.formValues.value.postTags;
    this.httpService.PosttoDB(this.PostsModalObj).subscribe((data) => {
      alert('Data Posted Successfully');
      this.formValues.reset();
      let CloseModalBtn = document.getElementById('closeDataModal');
      CloseModalBtn.click();
      window.location.reload();
    });
  }
}
