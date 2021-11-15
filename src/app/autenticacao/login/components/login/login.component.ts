import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Login } from '../../models';
import { LoginService } from '../../service';

@Component({
  selector: 'app-login-pf',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

   form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.gerarForm();
  }

  gerarForm(){
    this.form = this.fb.group({
         email: ['', [Validators.required, Validators.email]],
         senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
 
  logar(){
     // Validação.
     if(this.form.invalid){
         this.snackBar.open("Dados inválidos", "Erro", {duration: 5000});
       return;
     }
     const login: Login = this.form.value;
     //alert("Login " + login.email + " - senha: " + login.senha);
     this.loginService.logar(login).subscribe(
            data =>{
              console.log(JSON.stringify(data)); // exibe os dados de retorno
              localStorage['token'] = data['data']['token']; //armazena no nagevador o token para ser reusado.
              const usuarioData = JSON.parse(atob(data['data']['token'].split('.')[1]));
              /**
               * O token vem um formato base 64. A função atob faz essa conversão.
               * no caso acima vai obter o perfil do usuário.
               */
              console.log(JSON.stringify(usuarioData));
              if(usuarioData['role'] == 'ROLE_ADMIN') {
                  alert('Deve redirecionar para a página de admin');
                 //this.router.navigate(['/admin']);
               } else {
          	     alert('Deve redirecionar para a página de funcionário');
                 //this.router.navigate(['/funcionario']);
              }
             },
            error => {
              console.log(JSON.stringify(error));
              let msg: string = "Tente novamente";
              if(error['status'] == 401){
                msg = "Email ou senha inválidos";
              }
              this.snackBar.open(msg, "Erro", {duration: 5000});
            }
     ); 

  }
  
  /*redirecionar(rota: String){
    this.router.navigate(rota);
  }*/
  
  

  

}
