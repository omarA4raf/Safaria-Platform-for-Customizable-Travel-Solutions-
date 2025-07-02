// chat.component.ts
import { Component, Input, OnInit,NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { AuthService } from 'src/app/services/auth.service';
import { JwtHelper } from 'src/app/services/jwt.helper';
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
  @Input() userId: string | null = '';
  @Input() userType: 'tourist' | 'guide' | 'company' | 'admin' = 'tourist';

  newMessage = '';
  searchUsername: string = '';
  chats : any;
  constructor(public chatService: ChatService,private authService:AuthService,private jwtHelper:JwtHelper) {}

  ngOnInit() {
    
    // Initialize with default values if not provided
      this.userId = this.authService.getUsername(); // Default user ID
    if (this.userId == undefined) {
      this.userId = 'Sender123'; // Default user ID
    }
    this.chats=this.chatService.getChats(this.userId,this.userType)
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
    
    this.chats=this.chatService.getToggledChat();
  }
    submitUsername(){
    this.chatService.addChat(this.searchUsername);
    this.chats=this.chatService.getToggledChat();
}
}