import { Directive, HostListener, Input, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR,  ControlValueAccessor } from '@angular/forms';

@Directive({
  selector: '[mascara]', //nome da diretiva
  providers:[{
    provide: NG_VALUE_ACCESSOR, //Indica a comunicação com o campo de texto. (Valor)
    useExisting: MascaraDirective,
    multi:true
  }]
})
export class MascaraDirective implements ControlValueAccessor {
  //ControlValueAccessor - Interface que possibilita ter acesso a métodos para comunicação com o valor do texto   
  
  oneTouched: any;  //dois eventos
  onChange: any;
  
  @Input('mascara') mascara!: string; // Obtem o formato da mascara
 
   //ElementRef - Campo de texto
  constructor(private el: ElementRef) { }
   
  //Primeiro  método a ser carregado. Caso possua valor aplicar o método que formata a mascara.
  writeValue(obj: any): void {
    if(obj){
      //this.el.nativeElement - representa o valor do campo input.
      this.el.nativeElement.value = this.aplicaMascara(obj);
    }  
  }
   
  //registra mudanças
  registerOnChange(fn: any): void {
     this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
     this.oneTouched = fn;
  }
  // -------------------------------------------
  
  //HostListener - Dispara o evento sempre que soltar uma tecla.
  @HostListener('keyup', ['$event']) 
  onKeyup($event: any) {
    let valor: string = $event.target.value.replace(/\D/g, '');

    // retorna caso pressionado backspace
    if ($event.keyCode === 8) {
      this.onChange(valor);
      return;
    }

    let pad = this.mascara.replace(/\D/g, '').replace(/9/g, '_');
    if (valor.length <= pad.length) {
      this.onChange(valor);
    }

    $event.target.value = this.aplicaMascara(valor);
  }
  //Neste caso qdo tira o foco do botão de texto. No caso se houver algum erro este limpa o campo.
  @HostListener('blur', ['$event']) 
  onBlur($event: any) {
    if ($event.target.value.length === this.mascara.length) {
      return;
    }
    this.onChange('');
    $event.target.value = '';
  }

  //Aplica a regra para implementar a mascara de CPF / CNPJ.
  aplicaMascara(valor: any): any {

    valor = valor.replace(/\D/g, '');
    let pad = this.mascara.replace(/\D/g, '').replace(/9/g, '_');
    let valorMask = valor + pad.substring(0, pad.length - valor.length);
    let valorMaskPos = 0;
    
    valor = '';
    for (let i = 0; i < this.mascara.length; i++) {
      if (isNaN(parseInt(this.mascara.charAt(i)))) {
        valor += this.mascara.charAt(i);
      } else {
        valor += valorMask[valorMaskPos++];
      }
    }
    
    if (valor.indexOf('_') > -1) {
      valor = valor.substr(0, valor.indexOf('_'));
    }

    return valor;

  }


}
