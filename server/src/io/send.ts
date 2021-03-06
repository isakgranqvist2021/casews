/** @format */

import { rooms } from './store';
import { IMessage, IRoom } from 'types';
import WebSocket from 'ws';
import chat from '../models/chat';
import broadcast from './broadcast';

export default async function send(ws: WebSocket, payload: any, b?: boolean) {
	let room = rooms.find((room: IRoom) => room.id === payload.room);
	if (!room) return;

	let message: IMessage = {
		message: payload.message,
		createdAt: new Date(),
		user: payload.user,
		type: 'message',
	};

	await chat.updateOne(
		{ _id: payload.room },
		{
			$push: { messages: message },
		}
	);

	return broadcast(room, message);
}
