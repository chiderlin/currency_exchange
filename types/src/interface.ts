export interface Rate {
    readonly currencies: {
        [key: string]: srcObjInterface;
    };
}

export interface SrcFormatInterface {
    status: boolean;
    data?: srcObjInterface;
}

export interface srcObjInterface {
    [key: string]: number;
}

export interface rateObjInterface {
    status: boolean;
    rate?: number;
}
