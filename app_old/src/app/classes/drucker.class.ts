export class Drucker {
    id: number;
    name: string;
    ip: string;
    port: any;
    mac: any;

    ping: any = {
        erreichbar: false,
        leverage: null
    };

    constructor(){
        
    }
}