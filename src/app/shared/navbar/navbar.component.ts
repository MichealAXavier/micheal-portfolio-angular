import { Component, Output, EventEmitter } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private router: Router) { }

  @Output() contactClick = new EventEmitter<void>();

  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  openContact() {
    this.contactClick.emit();
  }

  // 🔥 Works from ANY page
  navigateToSection(section: string) {
    this.closeMenu();
    this.router.navigate(['/'], { fragment: section });
  }
}
