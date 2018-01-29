import { Component } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
        'book',
        sanitizer.bypassSecurityTrustResourceUrl('assets/img/examples/book.svg'));
    iconRegistry.addSvgIcon(
        'note add',
        sanitizer.bypassSecurityTrustResourceUrl('assets/img/examples/note_add.svg'));
  }
}
