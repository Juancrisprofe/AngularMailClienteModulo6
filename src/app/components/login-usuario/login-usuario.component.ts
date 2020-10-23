import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.scss']
})
export class LoginUsuarioComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      usuario: new FormControl ('rafa', [Validators.required, Validators.minLength(4)]),
      password: new FormControl ('81dc9bdb52d04dc20036dbd8313ed055', [])
    });
  }

  /**
   * 
   */
  autenticaUsuario() {
    this.usuarioService.autenticaUsuario(this.loginForm.controls.usuario.value,
      this.loginForm.controls.password.value).subscribe(data => {
        console.log(data);
        if (data.jwt != undefined) {
          this.router.navigate(['/listadoMensajes']);
        }
        else {
          console.log('Datos incorrectos');
        }
      });

/*
    console.log('Usuario válido?: ' + this.loginForm.controls.usuario.valid);
    var jsonObject = {
      usuario: ,  // Utilizo el id de los campos del formulario
      password: 
    };

    this.http.post('http://localhost:8080/usuario/autentica', jsonObject).subscribe(jwt => {
      console.log(jwt);
    });

    /*
    console.log("u: " + jsonObject.usuario + " - p: " + jsonObject.password);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("respuestaDelServidor").innerHTML = this.response;
      }
    };
    xhttp.open("POST", "http://localhost:8080/usuario/autentica", true);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify(jsonObject)); */
  }

}
