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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var runCmd_1 = require("./runCmd");
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
var User = /** @class */ (function () {
    function User(username, domain) {
        this.username = username;
        this.domain = domain;
        this.name = null;
        this.class = null;
        this.ready = false;
    }
    User.prototype.parseData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userData, name, userClass;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, runCmd_1.default)("net", "user ".concat(this.username).concat(this.domain ? " /domain" : ""))];
                    case 1:
                        userData = _a.sent();
                        return [4 /*yield*/, BenutzerName(userData)];
                    case 2:
                        name = _a.sent();
                        return [4 /*yield*/, BenutzerKlasse(userData)];
                    case 3:
                        userClass = _a.sent();
                        this.name = name;
                        this.class = userClass;
                        this.ready = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    return User;
}());
exports.default = User;
function BenutzerKlasse(output) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var queryString, outputLines, userinfo;
        return __generator(this, function (_b) {
            queryString = (_a = process.env.CLASS_QUERY) !== null && _a !== void 0 ? _a : "Globale Gruppenmitgliedschaften";
            outputLines = output.split("\n").map(function (line) { return line.trim(); });
            userinfo = outputLines.find(function (line) { return line.startsWith(queryString); });
            if (!userinfo || userinfo.substring(queryString.length).trim() == process.env.RETURN_NULL_CLASS) {
                return [2 /*return*/, null];
            }
            return [2 /*return*/, userinfo.substring(queryString.length).trim()];
        });
    });
}
function BenutzerName(output) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var queryString, outputLines, userinfo;
        return __generator(this, function (_b) {
            queryString = (_a = process.env.NAME_QUERY) !== null && _a !== void 0 ? _a : "Vollst�ndiger Name";
            outputLines = output.split("\n").map(function (line) { return line.trim(); });
            userinfo = outputLines.find(function (line) { return line.startsWith(queryString); });
            if (!userinfo) {
                return [2 /*return*/, null];
            }
            return [2 /*return*/, userinfo.substring(queryString.length).trim()];
        });
    });
}
