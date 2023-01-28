import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NewPostsModal {
  postTitle: String = '';
  postAuthor: String = '';
  postBody: String = '';
  postReactions: String = '';
  postTags: String = '';
}
