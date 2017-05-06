var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
var app;
(function (app) {
    var services;
    (function (services) {
        var AppHttpService = (function () {
            function AppHttpService($http) {
                this.$http = $http;
            }
            AppHttpService.prototype.deletePoll = function (pollId, pollUserName) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        this.$http.delete("api/poll/delete/" + pollId + "?user=" + pollUserName);
                        return [2 /*return*/];
                    });
                });
            };
            AppHttpService.prototype.getUserIp = function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, this.$http.get("/api/user/ip")
                                .then(function (response) {
                                return response.data;
                            })];
                    });
                });
            };
            AppHttpService.prototype.getAllPolls = function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, this.$http.get("/api/poll/total")
                                .then(function (response) {
                                return response.data;
                            })];
                    });
                });
            };
            AppHttpService.prototype.getPoll = function (routeParam) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, this.$http.get("/api/poll/" + routeParam)
                                .then(function (response) {
                                return response.data;
                            })];
                    });
                });
            };
            AppHttpService.prototype.checkOwner = function (pollUserName) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, this.$http.get("/api/user/" + pollUserName)
                                .then(function (response) {
                                var json = response.data;
                                //If the api responds with an object that has isOwner prop set to true,
                                //we know that the user viewing this poll is the owner
                                if (json.isOwner) {
                                    return true;
                                }
                                return false;
                            })];
                    });
                });
            };
            AppHttpService.prototype.checkAuthorized = function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, this.$http.get("/api/user/auth")
                                .then(function (response) {
                                var authResponse = response.data;
                                if (authResponse.isAuthenticated === true) {
                                    return true;
                                }
                                return false;
                            })];
                    });
                });
            };
            AppHttpService.prototype.castVote = function (vote, pollId) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.$http.put("/api/poll/vote", {
                                    "name": vote.name,
                                    "voteCount": vote.voteCount,
                                    "pollId": pollId
                                })];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            };
            AppHttpService.prototype.createNewVoteOption = function (voteOption) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.$http.put("api/poll/vote/new", voteOption)];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            };
            AppHttpService.prototype.getUserPolls = function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, this.$http.get("/api/poll/userpolls")
                                .then(function (response) {
                                return response.data;
                            })];
                    });
                });
            };
            AppHttpService.prototype.createNewPoll = function (newPoll) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.$http.post("/api/poll/new", newPoll)];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            };
            return AppHttpService;
        }());
        AppHttpService.$inject = ["$http"];
        services.AppHttpService = AppHttpService;
        angular.module("VotingApp").service("AppHttpService", AppHttpService);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
//# sourceMappingURL=AppHttpService.js.map