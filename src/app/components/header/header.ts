import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { LoginService } from '../../services/login-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  constructor(private loginService: LoginService, private router: Router) {}

  onLogout() {
    this.loginService.clearAuth();
    this.router.navigate(['/login']);
    this.loginService.logout().subscribe({
      next: () => {
        console.log('Logout exitoso');
      },
      error: (error) => {
        console.error('Error en logout:', error);
      }
    });
  }

}
