import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Conversao, ConversaoResponse } from '../models';

@Injectable()

export class ConversorService {

  // private readonly BASE_URL = "http://data.fixer.io/api/latest?access_key=haZIMasRtnKWIoJEeyFqDt2j45As9VTz";
  private readonly BASE_URL = "https://v6.exchangerate-api.com/v6/c12b06121042db56d93255e6/pair/";

  constructor(private http: HttpClient) {}
  
  /**
   * Realiza a chamada para a API de conversão de moedas.
   *
   * @param Conversao conversao
   * @return Observable <ConversaoResponse>
   */
  converter(conversao: Conversao): Observable<any> {
    // let params = `&base=${conversao.moedaDe}&symbols=${conversao.moedaPara}`;
    let params = conversao.moedaDe+"/"+conversao.moedaPara;
    return this.http.get(this.BASE_URL + params);
  }
  
  /**
   * Retorna a cotação PARA de uma response.
   *
   * @param ConversaoResponse conversaoResponse
   * @param Conversao conversao
   * @return number
   */
  cotacaoPara(conversaoResponse: ConversaoResponse, conversao: Conversao): number {
    if (conversaoResponse === undefined) {
      return 0;
    }
    return conversaoResponse.conversion_rate[conversao.moedaPara];
  }
 
  /**
   * Retorna a cotação DE de uma response.
   *
   * @param ConversaoResponse conversaoResponse
   * @param Conversao conversao
   * @return string
   */
  cotacaoDe(conversaoResponse: ConversaoResponse, conversao: Conversao): number {
    if (conversaoResponse === undefined) {
      return 0;
    }
    return Number((1 / conversaoResponse.conversion_rate[conversao.moedaPara]).toFixed(4));
    // return Number((1 / conversaoResponse.conversion_rate).toFixed(4));
  }
  
  /**
   * Retorna a data da cotação dado uma response.
   *
   * @param ConversaoResponse conversaoResponse
   * @return string
   */
  dataCotacao(conversaoResponse: ConversaoResponse): string {
    if (conversaoResponse === undefined) {
      return '';
    }
    return conversaoResponse.time_last_update_utc;
  }
}