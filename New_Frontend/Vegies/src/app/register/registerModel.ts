export class registerModel {
    constructor(
        public userType: number,
        public orgName:string,
        public fullName:string,
        public email:string,
        public mobile:string,
        public password:string,
        public mailVerify:number,
        public mobleVerify:number,
        public loginAttemp:number,    
    ){

    }
}
