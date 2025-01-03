import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VoiceChatService } from '../../../services/voice-chat.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent {
  contacts = [
    {
      id: 1,
      name: 'Dr. Sarah',
      specialty: 'Cardiologist',
      profilePic: 'sarah.png',
    },
    {
      id: 2,
      name: 'Dr. John ',
      specialty: 'Neurology',
      profilePic: 'john.png',
    },
    {
      id: 3,
      name: 'Dr. Mike ',
      specialty: 'Pediatrics',
      profilePic: 'mike.png',
    },
  ];

  messages = [
    { sender: 'Dr. Sarah', text: 'Hello, how can I help you?' },
    { sender: 'Me', text: 'I have a question about my appointment.' },
  ];

  //chat
  selectedContact: any = null;
  newMessage: string = '';
  searchQuery: string = '';
  isVoiceChatActive: boolean = false;
  localStream: MediaStream | null = null;
  remoteStream: MediaStream | null = null;

  // ngOnInit(): void {}

  selectContact(contact: any): void {
    this.selectedContact = contact;
    this.messages = [
      { sender: contact.name, text: `Hi, this is ${contact.name}` },
    ];
  }

  // Filter contacts based on the search query
  get filteredContacts() {
    return this.contacts.filter((contact) =>
      contact.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  // Send a message and add it to the chat history
  sendMessage(): void {
    if (this.newMessage.trim()) {
      this.messages.push({ sender: 'Me', text: this.newMessage });
      this.newMessage = '';
    }
  }

  //voice chat
  constructor(private voiceChatService: VoiceChatService) {}

  toggleVoiceChat() {
    if (this.isVoiceChatActive) {
      this.stopVoiceChat();
    } else {
      this.startVoiceChat();
    }
  }

  async startVoiceChat() {
    this.localStream = await this.voiceChatService.initVoiceChat();
    this.isVoiceChatActive = true;
  }

  stopVoiceChat() {
    this.voiceChatService.stopCall();
    this.localStream = null;
    this.remoteStream = null;
    this.isVoiceChatActive = false;
  }
}
