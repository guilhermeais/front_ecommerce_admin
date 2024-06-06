import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ToggleDarkModeComponent} from "../@shared/components/toggle-dark-mode/toggle-dark-mode.component";
import {LoginService} from "./login.service";
import {LoginResponse} from "./login.interface";
import {SnackBarNotificationService} from "../@shared/services/snack-bar-notification.service";
import {LocalStorageService, StorageKeys} from "../@shared/services/local-storage";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ToggleDarkModeComponent,
  ],
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  typeInputPassword: string = 'password';
  forms: FormGroup;
  loading: boolean = false;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private storage: LocalStorageService,
    private snackBarService: SnackBarNotificationService
  ) {
    this.forms = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~]).+$/)]),
    })
  };

  hasErrorInForm(campo: string): boolean {
    return this.forms.get(campo).touched && this.forms.get(campo).invalid;
  }

  getMessageErrorForm(form: FormGroup, control: string){
    if (form.get(control).hasError('required')) {
      return 'Campo obrigatório';
    }

    if (form.get(control).hasError('email')) {
      return 'Email inválido';
    }

    if (form.get(control).hasError('minlength')) {
      return 'Mínimo de 6 caracteres';
    }

    if (form.get(control).hasError('pattern')) {
      return 'Senha precisa ter 1 letra maiúscula, 1 caractere especial';
    }

    return '';
  }

  changeInputpasswordType() {
    this.typeInputPassword = this.typeInputPassword === 'password' ? 'text' : 'password';
  };

  async sendCredentials() {
    this.loading = true;
    const credentials = this.forms.value;

    this.loginService.login(credentials)
      .subscribe({
        next: (response: LoginResponse) => {
          this.storage.set(StorageKeys.user_logged_info, response.user);
          this.storage.set(StorageKeys.user_logged_token, response.authToken);
          this.router.navigate(['/home-page']);
          this.loading = false;
        },
        error: (error: HttpErrorResponse) => {
          console.error('ERRO AO FAZER LOGIN', error)
          this.snackBarService.openErrorSnackBar('Ops.. algo deu errado: ' + error.error.message)
          this.loading = false;
        },
    });
  }

  async goToSingUp(){
     await this.router.navigate(['/singup'])
  }
}

