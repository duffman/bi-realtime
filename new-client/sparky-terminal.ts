/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

import { SocketEvent, SparkEvent } from '../socket-events';
import { SparkSettings } from '../spark.settings';
import { MessageTypes } from '../sparky-messages';
import { Logger } from '../new-backend/src/utils/logger';

const io     = require('socket.io-client');
const url    = `http://localhost:${ SparkSettings.SocketPort }`;
const socket = io.connect(url, { reconnect: true });
const vorpal = require('vorpal')();
const chalk  = require("chalk");

export const PROMPT = "$drakula>";

export enum TerminalMode {
	tmCli     = 1,
	tmMessage = 2,
}

export class SparkyTerminal {
	public mode = TerminalMode.tmCli;

	constructor() {
		this.initialize();
	}

	initialize() {
		socket.on(SocketEvent.DISCONNECT, (socket) => {
			console.log(chalk.red('Disconnected'));
		});

		socket.on(SocketEvent.CONNECT, (socket) => {
			console.log(chalk.green('Connected'));
		});

		socket.on(SparkEvent.MESSAGE, (data) => {
			console.log("Message received", data);
		});

		socket.on(SparkEvent.SEQ_NUM, (data) => {
			//console.log("Sequential received", data);
		});

		vorpal.delimiter(PROMPT).show();

		this.initVorpal();
	}

	private sendRawMessage(data: any) {

		function prettyPrintJson(obj: any): void {
			let output = JSON.stringify(
				obj,
				null,
				4
			);
		}

		let jsonStr = JSON.stringify(data);

		Logger.logGreen("sendRawMessage ::", jsonStr);

		socket.emit(SparkEvent.MESSAGE, jsonStr);
	}

	private sendMessage(type: string, data: any, tag: string = "") {
		let dataObject = {
			"type": type,
			"data": data,
			"tag" : tag,
		};

		let jsonData = JSON.stringify(dataObject, null, 4);

		console.log(chalk.green("Send Message ::"));
		console.log(chalk.orange(jsonData));

		socket.emit(SparkEvent.MESSAGE, jsonData);
	}

	/********************************************************
	 *
	 *    SEND METHODS
	 *
	 ********************************************************/
	private sendAction(type: string, data: any = null) {
		this.sendMessage(type, data);
	}

	private auth() {

	}

	private initSession(uuid: string) {
		let dataPacket = {
			"device": "iPhone6s",
			"uuid"  : uuid,
			data: {

			}
		};

		this.sendMessage(MessageTypes.Session.Initialize, dataPacket, "#GENERATED_TAG#");
	}

	initVorpal() {
		vorpal.command('raw [str]').action((args, callback) => {
			let strArg = args.str != null ? args.str : "";

			let dataPacket = {
				"type": "text",
				"data": strArg
			};

			this.sendRawMessage(dataPacket);

			callback();
		});

		vorpal.command('mess [str]').action((args, callback) => {
			let strArg = args.str != null ? args.str : "";

			let dataPacket = {
				"type": "text",
				"data": strArg
			};

			this.sendAction(MessageTypes.User.SendMessage, dataPacket);

			callback();
		});

		vorpal.command("init [str]").action((args, callback) => {
			console.log('Arg:', args.str);
			let uuid = args.str != null ? args.str : "MrDuffman81";
			console.log("Using UUID:", args.str);

			this.initSession(uuid);
			callback();
		});


		vorpal.command("session [str]").action(function (args, callback) {
			console.log('Arg:', args.str);

			this.sendMessage(MessageTypes.Session.Initialize, null);

			callback();
		});
	}
}

let client = new SparkyTerminal();