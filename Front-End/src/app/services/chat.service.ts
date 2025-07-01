import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  isChatOpen = false;
  selectedChat: any = null;
  private chats: any[] = [];
  private initialized = false; // Track if chats have been initialized

  private apiUrl = 'http://localhost:8080/api/chat';

  constructor(private http: HttpClient) {
    this.initializeMockChats();
  }

  private initializeMockChats() {
    if (this.initialized) return;

    this.chats = [
      {
        id: '1',
        name: 'Tour Guide John',
        avatar: '/assets/img/tourguide.jpg',
        lastMessage: 'Looking forward to our trip tomorrow!',
        time: '2h ago',
        messages: [
          {
            text: 'Hello! Are you ready for our mountain adventure tomorrow?',
            time: '10:30 AM',
            senderId: 'guide123',
          },
          {
            text: 'Yes, I am very excited!',
            time: '10:32 AM',
            senderId: '123',
          },
          {
            text: 'Looking forward to our trip tomorrow!',
            time: '10:35 AM',
            senderId: 'guide123',
          },
        ],
      },
      {
        id: '2',
        name: 'Travel Company ABC',
        avatar: '/assets/img/tourguide.jpg',
        lastMessage: 'Your package is confirmed',
        time: '1h ago',
        messages: [
          {
            text: 'Your package is confirmed',
            time: '11:15 AM',
            senderId: 'company123',
          },
          {
            text: 'Thank you for the confirmation!',
            time: '11:16 AM',
            senderId: '123',
          },
        ],
      },
      {
        id: '3',
        name: 'Safari Adventures',
        avatar: '/assets/img/tourguide.jpg',
        lastMessage: 'Weather looks perfect for tomorrow',
        time: '30m ago',
        messages: [
          {
            text: 'Weather looks perfect for tomorrow',
            time: '12:30 PM',
            senderId: 'safari123',
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

  selectChat(chat: any) {
    // Find the current version of this chat in our array
    const currentChat = this.chats.find((c) => c.id === chat.id);
    this.selectedChat = currentChat ? { ...currentChat } : { ...chat };
    console.log('Chat selected:', this.selectedChat);
    setTimeout(() => this.scrollToBottom(), 100);
  }

  getChats(userId: string, userType: string) {
    // Return a copy of the current chats array
    console.log('Getting chats for user:', userId, 'type:', userType);
    return [...this.chats];
  }

  sendMessage(senderId: string, chatId: string, text: string) {
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
    }

    setTimeout(() => this.scrollToBottom(), 100);
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