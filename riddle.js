"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var prompts_1 = require("prompts");
function TwelveBallRiddle(random, index) {
    var scaleUse = 0;
    var weights = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    weights[index ? index : Math.floor(Math.random() * 12)] = random ? random : Math.random() * 2;
    // weights[0] = Math.random() * 2;
    console.log(weights.join(', '));
    function sumValue(arrayGroup) {
        return arrayGroup.reduce(function (sum, num) { return sum + num; });
    }
    // 0 for balance, 1 for testGroup heavier, and -1 if compareGroup lighter
    function UseScaleBalance(testGroup, compareGroup) {
        scaleUse++;
        if (scaleUse > 3) {
            console.error('You already exceed use scale');
            throw 'U failed';
        }
        var val = sumValue(testGroup) - sumValue(compareGroup);
        console.log('Scale  use %s times, for  %s, %s', scaleUse, testGroup, compareGroup);
        return val > 0 ? 1 : val == 0 ? 0 : -1;
    }
    function comparingIfTestGroupHeavier(compareFunction, balanceBall, ball, unbalanceBall) {
        var val4 = compareFunction([balanceBall[0]], [balanceBall[1]]);
        if (val4 == 1) {
            ball = balanceBall[0];
        }
        else if (val4 == 0) {
            ball = unbalanceBall[0];
        }
        else {
            ball = balanceBall[1];
        }
        return ball;
    }
    function comparingIfTestGroupLighter(compareFunction, balanceBall, ball, unbalanceBall) {
        var val4 = compareFunction([balanceBall[0]], [balanceBall[1]]);
        if (val4 == -1) {
            ball = balanceBall[0];
        }
        else if (val4 == 0) {
            ball = unbalanceBall[0];
        }
        else {
            ball = balanceBall[1];
        }
        return ball;
    }
    var group1 = weights.slice(0, 4);
    var group2 = weights.slice(4, 8);
    var group3 = weights.slice(8, 12);
    var ball = 'unknown';
    var group1_1 = group1.slice(0, 2);
    var group1_2 = group1.slice(2, 4);
    var group2_1 = group2.slice(0, 2);
    var group2_2 = group2.slice(2, 4);
    function twoBallComparison(groupTest, compareBall) {
        var val3 = UseScaleBalance(groupTest.slice(0, 1), compareBall);
        if (val3 != 0) {
            ball = groupTest[0];
        }
        else {
            ball = groupTest[1];
        }
    }
    switch (UseScaleBalance(group1, group2)) {
        case 1: {
            var groupTest1 = __spreadArrays(group2_1, group1_1);
            var groupTest2 = __spreadArrays([group2_2[0], group1_2[0]], group3.slice(0, 2));
            var groupTest3 = [group2_2[1], group1_2[1]];
            var val2 = UseScaleBalance(groupTest1, groupTest2);
            switch (val2) {
                case 0: {
                    twoBallComparison(groupTest3, groupTest1.slice(0, 1));
                    break;
                }
                case -1: {
                    ball = comparingIfTestGroupLighter(UseScaleBalance, group2_1, ball, group1_2);
                    break;
                }
                case 1: {
                    ball = comparingIfTestGroupHeavier(UseScaleBalance, group1_1, ball, group2_2);
                    break;
                }
            }
            break;
        }
        case -1: {
            var groupTest1 = __spreadArrays(group2_1, group1_1);
            var groupTest2 = __spreadArrays([group2_2[0], group1_2[0]], group3.slice(0, 2));
            var groupTest3 = [group2_2[1], group1_2[1]];
            var val2 = UseScaleBalance(groupTest1, groupTest2);
            switch (val2) {
                case 0: {
                    twoBallComparison(groupTest3, groupTest1.slice(0, 1));
                    break;
                }
                case 1: {
                    ball = comparingIfTestGroupHeavier(UseScaleBalance, group2_1, ball, group1_2);
                    break;
                }
                case -1: {
                    ball = comparingIfTestGroupLighter(UseScaleBalance, group1_1, ball, group2_2);
                    break;
                }
            }
            break;
        }
        case 0: {
            var group3_1 = group3.slice(0, 2);
            var group3_2 = group3.slice(2, 4);
            var val = UseScaleBalance(group3_1, group2.slice(0, 2));
            if (val != 0) {
                twoBallComparison(group3_1, group2.slice(0, 1));
            }
            else {
                twoBallComparison(group3_2, group2.slice(0, 1));
            }
            break;
        }
    }
    if (ball == 1) {
        console.error('error', weights.join(', '));
        return false;
    }
    if (ball > 1) {
        console.log('heavier ball at location %s with weight %s', weights.indexOf(ball), ball);
    }
    else {
        console.log('lighter at location %s with weight %s', weights.indexOf(ball), ball);
    }
    return true;
}
function input() {
    var _this = this;
    (function () { return __awaiter(_this, void 0, void 0, function () {
        var response, response2, i, tryAgain, testCount;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prompts_1.prompt({
                        type: 'text',
                        name: 'value',
                        message: 'Do you want to test manually y/n'
                    })];
                case 1:
                    response = _a.sent();
                    if (!(response['value'] == 'y')) return [3 /*break*/, 3];
                    return [4 /*yield*/, prompts_1.prompt({
                            type: 'number',
                            name: 'value',
                            message: 'Type a value yo place the value in ball set'
                        })];
                case 2:
                    response2 = _a.sent();
                    for (i = 12; i > 0; i--) {
                        TwelveBallRiddle(response2['value'], i);
                    }
                    console.log('success');
                    return [3 /*break*/, 4];
                case 3:
                    if (response['value'] == 'n') {
                        tryAgain = true;
                        testCount = 0;
                        while (tryAgain) {
                            console.log('-------------------------------------------------------');
                            tryAgain = TwelveBallRiddle();
                            if (testCount > 1000) {
                                console.log('You already test it 1000 times');
                                tryAgain = false;
                            }
                            testCount++;
                            console.log('--------------------------------------------------------');
                        }
                    }
                    else {
                        input();
                    }
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    }); })();
}
input();
