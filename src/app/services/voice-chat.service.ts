import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VoiceChatService {
  private peerConnection: RTCPeerConnection | null = null;
  private signalingChannel: any; // Socket or signaling server

  constructor() {}

  async initVoiceChat(): Promise<MediaStream> {
    const localStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    this.setupPeerConnection(localStream);
    return localStream;
  }

  private setupPeerConnection(localStream: MediaStream) {
    this.peerConnection = new RTCPeerConnection();

    // Add local stream tracks to the connection
    localStream.getTracks().forEach((track) => {
      this.peerConnection?.addTrack(track, localStream);
    });

    // Handle remote stream
    this.peerConnection.ontrack = (event) => {
      const remoteStream = event.streams[0];
      // this.remoteStream = remoteStream;
    };

    // Handle ICE candidates
    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        // Send candidate to signaling server
        this.signalingChannel.send({
          type: 'candidate',
          candidate: event.candidate,
        });
      }
    };
  }

  async startCall(remoteUserId: string) {
    if (!this.peerConnection) {
      throw new Error('Peer connection is not initialized');
    }

    const offer = await this.peerConnection.createOffer();
    await this.peerConnection.setLocalDescription(offer);
    // Send offer to signaling server
    this.signalingChannel.send({ type: 'offer', offer: offer });
  }

  stopCall() {
    if (this.peerConnection) {
      this.peerConnection.close();
      this.peerConnection = null;
    }
  }
}
