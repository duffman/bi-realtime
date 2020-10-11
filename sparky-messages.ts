export interface ChatMessage {
	author: string;
	message: string;
	timestamp: number;
}
export namespace MessageTypes {
	export module Session {
		export let Initialize: string = 'init';
	}

	export module User {
		export let SendMessage: string = 'sendMessage';
	}
}
