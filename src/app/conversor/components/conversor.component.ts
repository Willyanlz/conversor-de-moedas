import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Moeda, Conversao, ConversaoResponse } from '../models';
import { MoedaService, ConversorService } from '../services';

@Component({
  selector: 'app-conversor',
  templateUrl: './conversor.component.html',
  styleUrls: ['./conversor.component.css']
})
export class ConversorComponent implements OnInit {

  moedas: Moeda[];
  conversao: Conversao;
  possuiErro: boolean;
  conversaoResponse: ConversaoResponse;

  @ViewChild("conversaoForm", { static: true }) conversaoForm: NgForm;

  constructor(
    private moedaService: MoedaService,
    private conversorService: ConversorService,){}

  ngOnInit() {
  	this.moedas = this.moedaService.listarTodas();
  	this.init();
  }


  /**
   * Efetua a chamada para a conversão dos valores.
   *
   * @return void
   */
  init(): void {
  	this.conversao = new Conversao('BRL', 'USD', null);
  	this.possuiErro = false;
  }

  /**
   * Efetua a chamada para a conversão dos valores.
   *
   * @return void
   */

  // A partir do RxJS 6.5, em vez de passar os callbacks separados, é recomendado passar um objeto do tipo "Observer" como
  // argumento único do método "subscribe". O objeto "Observer" tem três métodos: "next" para tratar os valores emitidos
  // pelo observable, "error" para tratar erros que possam ocorrer e "complete" para tratar a conclusão do observable.

  // converter(): void {
  // 	if (this.conversaoForm.form.valid) {
  // 	  this.conversorService.converter(this.conversao).subscribe(response => this.conversaoResponse = response, error => this.possuiErro = true);
  // 	}
  // }


  converter(): void {
    if (this.conversaoForm.form.valid || this.possuiErro == false) {
      this.conversorService.converter(this.conversao).subscribe({
        next: response => this.conversaoResponse = response,
        error: error => this.possuiErro = true
      });
    }
  }

  inverteInOut(): void {
    this.converter()
    const moedaDe = this.conversao.moedaDe;
    const moedaPara = this.conversao.moedaPara;
  
    this.conversao.moedaDe = moedaPara;
    this.conversao.moedaPara = moedaDe; 
    console.log(this.inverteInOut)
  }

}
