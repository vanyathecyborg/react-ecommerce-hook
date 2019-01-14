"use strict";
exports.__esModule = true;
var react_1 = require("react");
var typesafe_actions_1 = require("typesafe-actions");
var actionTypes_1 = require("./actionTypes");
var reducer_1 = require("./reducer");
var storageMethods_1 = require("./storageMethods");
exports.useCart = function () {
    var _a = storageMethods_1.createStorageMethods('cart'), set = _a.set, get = _a.get;
    var initialReducerState = get() || reducer_1.initialState;
    var _b = react_1.useReducer(reducer_1.cartReducer, initialReducerState), state = _b[0], dispatch = _b[1];
    react_1.useEffect(function () {
        set(state);
    }, [state]);
    return {
        state: state,
        addToCart: function (_a) {
            var id = _a.id, _b = _a.isUnique, isUnique = _b === void 0 ? false : _b;
            return dispatch(typesafe_actions_1.action(actionTypes_1.ADD_TO_CART, { id: id, isUnique: isUnique }));
        },
        removeFromCart: function (_a) {
            var id = _a.id;
            return dispatch(typesafe_actions_1.action(actionTypes_1.REMOVE_FROM_CART, { id: id }));
        },
        increaseQuantity: function (_a) {
            var id = _a.id;
            return dispatch(typesafe_actions_1.action(actionTypes_1.INCREASE_QUANTITY, { id: id }));
        },
        decreaseQuantity: function (_a) {
            var id = _a.id;
            var currentQuantity = state.quantityById[id];
            if (currentQuantity === 1) {
                return dispatch(typesafe_actions_1.action(actionTypes_1.REMOVE_FROM_CART, { id: id }));
            }
            return dispatch(typesafe_actions_1.action(actionTypes_1.DECREASE_QUANTITY, { id: id }));
        }
    };
};
