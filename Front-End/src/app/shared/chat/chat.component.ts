// chat.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';

export enum UserType {
  TOURIST = 'tourist',
  GUIDE = 'guide',
  COMPANY = 'company',
  ADMIN = 'admin',
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  @Input() userId: string = '';
  @Input() userType: 'tourist' | 'guide' | 'company' | 'admin' = 'tourist';

  newMessage = '';

  constructor(public chatService: ChatService) {}

  ngOnInit() {
    // Initialize with default values if not provided
    if (!this.userId) {
      this.userId = '123'; // Default user ID
    }
    console.log('Chat component initialized with userId:', this.userId, 'userType:', this.userType);
  }

  sendMessage() {
    if (this.newMessage.trim() && this.chatService.selectedChat) {
      this.chatService.sendMessage(
        this.userId,
        this.chatService.selectedChat.id,
        this.newMessage
      );
      this.newMessage = '';
    }
  }

  selectChat(chat: any) {
    this.chatService.selectChat(chat);
  }

  toggleChat() {
    this.chatService.toggleChat();
  }
}