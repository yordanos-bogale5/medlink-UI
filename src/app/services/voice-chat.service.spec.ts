import { TestBed } from '@angular/core/testing';

import { VoiceChatService } from './services/voice-chat.service';

describe('VoiceChatService', () => {
  let service: VoiceChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VoiceChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
