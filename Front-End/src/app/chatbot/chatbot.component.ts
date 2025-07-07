import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ChatbotService } from './chatbot.service';
import { marked } from 'marked';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  messages: { from: 'user' | 'bot', text: string, html?: SafeHtml }[] = [];
  userInput = '';
  loading = false;
  showPopup = false;

  constructor(private chatbotService: ChatbotService, private sanitizer: DomSanitizer) {}

  togglePopup() {
    this.showPopup = !this.showPopup;
  }

  send() {
    if (!this.userInput.trim()) return;
    const userMsg = this.userInput;
    const parsed = marked.parse(userMsg);
    if (parsed instanceof Promise) {
      parsed.then(html => {
        this.messages.push({ from: 'user', text: userMsg, html: this.sanitizer.bypassSecurityTrustHtml(html) });
      });
    } else {
      this.messages.push({ from: 'user', text: userMsg, html: this.sanitizer.bypassSecurityTrustHtml(parsed) });
    }
    this.userInput = '';
    this.loading = true;
    this.chatbotService.sendMessage(userMsg).subscribe({
      next: res => {
        const parsed = marked.parse(res.reply);
        if (parsed instanceof Promise) {
          parsed.then(html => {
            this.messages.push({ from: 'bot', text: res.reply, html: this.sanitizer.bypassSecurityTrustHtml(html) });
            this.loading = false;
          });
        } else {
          this.messages.push({ from: 'bot', text: res.reply, html: this.sanitizer.bypassSecurityTrustHtml(parsed) });
          this.loading = false;
        }
      },
      error: () => {
        this.messages.push({ from: 'bot', text: 'Sorry, something went wrong.', html: this.sanitizer.bypassSecurityTrustHtml('Sorry, something went wrong.') });
        this.loading = false;
      }
    });
  }
}
