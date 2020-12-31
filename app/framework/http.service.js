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
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
var HttpService = (function () {
    function HttpService(http) {
        this.http = http;
    }
    HttpService.prototype.doGet = function (url) {
        return this.http.get(url).map(function (res) { return res; });
    };
    HttpService.prototype.doPost = function (url, j) {
        var params = JSON.stringify(j);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(url, params, { headers: headers }).map(function (res) { return res; });
    };
    HttpService.prototype.doPut = function (url, j) {
        var params = JSON.stringify(j);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put(url, params, { headers: headers }).map(function (res) { return res; });
    };
    HttpService.prototype.doDelete = function (url) {
        return this.http.delete(url).map(function (res) { return res; });
    };
    HttpService.prototype.upload = function (url, files) {
        var fd = new FormData();
        fd.append("uploadedFile", files);
        return this.http.post(url, fd).map(function (res) { return res.json(); });
    };
    HttpService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], HttpService);
    return HttpService;
}());
exports.HttpService = HttpService;
//# sourceMappingURL=http.service.js.map