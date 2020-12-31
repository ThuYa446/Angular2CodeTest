"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var core_2 = require('@angular/core');
var router_1 = require('@angular/router');
var entity_service_1 = require('./framework/entity.service');
var http_service_1 = require('./framework/http.service');
core_2.enableProdMode();
var AppRootComponent = (function () {
    function AppRootComponent(entity, http, title, router) {
        var _this = this;
        this.entity = entity;
        this.http = http;
        this.title = title;
        this.router = router;
        this._mflag = false;
        this._snack = { 'flag': true, 'msg': '', type: '' };
        entity.rpbean$.subscribe(function (x) {
            if (x.t1 != null && x.t1 === 'custom-loading-off') {
                _this._mflag = true;
                jQuery('#loading').modal('hide');
            }
            else if (x.t1 != null && x.t1 === 'custom-loading') {
                _this._mflag = false;
                jQuery('#loading').modal({ backdrop: 'static' });
            }
            else if (x.t1 != null && x.t1 == 'custom-msg') {
                _this._snack = { 'flag': false, 'msg': x.t2, 'type': x.t3 };
                jQuery('#customMsgPopupSize').attr('class', 'modal-dialog modal-lg');
                jQuery('#customMsgPopup').modal();
            }
            else if (x.t1 != null && x.t1 == 'custom-msg-off') {
                _this._snack = { 'flag': true, 'msg': '', 'type': '' };
                jQuery('#customMsgPopup').modal('hide');
            }
        });
        this.init();
    }
    AppRootComponent.prototype.init = function () {
        var _this = this;
        this.http.doGet('json/config.json').subscribe(function (data) {
            var json = data.json();
            _this.entity.appname = json.appname;
            _this.entity.title = json.title;
            _this.title.setTitle(_this.entity.title);
            _this.entity.apiurl = json.apiurl;
        }, function (error) { window.alert(error.type); });
    };
    AppRootComponent.prototype.ngOnInit = function () {
        this.router.navigate(['/customers']);
    };
    AppRootComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            template: "\n    <div class='modal' [hidden]='mflag' id=\"loading\">\n        <div class=\"loader\"></div>\n    </div>   \n    <router-outlet></router-outlet>\n    <div id=\"customMsgPopup\" class=\"modal fade clearfix\" role=\"dialog\"  aria-labelledby=\"exampleModalLabel\"\n    aria-hidden=\"true\" tabindex=\"-1\">\n      <div id=\"customMsgPopupSize\" class=\"modal-dialog modal-lg\" style=\"width:30%;\" role=\"document\">  \n        <div class=\"modal-content\">\n          <div class=\"modal-header\" [class.info-color]='_snack.type==\"Information\"' \n                                    [class.danger-color]='_snack.type==\"Error\"'  \n                                    [class.warning-color]='_snack.type==\"Warning\"'\n                                    [class.success-color]='_snack.type==\"Success\"'>\n            \n            <h4 class=\"modal-title w-100 font-weight-bold white-text\">{{_snack.type}}</h4>\n            <button type=\"button\" class=\"close white-text\" data-dismiss=\"modal\" aria-label=\"Close\">\n                <span aria-hidden=\"true\">&times;</span>\n            </button>\n          </div>\n          <div id=\"rootpopupbodytest\" class=\"modal-body\" >\n            <strong style=\"font-size:20px; font-family:sans-serif;\">{{_snack.msg}}</strong>\n          </div>\n          <div class=\"modal-footer\" >\n            <button type=\"button\" class=\"btn btn-primary waves-effect\" data-dismiss=\"modal\">Close</button>\n          </div>\n        </div>\n      </div>\n    </div>\n    "
        }), 
        __metadata('design:paramtypes', [entity_service_1.EntityService, http_service_1.HttpService, platform_browser_1.Title, router_1.Router])
    ], AppRootComponent);
    return AppRootComponent;
}());
exports.AppRootComponent = AppRootComponent;
//# sourceMappingURL=root.component.js.map