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
  
    // Add more tests as needed for other functionalities
  
  });
  