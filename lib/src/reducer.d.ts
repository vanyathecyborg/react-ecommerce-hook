export declare const initialState: {
    addedIds: any[];
    quantityById: {};
};
declare type TypeAddedIds = number[];
interface IQuantityById {
    [key: string]: number;
}
interface IStateType {
    addedIds: TypeAddedIds;
    quantityById: IQuantityById;
}
export declare const cartReducer: (state: {
    addedIds: any[];
    quantityById: {};
}, action: any) => IStateType;
export {};
