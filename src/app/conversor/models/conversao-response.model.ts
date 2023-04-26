export class ConversaoResponse{
    constructor(
        public base_code: string,
        public target_code: string,
        public time_last_update_utc: string,
        public conversion_rate: number
    ){}
    // {"base_code": "EUR", "target_code": "GBP", "time_last_update_utc": "Fri, 27 Mar 2020 00:00:00 +0000"}
}

//  API NÃO FUNCIONAL

// export class ConversaoResponse {

// 	constructor(
// 		public base: string,
// 		public date: string,
// 		public rates: any) {}
// }

//{"base":"USD","date":"2017-03-08","rates":{"BRL":3.1405}}
