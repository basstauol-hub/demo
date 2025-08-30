import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Desencriptar, snackBarError, snackBarOk } from 'src/app/components/shared/functions';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
// export this.user
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;


  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.logOut();
  }

  getLoggedUser() {
    /* this.authService.getLoggedUser().subscribe((res) => {
      console.log('Problemas con el LOGIN ex FIREBASE')
    }); */
    console.log('Problemas con el LOGIN ex FIREBASE')
  }

  logOut() {
    this.authService.logOut();
  }

  /* async ingresarGoogle() {
    await this.authService.loginWithGoogle().then((resp) => {
      if (!resp) {
        return false;
      }
    });
    await this.authService
      .loginApi(Desencriptar(JSON.parse(sessionStorage.getItem('currentUser')).email),'')
      .then((resp) => {
        if (!resp) {
          return false;
        }
      });
  } */

  async ingresar() {
    const usuario = this.form.value.usuario;
    const password = this.form.value.password;

    this.logOut();
    if (!this.form.valid) {
      return;
    }
/*     await this.authService.loginFirebase(usuario, password).then((resp) => {
      if (!resp) {
        return false;
      }
    }); */

    await this.authService.loginApi(usuario, password).then(
      (resp) => {
        // this.entrar();
        /*       console.log('ingresar', resp);
      if (!resp) {
        return false;
      } */
     },
      (error) => {
        this.error();
      }
    );

  }

  async ingresarUltragestion() {
    const usuario = this.form.value.usuario;
    const password = this.form.value.password;

    this.logOut();
    if (!this.form.valid) {
      return;
    }

    await this.authService.loginApiUltragestion(usuario, password).then(
      (resp) => {
        // this.entrar();
        /*       console.log('ingresar', resp);
      if (!resp) {
        return false;
      } */
     },
      (error) => {
        this.error();
      }
    );

  }

  error() {
    this.snackBar.open('Usuario o Contraseña incorrecto', '', snackBarError());
  }

  entrar() {
    this.loading = true;

    setTimeout(() => {
      this.router.navigateByUrl('/maestros');
      this.loading = false;
    }, 1000);
  }

  loginnew() {
    this.router.navigate(['loginnew']);
  }
}
