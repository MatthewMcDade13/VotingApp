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
    var controllers;
    (function (controllers) {
        var PollController = (function () {
            function PollController($routeParams, $scope, $location, IpService, FormParseService, AppHttpService, GoogleChartsParseService) {
                this.$routeParams = $routeParams;
                this.$scope = $scope;
                this.$location = $location;
                this.IpService = IpService;
                this.parser = FormParseService;
                this.http = AppHttpService;
                this.googleCharts = GoogleChartsParseService;
                this.isBusy = false;
                this.isOwner = false;
                this.isAuthorized = false;
                this.showConfirmOverlay = false;
                this.newVoteOptionName = "";
            }
            PollController.prototype.showOverlay = function () {
                this.showConfirmOverlay = true;
            };
            PollController.prototype.hideOverlay = function () {
                this.showConfirmOverlay = false;
            };
            PollController.prototype.deletePoll = function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                this.isBusy = true;
                                return [4 /*yield*/, this.http.deletePoll(this.pollView.id, this.pollView.userName)];
                            case 1:
                                _a.sent();
                                this.isBusy = false;
                                this.$location.path("/#!/polls");
                                return [2 /*return*/];
                        }
                    });
                });
            };
            PollController.prototype.getUserIp = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = this;
                                return [4 /*yield*/, this.http.getUserIp()];
                            case 1:
                                _a.userIp = _b.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            };
            PollController.prototype.getPoll = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var _this = this;
                    var pollResponse, ownerResponse, authResponse;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                this.isBusy = true;
                                return [4 /*yield*/, this.http.getPoll(this.$routeParams.userId)];
                            case 1:
                                pollResponse = _a.sent();
                                return [4 /*yield*/, this.http.checkOwner(pollResponse.userName)];
                            case 2:
                                ownerResponse = _a.sent();
                                return [4 /*yield*/, this.http.checkAuthorized()];
                            case 3:
                                authResponse = _a.sent();
                                this.drawGoogleChart(pollResponse);
                                this.$scope.$apply(function () {
                                    _this.pollView = pollResponse;
                                    _this.isOwner = ownerResponse;
                                    _this.isAuthorized = authResponse;
                                    _this.isBusy = false;
                                });
                                return [2 /*return*/];
                        }
                    });
                });
            };
            //Func that checks if current user has voted on this poll already
            //and if not, casts vote and posts to database.
            PollController.prototype.castVote = function (vote) {
                return __awaiter(this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!this.IpService.checkIp(this.pollView.adresses, this.userIp.adress)) return [3 /*break*/, 2];
                                //Cast vote
                                vote.voteCount++;
                                this.pollView.adresses.push(this.userIp);
                                this.isBusy = true;
                                return [4 /*yield*/, this.http.castVote(vote, this.pollView.id)];
                            case 1:
                                _a.sent();
                                this.$scope.$apply(function () {
                                    _this.drawGoogleChart(_this.pollView);
                                    _this.isBusy = false;
                                });
                                return [3 /*break*/, 3];
                            case 2:
                                //TODO: Remove this and put in some text into the 
                                //HTML doc to notify user they cannot vote on this poll
                                alert("You have already voted on this poll!");
                                _a.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            };
            PollController.prototype.createNewVoteOption = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var _this = this;
                    var voteOption;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                voteOption = {
                                    "name": this.newVoteOptionName,
                                    "voteCount": 0,
                                    "pollId": this.pollView.id
                                };
                                //If the name of the new vote option the user entered already exists, tell them so
                                //and dont allow them to create a new one
                                if (this.parser.validateFormInput(this.newVoteOptionName, this.pollView) === false) {
                                    //TODO: Put this alert in the HTML as a warning text
                                    alert("that vote option already exists!");
                                    return [2 /*return*/];
                                }
                                if (!this.IpService.checkIp(this.pollView.adresses, this.userIp.adress)) return [3 /*break*/, 2];
                                this.isBusy = true;
                                return [4 /*yield*/, this.http.createNewVoteOption(voteOption)];
                            case 1:
                                _a.sent();
                                //Update client so we dont have to run to server for accurate data
                                voteOption.voteCount++;
                                this.pollView.adresses.push(this.userIp);
                                this.pollView.votes.push(voteOption);
                                this.drawGoogleChart(this.pollView);
                                this.$scope.$apply(function () {
                                    _this.isBusy = false;
                                    _this.newVoteOptionName = "";
                                });
                                return [3 /*break*/, 3];
                            case 2:
                                //TODO: Put this alert in the HTML as a warning text
                                alert("You have voted on this poll already!");
                                _a.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            };
            PollController.prototype.drawGoogleChart = function (poll) {
                var chart = {};
                chart.type = "PieChart";
                chart.data = this.googleCharts.convertToChart(poll);
                chart.options = {
                    chartArea: { left: 0, top: 0, width: "100%", height: "100%" },
                    fontSize: 25,
                    vAxis: { textStyle: { fontSize: 5 } },
                    height: 250,
                    backgroundColor: "#f1f1f1",
                    is3D: true
                };
                this.pollChart = chart;
            };
            return PollController;
        }());
        PollController.$inject = ["$routeParams", "$scope", "$location", "IpService", "FormParseService", "AppHttpService", "GoogleChartsParseService"];
        controllers.PollController = PollController;
        angular.module("VotingApp").controller("PollController", PollController);
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
//# sourceMappingURL=PollController.js.map