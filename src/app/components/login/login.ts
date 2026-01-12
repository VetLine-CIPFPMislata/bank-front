import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../../common/usuario';
import { LoginService } from '../../services/login-service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private loginService = inject(LoginService);
  private router = inject(Router);

  usuario: Usuario = {
    id: 0,
    username: '',
    email: '',
    password: ''
  };

  errorMessage: string = '';
  isLoading: boolean = false;

  onSubmit() {
    this.isLoading = true;
    this.errorMessage = '';

    this.loginService.login(this.usuario).subscribe({
      next: (response: any) => {
        // Guardar el token que devuelve el backend
        this.loginService.setToken(response.api_token);
        // Redirigir al dashboard o página principal
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Usuario o contraseña incorrectos';
        console.error('Error de login:', error);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
