/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

import { SocketEvent, SparkEvent } from '../../socket-events';
import { ISocketMessage, SocketMessage } from './core/socket-message';
import { Logger } from './utils/logger';
import { SparkSettings } from '../../spark.settings';

const io = require("socket.io");
//	server = io.listen(8080);

let seqNumberByClient = new Map();

export interface ISparkServer {
}

export class SparkServer implements ISparkServer {
	private static instance: SparkServer;
	private listenPort: number = SparkSettings.SocketPort;

	parseSocketMessage(rawMess: any): ISocketMessage {
		return new SocketMessage(rawMess);
	}

	public initServer() {
		let server = io.listen(this.listenPort);
		//
		// event fired every time a new client connects:
		server.on(SocketEvent.CONNECTION, (socket: any) => {
			console.info(`Client connected [id=${socket.id}]`);
			// initialize this client's sequence number
			seqNumberByClient.set(socket, 1);

			socket.on(SparkEvent.MESSAGE, (rawMess: any) => {
				let mess = this.parseSocketMessage(rawMess);
				Logger.logOut(SparkEvent.MESSAGE, mess);
			});

			socket.on(SparkEvent.SEQ_NUM, (rawMess: any) => {
				let mess = this.parseSocketMessage(rawMess);
				Logger.logOut(SparkEvent.SEQ_NUM, mess);
			});

			// when socket disconnects, remove it from the list:
			socket.on(SocketEvent.DISCONNECT, () => {
				seqNumberByClient.delete(socket);
				console.info(`Client gone [id=${socket.id}]`);
			});
		});

		// FOT TESTING PURPOSES ONLY
		// sends each client its current sequence number
		setInterval(() => {
				for (const [client, sequenceNumber] of seqNumberByClient.entries()) {
					client.emit(SparkEvent.SEQ_NUM, sequenceNumber);
					seqNumberByClient.set(client, sequenceNumber + 1);
				}
			},
			1000
		);

	}

	/**
	 * The static method that controls the access to the singleton instance.
	 *
	 * This implementation let you subclass the Singleton class while keeping
	 * just one instance of each subclass around.
	 */
	public static getInstance(): SparkServer {
		if (!SparkServer.instance) {
			SparkServer.instance = new SparkServer();
		}

		return SparkServer.instance;
	}

	public balle(): void {
		let mess = 'Spark Server :: Ballen studsar på stranden.';
		console.log('Mess ::', mess);
	}
}

let cp = new SparkServer(); // SparkServer.getInstance();
cp.initServer();