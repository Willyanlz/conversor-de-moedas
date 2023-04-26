import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataBr'
})
export class DataBrPipe implements PipeTransform {

  transform(dataEn: string): string {
    if(!dataEn){
      return "";
    }
    const dataArr = dataEn.split(" ");

    if(dataArr.length !== 6){
      console.log(dataArr);
      return dataEn;
    }
    let mes = dataArr[2]
    switch (mes.toLowerCase()) {
      case "jan":
        mes = "1"
        break;
      case "feb":
        mes = "2"
        break;
      case "mar":
        mes = "3"
        break;
      case "apr":
        mes = "4"
        break;
      case "may":
        mes = "5"
        break;
      case "jun":
        mes = "6"
        break;
      case "jul":
        mes = "7"
        break;
      case "aug":
        mes = "8"
        break;
      case "sep":
        mes = "9"
        break;
      case "oct":
        mes = "10"
        break;
      case "nov":
        mes = "11"
        break;
      case "dec":
        mes = "12"
        break
    }

    if(Number(mes) <= 9){
      mes = "0"+mes
    }

    return dataArr[1] + "/" + mes + "/" + dataArr[3];
  }


}
