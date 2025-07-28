import { Component, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
    import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Add this import

@Component({
  selector: 'app-root',
  imports: [
    RouterModule
    ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('client');
}
