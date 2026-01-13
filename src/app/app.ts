import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";
import { LoginService } from './services/login-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('bank-front');

  constructor(public router: Router, private loginService: LoginService) {}

  ngOnInit() {
    this.loginService.getCurrentUser().subscribe({
      next: (user) => {
        console.log('Usuario autenticado:', user);
      },
      error: (error) => {
        console.error('Error al obtener el usuario actual:', error);
        this.loginService.clearAuth();
        this.router.navigate(['/login']);
      }
    });
}
}
