export interface DruckerDto {
    id: DruckerId;
    name: string;
    ip: string;
    port: number;

    ping: {
        erreichbar: boolean;
        leverage: any;
    };
}
