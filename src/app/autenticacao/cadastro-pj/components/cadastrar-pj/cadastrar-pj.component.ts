import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CadastroPJ } from '../../models';

@Component({
  selector: 'app-cadastrar-pj',
  templateUrl: './cadastrar-pj.component.html',
  styleUrls: ['./cadastrar-pj.component.css']
})
export class CadastrarPjComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBarModule,
    private router: Router
  ) {  }

  ngOnInit(): void {
     this.gerarForm();
  }

  //Mapea o formulario com o componente alem de adicionar validadores.
  gerarForm(){
        this.form = this.fb.group({
          nome: ['', [Validators.required, Validators.minLength(3)]],
          email: ['',[Validators.required, Validators.email] ],
          senha:['', [Validators.required, Validators.minLength(6)]],
          cpf:['', [Validators.required]],
          razaoSocial:['', [Validators.required]],
          cnpj:['', Validators.required]  
        });
  }

  cadastrarPJ(){
    if(this.form.invalid){
      return;
    }
    const cadastroPJ: CadastroPJ = this.form.value;
    alert(JSON.stringify(cadastroPJ));

  }

}
