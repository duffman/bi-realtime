/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

let io = require('socket.io-client');
let url = 'http://localhost:8080';
let socket = io.connect(url, {reconnect: true});

export class SimpleClient {
	//client: SocketIOClient;

	constructor() {


		const io = require("socket.io-client");

		const socket = io("ws://example.com/my-namespace", {
/*			reconnectionDelayMax: 10000,
			query: {
				auth: "123"
			}
*/
		});


	}



}

let cli = new SimpleClient();