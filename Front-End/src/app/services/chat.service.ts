import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { UserType } from '../company-dashboard/company-dashboard.component';



export interface Chat {
  id: string;
  avatar: string;
  name: string;
  lastMessage: string;
  time: string;
  messages: Message[];
}

export interface Message {
  text: string;
  time: string;
  senderId: string;
}

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  isChatOpen = false;
  selectedChat: any = null;
  private chats: any[] = [];
  private initialized = false; // Track if chats have been initialized
  private messages: Chat[] = [];
  private apiUrl = 'http://localhost:8080/chat';

  constructor(private http: HttpClient, private authService: AuthService) {
    this.initializeMockChats();
  }

  private initializeMockChats() {
    if (this.initialized) return;

    this.chats = [
      {
        id: '1',
        name: 'Safaria',
        avatar: '/assets/img/tourguide.jpg',
        lastMessage: 'Welcome back!',
        time: 'now',
        messages: [
          {
            text: 'Welcome back!',
            time: 'now',
            senderId: 'Safaria',
          },

        ],
      },
    ];
    this.initialized = true;
    console.log('Chat service initialized with chats:', this.chats);
  }

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
    console.log('Chat toggled. Open:', this.isChatOpen);
    if (!this.isChatOpen) {
      this.selectedChat = null;
    }
  }
  getToggledChat(): any[] { return this.chats; }
  selectChat(chat: any) {
    // Find the current version of this chat in our array
    const currentChat = this.chats.find((c) => c.id === chat.id);
    this.selectedChat = currentChat ? { ...currentChat } : { ...chat };
    console.log('Chat selected:', this.selectedChat);
    setTimeout(() => this.scrollToBottom(), 100);
  }

  getChats(userId: string | null, userType: string) {
    // Return a copy of the current chats array
    console.log('Getting chats for user:', userId, 'type:', userType);
    this.http.get<Chat[]>(`${this.apiUrl}/getChats/${userId}`).subscribe({
      next: (data) => {
        this.messages = data;
        let index = 2;
        this.messages.forEach(m => {
          index++;
          m.id = index.toString();
          m.avatar = '/assets/img/tourguide.jpg';
          this.chats.push(m);
        });
      },

      error: (err) => console.error('Failed to load chats', err)
    });
    console.log(this.messages)
    interface msg {
      text: any;
      time: any;
      senderId: any;
    }

    return [...this.chats];
  }

  sendMessage(senderId: string | null, chatId: string, text: string) {
    if (!text.trim()) return;

    const newMsg = {
      text: text.trim(),
      time: this.getCurrentTime(),
      senderId,
    };

    // Find the chat in our array
    const chatIndex = this.chats.findIndex((c) => c.id === chatId);

    if (chatIndex >= 0) {
      // Create a new messages array with the new message
      const updatedMessages = [...this.chats[chatIndex].messages, newMsg];

      // Update the chat with new messages
      this.chats[chatIndex] = {
        ...this.chats[chatIndex],
        messages: updatedMessages,
        lastMessage: text.trim(),
        time: 'Just now',
      };

      // If this is the currently selected chat, update it
      if (this.selectedChat?.id === chatId) {
        this.selectedChat = { ...this.chats[chatIndex] };
      }

      console.log('Message sent:', newMsg);
      const message = {
        sender_username: senderId,
        receiver_username: this.chats[chatIndex].name,
        content: text.trim(),

      }

      this.http.post<any>(`${this.apiUrl}/setMessage/`, message, {

      }).subscribe({
        next: (response: any) => {
          console.log('Success:', response);

        },
        error: (error: any) => {
          console.error('Error:', error);
        }
      });

    }

    setTimeout(() => this.scrollToBottom(), 100);
  }
  addChat(username: string) {
    const chat: Chat = {
      id: (this.chats.length + 1).toString(),
      avatar: '/assets/img/tourguide.jpg',
      name: username,
      lastMessage: '',
      time: '',
      messages: [

      ]
    };
    this.chats.push(chat);
  }

  private getCurrentTime(): string {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  private scrollToBottom() {
    try {
      const messagesContainer = document.querySelector('.messages');
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    } catch (error) {
      console.log('Could not scroll to bottom:', error);
    }
  }

  // Add method to close chat
  closeChat() {
    this.isChatOpen = false;
    this.selectedChat = null;
  }

  // Add method to go back to chat list
  backToList() {
    this.selectedChat = null;
  }
}