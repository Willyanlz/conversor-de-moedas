import { Directive, HostListener, ElementRef, OnInit  } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ConversorComponent } from '../components';

@Directive({
  selector: '[numero]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: NumeroDirective,
    multi: true
  }]
})
export class NumeroDirective implements ControlValueAccessor{

  onTouched: any;
  onChanged: any;

  constructor(private el: ElementRef) { }

  /**
   * implementa o evento de keyup para o elemento da diretiva
   * @param $event any
   */

  @HostListener("keyup", ["$event"])
  onKeyup($event: any) {
    let valor = $event.target.value;
    let posDecimais = valor.indexOf(".");

    // remove caracteres não numéricos e em seguida verifica posição do ponto flutuante
    valor = valor.replace(/[\D]/g, "");

    if(posDecimais > 0){
      valor = valor.substr(0, posDecimais) + "." + valor.substr(posDecimais);
    }

    if (Number(valor) <= 0) {
      document.getElementById("brilho").classList.remove("brilho");
    }else{
      document.getElementById("brilho").classList.add("brilho");
    }

    // limita o valor a 999999999
    if (valor.length > 9 || Number(valor) < 0) {
      valor = valor.substr(0, 9);

    }
    $event.target.value = valor;
    this.onChanged(valor);
  }

  /**
   * registra função para atualizar valor na model
   * @param fn any
   * @returns void
   */
  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }

    /**
   * registra função para atualizar valor na model para o evento touched
   * @param fn any
   * @returns void
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * pega o valor da model
   * @param value any
   * @returns void
   */
  writeValue(value: any): void {
    this.el.nativeElement.value = value;
  }
}
