import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { ChatService } from './app/services/chat.service';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    ChatService, // ← Ensure this is provided
    // ... your other providers
  ]
})
.catch(err => console.error(err));