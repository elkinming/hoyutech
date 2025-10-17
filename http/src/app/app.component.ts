import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PostServiceService } from './services/post-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'http';

  constructor(
    private postService: PostServiceService
  ){}

  getMockData(){
    this.postService.getUsers().subscribe({
      next: (data) => {
        console.log(data);
      },
    });
  }

  testPostMethod(){
    this.postService.createPost('test_title', 'Test_Body').subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
