import { BlogPost, Comment } from '../../app/models/blog-post.model';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UserType } from '../shared/chat/user-types';
export interface Blog{
    blogId : string;
    username : string;
    content : string;
    role : 'Tourist';
    createdAt : string;
    photo_path : string[];
  }
export interface Review{
  username: string;
  role : 'Tourist';
  createdAt : string;
  comment : string
}

@Component({
  selector: 'app-blog-for-you',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    FontAwesomeModule,
    DatePipe,
  ],
  templateUrl: './blog-for-you.component.html',
  styleUrls: ['./blog-for-you.component.css'],
})
export class BlogForYouComponent {
  @ViewChild('idDocumentInput') idDocumentInput!: ElementRef;
  
constructor(private http: HttpClient,private authService:AuthService,private sanitizer: DomSanitizer
){}


private myblogs : Blog[] =[]
posts: BlogPost[]=[]
private baseUrl = 'http://localhost:8080/auth/blog';
 ngOnInit(){

  this.http.get<Blog[]>(`${this.baseUrl}/getBlogs/`).subscribe({
    next: (data) =>{ this.myblogs=data;
        console.log(data)
        this.myblogs.forEach(b => {
        const imgs :SafeResourceUrl [] =[];
        b.photo_path.forEach(p => {imgs.push(this.getUrl(p))})
        let reviews : Review[] = [];
        const comts : Comment[] = [];
        this.http.get<Review[]>(`http://localhost:8080/auth/blogReview/getReviews/${b.blogId}`).subscribe({
          next : (blog_reviews) =>{
            reviews=blog_reviews;
            let index=0;
            reviews.forEach(r => {
              const comment : Comment={
                id: index.toString(),
                userId: r.username,
                userName: r.username,
                userAvatar:'https://i.pravatar.cc/150?img=11' ,
                content: r.comment,
                date: new Date(r.createdAt),
              }
              comts.push(comment);
            })
          },
    
          error: (err) => console.error('Failed to load chats', err)
        });
        const blog : BlogPost={
          id : b.blogId,
          userId : b.username,
          userName : b.username,
          userAvatar : 'https://i.pravatar.cc/150?img=11',
          userRating: 4.0,
          date: new Date(b.createdAt),
          content : b.content,
          images :imgs,
          likes: 15,
          isLiked: false,
          location: 'Swiss Alps, Switzerland',
          comments:comts,
    }
    this.posts.push(blog);
       
});
    },
    
    error: (err) => console.error('Failed to load chats', err)
  });

  

 }
  getUrl(path: string): SafeResourceUrl {
    
    const generatedUrl =
      'http://localhost:8080/auth/files/Blogs/' +
      path.substring(
        path.lastIndexOf('\\') + 1
      );
    const imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      generatedUrl
    );
    return imageUrl;
  }

  toggleLike(post: BlogPost): void {
    post.isLiked = !post.isLiked;
    post.likes += post.isLiked ? 1 : -1;
  }

  addComment(post: BlogPost, commentContent: string): void {
    if (!commentContent.trim()) return;

    const newComment: Comment = {
      id: `c${post.comments.length + 1}`,
      userId: 'currentUser',
      userName: 'You',
      userAvatar: 'https://i.pravatar.cc/150?img=11',
      content: commentContent,
      date: new Date(),
    };

    post.comments.unshift(newComment);
    const review ={
        blogId :post.id,
        username: this.authService.getUsername(),
        role : 'Tourist',
        comment : commentContent,
    }
    this.http.post<any>(`http://localhost:8080/auth/blogReview/addReview/`,review, {

}).subscribe({
  next: (response: any) => {
    console.log('Success:', response);
    
  },
  error: (error: any) => {
    console.error('Error:', error);
  }
});
  }
  // Add these new methods to your component class
  showShareSuccess: boolean = false;
  showReportModal: boolean = false;
  currentReportPost: BlogPost | null = null;
  reportReason: string = '';

  copyPostLink(post: BlogPost) {
    const postUrl = `${window.location.origin}/blog/post/${post.id}`;
    navigator.clipboard.writeText(postUrl).then(() => {
      this.showShareSuccess = true;
      setTimeout(() => (this.showShareSuccess = false), 3000);
    });
  }

  openReportModal(post: BlogPost) {
    this.currentReportPost = post;
    this.showReportModal = true;
  }

  submitReport() {
    if (this.reportReason.trim() && this.currentReportPost) {
      // In a real app, you would send this to your backend
          
          const report ={
          reporting_user_username : this.authService.getUsername(),
          reported_user_username : this.currentReportPost.userName,
          comment : this.reportReason.trim(),
          reporting_user_type : this.authService.getUserType() === UserType.GUIDE,
          reported_user_type : 0,
          blogId : this.currentReportPost.id,
    }
    this.http.post<any>(`http://localhost:8080/auth/admin/addReport/`,report, {

}).subscribe({
  next: (response: any) => {
    console.log('Success:', response);
    
  },
  error: (error: any) => {
    console.error('Error:', error);
  }
});
      console.log(
        `Reported post ${this.currentReportPost.id}: ${this.reportReason}`
      );
      this.showReportModal = false;
      this.reportReason = '';
      this.currentReportPost = null;
      // Show success message
      alert('Thank you for your report. We will review this post.');
    }

  }
}
