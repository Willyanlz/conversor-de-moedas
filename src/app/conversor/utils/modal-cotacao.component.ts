import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ConversorService } from '../services';
import { Conversao, ConversaoResponse } from '../models';

@Component({
  selector: 'modal-cotacao',
  templateUrl: './modal-cotacao.component.html',
  styleUrls: ['./modal-cotacao.component.css']
})
export class ModalCotacaoComponent implements OnInit{

  @Input() id: string;
  @Input() conversaoResponse: ConversaoResponse;
  @Input() conversao: Conversao = new Conversao();
  @Output() onConfirm: EventEmitter<any> = new EventEmitter<any>;

  constructor(private conversorService: ConversorService){}
  

  ngOnInit(): void {
  }

  novaConsulta(){
    this.onConfirm.emit();
  }

  get valorConvertido(): string{
    if(this.conversaoResponse === undefined) {
      return "0";
    }
    // return (this.conversao.valor * this.conversaoResponse.conversion_rate[this.conversao.moedaPara]).toFixed(3);
    return (this.conversao.valor * this.conversaoResponse.conversion_rate).toFixed(2);
  }

  // get cotacaoPara(): number{
  //   return Number(this.conversorService.cotacaoPara(this.conversaoResponse, this.conversao));
  //   // return Number((this.conversaoResponse.conversion_rate/1).toFixed(3));
  // }

  // get cotacaoDe(): number{;
  //   return this.conversorService.cotacaoDe(this.conversaoResponse, this.conversao);

  // }

  get dataCotacao(): string{
    return this.conversorService.dataCotacao(this.conversaoResponse);
  }

}
