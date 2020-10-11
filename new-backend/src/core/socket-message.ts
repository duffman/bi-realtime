/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

export interface ISocketMessage {
	jsonObj: any;
}

export class SocketMessage implements ISocketMessage {
	public jsonObj: any = {};

	constructor(mess?: any) {
		if (mess) {
			this.parse(mess);
		}
	}

	parse(mess: any): void {
		try {
			this.jsonObj = JSON.parse(mess);
		} catch (ex) {
			this.jsonObj = {};
		}
	}
}
