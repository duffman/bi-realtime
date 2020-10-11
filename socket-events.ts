/**
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: January 2020
 */


export interface ISparkModule {
	compile(): string;
}

export class SparkType extends Array<string> {}


export module Database {
	export module Database {

	}
}

// Custom Events
export enum SparkEvent {
	MESSAGE  = 'message',
	DB       = 'db',
	SEQ_NUM  = "seq-num",
}

// Sub messages
export enum DbSubEvent {
	SUBSCRIBE   = 'list',
	UNSUBSCRIBE = 'unsub',
}

// Sub messages
export enum SubEvent {
	SUBSCRIBE   = 'sub',
	UNSUBSCRIBE = 'unsub',
}


// Reserved System Events
export enum SocketEvent {
	CONNECT           = 'connect',
	CONNECTION        = 'connection',
	CONNECT_ERROR     = 'connect_error',
	CONNECT_TIMEOUT   = 'connect_timeout',
	ERROR             = 'error',
	DISCONNECT        = 'disconnect',
	DISCONNECTING     = 'disconnecting',
	NEW_LISTENER      = 'newListener',
	RECONNECT_ATTEMPT = 'reconnect_attempt',
	RECONNECTING      = 'reconnecting',
	RECONNECT_ERROR   = 'reconnect_error',
	RECONNECT_FAILED  = 'reconnect_failed',
	REMOVE_LISTENER   = 'removeListener',
	PING              = 'ping',
	PONG              = 'pong'
}
