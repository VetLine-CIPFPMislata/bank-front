import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioRequest } from '../../Models/usuarioRequest';
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

  usuario: UsuarioRequest = {
    username: '',
    password: '',
  };

   ngOnInit() {
    if (this.loginService.isAuthenticated()) {
      this.router.navigate(['/articulos']);
    }
  }

  errorMessage: string = '';
  isLoading: boolean = false;

  onLogin() {
    this.errorMessage = '';
    this.isLoading = true;

    this.loginService.login(this.usuario).subscribe({
      next: (response) => {
        console.log('Login exitoso:', response);

        this.loginService.setToken(response.token);
        this.loginService.saveUserName(response.username);

        this.loginService.getCurrentUser().subscribe({
          next: (user) => {
            console.log('Usuario obtenido:', user);
            // Guardar el clientId y username en localStorage
            localStorage.setItem('clientId', user.id.toString());
            localStorage.setItem('username', user.username);
            
            this.isLoading = false;
            this.router.navigate(['/home']);
          },
          error: (error) => {
            console.error('Error al obtener el usuario:', error);
            this.isLoading = false;
            this.router.navigate(['/login']);
          }
        });
      },
      error: (error) => {
        console.error('Error en login:', error);
        this.isLoading = false;
        
        if (error.status === 401) {
          this.errorMessage = 'Credenciales incorrectas. Por favor, verifica tu email y contraseña.';
        } else {
          this.errorMessage = 'Error al iniciar sesión. Por favor, intenta de nuevo más tarde.';
        }
      }
    });
    
  }
}
