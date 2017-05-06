var __awaiter=this&&this.__awaiter||function(t,e,r,i){return new(r||(r=Promise))(function(o,s){function n(t){try{h(i.next(t))}catch(t){s(t)}}function a(t){try{h(i.throw(t))}catch(t){s(t)}}function h(t){t.done?o(t.value):new r(function(e){e(t.value)}).then(n,a)}h((i=i.apply(t,e||[])).next())})},__generator=this&&this.__generator||function(t,e){function r(t){return function(e){return i([t,e])}}function i(r){if(o)throw new TypeError("Generator is already executing.");for(;a;)try{if(o=1,s&&(n=s[2&r[0]?"return":r[0]?"throw":"next"])&&!(n=n.call(s,r[1])).done)return n;switch(s=0,n&&(r=[0,n.value]),r[0]){case 0:case 1:n=r;break;case 4:return a.label++,{value:r[1],done:!1};case 5:a.label++,s=r[1],r=[0];continue;case 7:r=a.ops.pop(),a.trys.pop();continue;default:if(n=a.trys,!(n=n.length>0&&n[n.length-1])&&(6===r[0]||2===r[0])){a=0;continue}if(3===r[0]&&(!n||r[1]>n[0]&&r[1]<n[3])){a.label=r[1];break}if(6===r[0]&&a.label<n[1]){a.label=n[1],n=r;break}if(n&&a.label<n[2]){a.label=n[2],a.ops.push(r);break}n[2]&&a.ops.pop(),a.trys.pop();continue}r=e.call(t,a)}catch(t){r=[6,t],s=0}finally{o=n=0}if(5&r[0])throw r[1];return{value:r[0]?r[1]:void 0,done:!0}}var o,s,n,a={label:0,sent:function(){if(1&n[0])throw n[1];return n[1]},trys:[],ops:[]};return{next:r(0),throw:r(1),return:r(2)}},app;!function(t){!function(t){var e=function(){function t(t,e,r,i,o,s,n){this.$routeParams=t,this.$scope=e,this.$location=r,this.IpService=i,this.parser=o,this.http=s,this.googleCharts=n,this.isBusy=!1,this.isOwner=!1,this.isAuthorized=!1,this.showConfirmOverlay=!1,this.newVoteOptionName=""}return t.$inject=["$routeParams","$scope","$location","IpService","FormParseService","AppHttpService","GoogleChartsParseService"],t.prototype.showOverlay=function(){this.showConfirmOverlay=!0},t.prototype.hideOverlay=function(){this.showConfirmOverlay=!1},t.prototype.deletePoll=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){switch(t.label){case 0:return this.isBusy=!0,[4,this.http.deletePoll(this.pollView.id,this.pollView.userName)];case 1:return t.sent(),this.isBusy=!1,this.$location.path("/#!/polls"),[2]}})})},t.prototype.getUserIp=function(){return __awaiter(this,void 0,void 0,function(){var t;return __generator(this,function(e){switch(e.label){case 0:return t=this,[4,this.http.getUserIp()];case 1:return t.userIp=e.sent(),[2]}})})},t.prototype.getPoll=function(){return __awaiter(this,void 0,void 0,function(){var t,e,r,i=this;return __generator(this,function(o){switch(o.label){case 0:return this.isBusy=!0,[4,this.http.getPoll(this.$routeParams.userId)];case 1:return t=o.sent(),[4,this.http.checkOwner(t.userName)];case 2:return e=o.sent(),[4,this.http.checkAuthorized()];case 3:return r=o.sent(),this.drawGoogleChart(t),this.$scope.$apply(function(){i.pollView=t,i.isOwner=e,i.isAuthorized=r,i.isBusy=!1}),[2]}})})},t.prototype.castVote=function(t){return __awaiter(this,void 0,void 0,function(){var e=this;return __generator(this,function(r){switch(r.label){case 0:return this.IpService.checkIp(this.pollView.adresses,this.userIp.adress)?(t.voteCount++,this.pollView.adresses.push(this.userIp),this.isBusy=!0,[4,this.http.castVote(t,this.pollView.id)]):[3,2];case 1:return r.sent(),this.$scope.$apply(function(){e.drawGoogleChart(e.pollView),e.isBusy=!1}),[3,3];case 2:alert("You have already voted on this poll!"),r.label=3;case 3:return[2]}})})},t.prototype.createNewVoteOption=function(){return __awaiter(this,void 0,void 0,function(){var t,e=this;return __generator(this,function(r){switch(r.label){case 0:return t={name:this.newVoteOptionName,voteCount:0,pollId:this.pollView.id},!1===this.parser.validateFormInput(this.newVoteOptionName,this.pollView)?(alert("that vote option already exists!"),[2]):this.IpService.checkIp(this.pollView.adresses,this.userIp.adress)?(this.isBusy=!0,[4,this.http.createNewVoteOption(t)]):[3,2];case 1:return r.sent(),t.voteCount++,this.pollView.adresses.push(this.userIp),this.pollView.votes.push(t),this.drawGoogleChart(this.pollView),this.$scope.$apply(function(){e.isBusy=!1,e.newVoteOptionName=""}),[3,3];case 2:alert("You have voted on this poll already!"),r.label=3;case 3:return[2]}})})},t.prototype.drawGoogleChart=function(t){var e={};e.type="PieChart",e.data=this.googleCharts.convertToChart(t),e.options={chartArea:{left:0,top:0,width:"100%",height:"100%"},fontSize:25,vAxis:{textStyle:{fontSize:5}},height:250,backgroundColor:"#f1f1f1",is3D:!0},this.pollChart=e},t}();e.$inject=["$routeParams","$scope","$location","IpService","FormParseService","AppHttpService","GoogleChartsParseService"],t.PollController=e,angular.module("VotingApp").controller("PollController",e)}(t.controllers||(t.controllers={}))}(app||(app={}));