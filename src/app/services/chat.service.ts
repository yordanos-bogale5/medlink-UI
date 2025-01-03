import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'; // Used to broadcast new messages

@Injectable({
  providedIn: 'root', // Makes the service globally available
})
export class ChatService {
  private messages: any[] = []; // Store messages
  private messageSubject: Subject<any[]> = new Subject<any[]>();

  constructor() {}

  // Get the observable of the message list
  getMessages() {
    return this.messageSubject.asObservable();
  }

  // Send a new message (e.g., triggered from the component)
  sendMessage(newMessage: string, sender: string = 'You') {
    const message = { sender, text: newMessage, timestamp: new Date() };
    this.messages.push(message);

    // Update the UI with the new message
    this.messageSubject.next(this.messages); // Emits new messages to the subscribers
  }

  // Get the message history (or implement logic for message retrieval from a server)
  getMessageHistory() {
    return this.messages;
  }

  // Optionally, implement this method to fetch messages from a backend server
  fetchMessagesFromServer() {
    // Example: This could make an HTTP call to your backend service to retrieve messages.
  }
}
