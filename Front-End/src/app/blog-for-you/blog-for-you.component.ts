import { BlogPost, Comment } from '../../app/models/blog-post.model';
import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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
  posts: BlogPost[] = [
    {
      id: '1',
      userId: 'user1',
      userName: 'Travel Enthusiast',
      userAvatar: 'https://i.pravatar.cc/150?img=1',
      userRating: 4.5,
      date: new Date('2023-05-15'),
      content:
        'Just visited the most amazing waterfall in Bali! The trek was challenging but totally worth it. The views were breathtaking and the local guides were incredibly knowledgeable.',
      images: [
        'https://picsum.photos/id/1018/800/600',
        'https://picsum.photos/id/1015/800/600',
      ],
      likes: 24,
      isLiked: false,
      location: 'Bali, Indonesia',
      comments: [
        {
          id: 'c1',
          userId: 'user2',
          userName: 'Adventure Seeker',
          userAvatar: 'https://i.pravatar.cc/150?img=2',
          content: 'That looks amazing! How long was the hike?',
          date: new Date('2023-05-15'),
        },
      ],
    },
    {
      id: '2',
      userId: 'user3',
      userName: 'Mountain Lover',
      userAvatar: 'https://i.pravatar.cc/150?img=3',
      userRating: 4.8,
      date: new Date('2023-05-10'),
      content:
        'Sunrise at Mount Fuji was absolutely magical today. Woke up at 3am to make the climb and it was worth every sleepy moment. The way the light hit the clouds below us was unforgettable.',
      images: [
        'https://picsum.photos/id/1036/800/600',
        'https://picsum.photos/id/1038/800/600',
        'https://picsum.photos/id/1039/800/600',
      ],
      likes: 42,
      isLiked: true,
      location: 'Mount Fuji, Japan',
      comments: [
        {
          id: 'c2',
          userId: 'user4',
          userName: 'Nature Photographer',
          userAvatar: 'https://i.pravatar.cc/150?img=4',
          content: 'Stunning shots! What camera did you use?',
          date: new Date('2023-05-10'),
        },
        {
          id: 'c3',
          userId: 'user5',
          userName: 'Hiking Buddy',
          userAvatar: 'https://i.pravatar.cc/150?img=5',
          content: 'Wish I could have joined you! Next time for sure.',
          date: new Date('2023-05-11'),
        },
      ],
    },
    {
      id: '3',
      userId: 'user6',
      userName: 'Beach Explorer',
      userAvatar: 'https://i.pravatar.cc/150?img=6',
      userRating: 4.2,
      date: new Date('2023-05-05'),
      content:
        'Spent the day snorkeling in the Great Barrier Reef. The coral formations and marine life were incredible! Saw sea turtles, clownfish, and even a small reef shark.',
      images: [
        'https://picsum.photos/id/1040/800/600',
        'https://picsum.photos/id/1041/800/600',
      ],
      likes: 18,
      isLiked: false,
      location: 'Great Barrier Reef, Australia',
      comments: [],
    },
    {
      id: '4',
      userId: 'user7',
      userName: 'City Wanderer',
      userAvatar: 'https://i.pravatar.cc/150?img=7',
      userRating: 4.0,
      date: new Date('2023-05-01'),
      content:
        "The architecture in Barcelona is mind-blowing! Spent the whole day just walking around admiring Gaudi's work. The Sagrada Familia is even more impressive in person than in photos.",
      images: [
        'https://picsum.photos/id/1050/800/600',
        'https://picsum.photos/id/1051/800/600',
        'https://picsum.photos/id/1052/800/600',
        'https://picsum.photos/id/1053/800/600',
      ],
      likes: 31,
      isLiked: false,
      location: 'Barcelona, Spain',
      comments: [
        {
          id: 'c4',
          userId: 'user8',
          userName: 'Architecture Fan',
          userAvatar: 'https://i.pravatar.cc/150?img=8',
          content: "Did you get to visit Casa Batlló? It's my favorite!",
          date: new Date('2023-05-02'),
        },
      ],
    },
  ];

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
