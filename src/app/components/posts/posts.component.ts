import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EditPostsModal } from 'src/app/EditPostsModal.model';
import { BlogServiceService } from 'src/app/services/blog-service.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  li: any;
  posts = [];
  editFormValues!: FormGroup;
  editFormValuesObj: EditPostsModal = new EditPostsModal();

  constructor(
    private serviceurl: BlogServiceService,
    private EditPosts: EditPostsModal,
    private formsBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.fetchPosts();

    this.editFormValues = this.formsBuilder.group({
      postTitle: [''],
      postBody: [''],
      postAuthor: [''],
      postReactions: [''],
      postTags: [''],
    });
  }

  fetchPosts() {
    this.serviceurl.getAllPosts().subscribe((data) => {
      this.li = data;
      this.posts = this.li;
      console.log(this.posts);
    });
  }
  editpostData(post) {
    this.editFormValuesObj.postId = post.id;
    this.editFormValues.controls['postTitle'].setValue(post.postTitle);
    this.editFormValues.controls['postAuthor'].setValue(post.postAuthor);
    this.editFormValues.controls['postBody'].setValue(post.postBody);
    this.editFormValues.controls['postTags'].setValue(post.postTags);
    this.editFormValues.controls['postReactions'].setValue(post.postReactions);
  }

  updateEditPostData() {
    this.editFormValuesObj.postTitle = this.editFormValues.value.postTitle;
    this.editFormValuesObj.postAuthor = this.editFormValues.value.postAuthor;
    this.editFormValuesObj.postBody = this.editFormValues.value.postBody;
    this.editFormValuesObj.postReactions =
      this.editFormValues.value.postReactions;
    this.editFormValuesObj.postTags = this.editFormValues.value.postTags;

    this.serviceurl
      .editPost(this.editFormValuesObj, this.editFormValuesObj.postId)
      .subscribe((data) => {
        alert('Data Updated Successfully');
        this.editFormValues.reset();
        let CloseModalBtn1 = document.getElementById('EditModalCancel');
        CloseModalBtn1.click();
        this.fetchPosts();
      });
  }

  deletePost(id) {
    if (window.confirm('Are you sure you want to delete the Post' + id + '?')) {
      this.serviceurl.deleteAPost(id).subscribe((data) => {
        this.fetchPosts();
      });
    }
  }
}
