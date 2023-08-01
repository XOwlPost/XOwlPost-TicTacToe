import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { PlayerComponent } from '../app/components/player/player.component';
import { SearchComponent } from '../app/components/searchbar/search.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('PlayerComponent', () => {
  let component: PlayerComponent;
  let fixture: ComponentFixture<PlayerComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlayerComponent],
      imports: [HttpClientTestingModule, FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should transfer playback to different devices when calling transferPlayback()', () => {
    const deviceId = 'your-device-id';

    component.transferPlayback(deviceId);

    const request = httpMock.expectOne('your-api-endpoint/transfer-playback');
    expect(request.request.method).toBe('PUT');
    expect(request.request.body.deviceId).toBe(deviceId);

    request.flush({}); // Mock the response if needed

    // Additional assertions or expectations based on the response
  });

  // Other tests

});

describe('PlayerComponent', () => {
  let component: PlayerComponent;
  let fixture: ComponentFixture<PlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlayerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Other tests

});

describe('PlayerComponent', () => {
  let component: PlayerComponent;
  let fixture: ComponentFixture<PlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlayerComponent, SearchComponent],
      imports: [HttpClientTestingModule, FormsModule], // Include FormsModule
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Other tests
  describe('PlayerComponent', () => {
    let component: PlayerComponent;
    let fixture: ComponentFixture<PlayerComponent>;
  
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [PlayerComponent],
      }).compileComponents();
    });
  
    beforeEach(() => {
      fixture = TestBed.createComponent(PlayerComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  
    it('should increase the score when calling increaseScore()', () => {
      const initialScore = component.score;
      component.increaseScore();
      expect(component.score).toBe(initialScore + 1);
    });
  
    it('should decrease the score when calling decreaseScore()', () => {
      const initialScore = component.score;
      component.decreaseScore();
      expect(component.score).toBe(initialScore - 1);
    });
  
    it('should play the track when calling playTrack()', () => {
      // Mock HttpClient and test the HTTP request
    });
  
    it('should pause the playback when calling pausePlayback()', () => {
      // Mock HttpClient and test the HTTP request
    });
  
    it('should skip to the next track when calling skipToNextTrack()', () => {
      // Mock HttpClient and test the HTTP request
    });
  
    it('should skip to the previous track when calling skipToPreviousTrack()', () => {
      // Mock HttpClient and test the HTTP request
    });
  
    it('should set the volume when calling setVolume()', () => {
      // Mock HttpClient and test the HTTP request
    });
  
    it('should transfer playback to different devices when calling transferPlayback()', () => {
      // Mock HttpClient and test the HTTP request
    });
    // Add more tests as needed for other functionalities
  
  });
  

  it('should retrieve search results based on the search query', () => {
    // Test case implementation
  });
});
