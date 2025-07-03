import { Component } from '@angular/core';
import { BlogPost, Comment } from '../../app/models/blog-post.model';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-blog-my-blog',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, DatePipe],
  templateUrl: './my-blog.component.html',
  styleUrls: ['./my-blog.component.css'],
})
export class BlogMyBlogComponent {
  myPosts: BlogPost[] = [
    {
      id: '5',
      userId: 'currentUser',
      userName: 'You',
      userAvatar: 'https://i.pravatar.cc/150?img=11',
      userRating: 4.0,
      date: new Date('2023-05-12'),
      content:
        'My recent trip to the Swiss Alps was incredible! The fresh air and stunning views made it all worthwhile. The train ride up the mountain was an experience in itself.',
      images: [
        'https://picsum.photos/id/1033/800/600',
        'https://picsum.photos/id/1024/800/600',
      ],
      likes: 15,
      isLiked: false,
      location: 'Swiss Alps, Switzerland',
      comments: [
        {
          id: 'c5',
          userId: 'user9',
          userName: 'Mountain Guide',
          userAvatar: 'https://i.pravatar.cc/150?img=9',
          content: 'Glad you enjoyed it! Which peak did you visit?',
          date: new Date('2023-05-13'),
        },
      ],
    },
    {
      id: '6',
      userId: 'currentUser',
      userName: 'You',
      userAvatar: 'https://i.pravatar.cc/150?img=11',
      userRating: 4.0,
      date: new Date('2023-04-28'),
      content:
        'Weekend getaway to a cozy cabin in the woods. Perfect for disconnecting and enjoying nature. Saw deer right outside our window in the morning!',
      images: [
        'https://picsum.photos/id/1080/800/600',
        'https://picsum.photos/id/1081/800/600',
        'https://picsum.photos/id/1082/800/600',
      ],
      likes: 22,
      isLiked: true,
      location: 'Black Forest, Germany',
      comments: [],
    },
  ];

  // Add these new properties to your component class
  editingPost: BlogPost | null = null;
  editPostContent: string = '';
  editPostImages: string[] = [];

  // Add these new methods
  startEditing(post: BlogPost): void {
    this.editingPost = { ...post };
    this.editPostContent = post.content;
    this.editPostImages = [...post.images];
  }

  cancelEditing(): void {
    this.editingPost = null;
    this.editPostContent = '';
    this.editPostImages = [];
  }

  saveEditedPost(): void {
    if (this.editingPost && this.editPostContent.trim()) {
      const index = this.myPosts.findIndex(
        (p) => p.id === this.editingPost!.id
      );
      if (index !== -1) {
        this.myPosts[index] = {
          ...this.editingPost,
          content: this.editPostContent,
          images: this.editPostImages,
          date: new Date(), // Update the edit date
        };
      }
      this.cancelEditing();
    }
  }

  deletePost(post: BlogPost): void {
    if (confirm('Are you sure you want to delete this post?')) {
      this.myPosts = this.myPosts.filter((p) => p.id !== post.id);
    }
  }

  // Update your existing onImageUpload method to work with edits
  onImageUpload(event: any, isEdit: boolean = false): void {
    const numImages = Math.min(3, 1 + Math.floor(Math.random() * 4));
    const images = [];

    for (let i = 0; i < numImages; i++) {
      images.push(
        `https://picsum.photos/id/${Math.floor(Math.random() * 1000)}/800/600`
      );
    }

    if (isEdit) {
      this.editPostImages = images;
    } else {
      this.newPostImages = images;
    }
  }
  newPostContent: string = '';
  newPostImages: string[] = [];

  createPost(): void {
    if (!this.newPostContent.trim()) return;

    const newPost: BlogPost = {
      id: `p${this.myPosts.length + 1}`,
      userId: 'currentUser',
      userName: 'You',
      userAvatar: 'https://i.pravatar.cc/150?img=11',
      userRating: 4.0,
      date: new Date(),
      content: this.newPostContent,
      images: this.newPostImages,
      likes: 0,
      isLiked: false,
      comments: [],
    };

    this.myPosts.unshift(newPost);
    this.newPostContent = '';
    this.newPostImages = [];
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
}
