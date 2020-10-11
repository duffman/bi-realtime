"use strict";
/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var socket_events_1 = require("../socket-events");
var spark_settings_1 = require("../spark.settings");
var sparky_messages_1 = require("../sparky-messages");
var logger_1 = require("../new-backend/src/utils/logger");
var io = require('socket.io-client');
var url = "http://localhost:" + spark_settings_1.SparkSettings.SocketPort;
var socket = io.connect(url, { reconnect: true });
var vorpal = require('vorpal')();
var chalk = require("chalk");
exports.PROMPT = "$drakula>";
var TerminalMode;
(function (TerminalMode) {
    TerminalMode[TerminalMode["tmCli"] = 1] = "tmCli";
    TerminalMode[TerminalMode["tmMessage"] = 2] = "tmMessage";
})(TerminalMode = exports.TerminalMode || (exports.TerminalMode = {}));
var SparkyTerminal = /** @class */ (function () {
    function SparkyTerminal() {
        this.mode = TerminalMode.tmCli;
        this.initialize();
    }
    SparkyTerminal.prototype.initialize = function () {
        socket.on(socket_events_1.SocketEvent.DISCONNECT, function (socket) {
            console.log(chalk.red('Disconnected'));
        });
        socket.on(socket_events_1.SocketEvent.CONNECT, function (socket) {
            console.log(chalk.green('Connected'));
        });
        socket.on(socket_events_1.SparkEvent.MESSAGE, function (data) {
            console.log("Message received", data);
        });
        socket.on(socket_events_1.SparkEvent.SEQ_NUM, function (data) {
            //console.log("Sequential received", data);
        });
        vorpal.delimiter(exports.PROMPT).show();
        this.initVorpal();
    };
    SparkyTerminal.prototype.sendRawMessage = function (data) {
        function prettyPrintJson(obj) {
            var output = JSON.stringify(obj, null, 4);
        }
        var jsonStr = JSON.stringify(data);
        logger_1.Logger.logGreen("sendRawMessage ::", jsonStr);
        socket.emit(socket_events_1.SparkEvent.MESSAGE, jsonStr);
    };
    SparkyTerminal.prototype.sendMessage = function (type, data, tag) {
        if (tag === void 0) { tag = ""; }
        var dataObject = {
            "type": type,
            "data": data,
            "tag": tag
        };
        var jsonData = JSON.stringify(dataObject, null, 4);
        console.log(chalk.green("Send Message ::"));
        console.log(chalk.orange(jsonData));
        socket.emit(socket_events_1.SparkEvent.MESSAGE, jsonData);
    };
    /********************************************************
     *
     *    SEND METHODS
     *
     ********************************************************/
    SparkyTerminal.prototype.sendAction = function (type, data) {
        if (data === void 0) { data = null; }
        this.sendMessage(type, data);
    };
    SparkyTerminal.prototype.initSession = function (uuid) {
        var dataPacket = {
            "device": "iPhone6s",
            "uuid": uuid,
            data: {}
        };
        this.sendMessage(sparky_messages_1.MessageTypes.Session.Initialize, dataPacket, "#GENERATED_TAG#");
    };
    SparkyTerminal.prototype.initVorpal = function () {
        var _this = this;
        vorpal.command('raw [str]').action(function (args, callback) {
            var strArg = args.str != null ? args.str : "";
            var dataPacket = {
                "type": "text",
                "data": strArg
            };
            _this.sendRawMessage(dataPacket);
            callback();
        });
        vorpal.command('mess [str]').action(function (args, callback) {
            var strArg = args.str != null ? args.str : "";
            var dataPacket = {
                "type": "text",
                "data": strArg
            };
            _this.sendAction(sparky_messages_1.MessageTypes.User.SendMessage, dataPacket);
            callback();
        });
        vorpal.command("init [str]").action(function (args, callback) {
            console.log('Arg:', args.str);
            var uuid = args.str != null ? args.str : "MrDuffman81";
            console.log("Using UUID:", args.str);
            _this.initSession(uuid);
            callback();
        });
        vorpal.command("session [str]").action(function (args, callback) {
            console.log('Arg:', args.str);
            this.sendMessage(sparky_messages_1.MessageTypes.Session.Initialize, null);
            callback();
        });
    };
    return SparkyTerminal;
}());
exports.SparkyTerminal = SparkyTerminal;
var miles = 18;
var calculateFeet = function (miles) { return miles * 5280; };
console.log(chalk(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\tThere are {bold 5280 feet} in a mile.\n\tIn {bold ", " miles}, there are {green.bold ", " feet}.\n"], ["\n\tThere are {bold 5280 feet} in a mile.\n\tIn {bold ", " miles}, there are {green.bold ", " feet}.\n"])), miles, calculateFeet(miles)));
console.log(chalk.hex('#DEADED').underline('Hello, world!'));
var client = new SparkyTerminal();
var templateObject_1;
