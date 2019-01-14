"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var reducer_1 = require("../src/reducer");
var actions = require("../src/actionTypes");
describe('cart reducer', function () {
    it('should return the initial state', function () {
        expect(reducer_1.cartReducer(undefined, {})).toEqual(reducer_1.initialState);
    });
    it('should add item to cart', function () {
        var createdAction = {
            type: actions.ADD_TO_CART,
            payload: { id: 1 }
        };
        expect(reducer_1.cartReducer(reducer_1.initialState, createdAction)).toEqual(__assign({}, reducer_1.initialState, { addedIds: [1], quantityById: { 1: 1 } }));
    });
    it('should add non-unique item to cart twice', function () {
        var createdAction = {
            type: actions.ADD_TO_CART,
            payload: { id: 1 }
        };
        expect(reducer_1.cartReducer({
            addedIds: [1],
            quantityById: { 1: 1 }
        }, createdAction)).toEqual(__assign({}, reducer_1.initialState, { addedIds: [1], quantityById: { 1: 2 } }));
    });
    it('should add unique item to cart twice', function () {
        var createdAction = {
            type: actions.ADD_TO_CART,
            payload: { id: 1 }
        };
        expect(reducer_1.cartReducer({
            addedIds: [1],
            quantityById: { 1: 1 }
        }, createdAction)).toEqual(__assign({}, reducer_1.initialState, { addedIds: [1], quantityById: { 1: 2 } }));
    });
    it('should remove item from cart', function () {
        var createAction = function (add) {
            if (add === void 0) { add = true; }
            return ({
                type: add ? actions.ADD_TO_CART : actions.REMOVE_FROM_CART,
                payload: { id: 1 }
            });
        };
        var state = reducer_1.cartReducer({
            addedIds: [1],
            quantityById: { 1: 1 }
        }, createAction());
        expect(reducer_1.cartReducer(state, createAction(false))).toEqual(__assign({}, reducer_1.initialState, { addedIds: [], quantityById: {} }));
    });
    it('should increase items quantity, then decrease it', function () {
        var createAction = function (increase) {
            if (increase === void 0) { increase = true; }
            return ({
                type: increase ? actions.INCREASE_QUANTITY : actions.DECREASE_QUANTITY,
                payload: { id: 1 }
            });
        };
        var state = reducer_1.cartReducer({
            addedIds: [1],
            quantityById: { 1: 1 }
        }, createAction()); // { 1: 2 }
        expect(reducer_1.cartReducer(state, createAction(false))).toEqual(__assign({}, reducer_1.initialState, { addedIds: [1], quantityById: { 1: 1 } }));
    });
});
