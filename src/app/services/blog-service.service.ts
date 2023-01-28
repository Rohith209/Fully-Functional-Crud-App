import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BlogServiceService {
  private url = 'http://localhost:3000/posts';
  constructor(private http: HttpClient) {}
  getAllPosts() {
    return this.http.get(this.url);
  }

  deleteAPost(id) {
    return this.http.delete(this.url + '/' + id);
  }

  PosttoDB(postDetails) {
    return this.http.post(this.url, postDetails);
  }

  editPost(post, id) {
    return this.http.patch(this.url + '/' + id, post);
  }
}
