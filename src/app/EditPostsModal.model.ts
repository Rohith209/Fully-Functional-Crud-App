import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EditPostsModal {
  postTitle: String = '';
  postAuthor: String = '';
  postBody: String = '';
  postReactions: String = '';
  postTags: String = '';
  postId: Number;
}
