export interface IDrucker {
    id: number;
    name: string;
    ip: string;
    port: number;

    ping: {
        erreichbar: boolean;
        leverage: any;
    };
}
