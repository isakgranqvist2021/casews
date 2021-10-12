/** @format */

import { rooms, IRoom } from './rooms';
import WebSocket from 'ws';
import chat from '../models/chat';
import broadcast from './broadcast';

export default async function send(ws: WebSocket, payload: any, b?: boolean) {
	let room = rooms.find((room: IRoom) => room.id === payload.room);
	if (!room) return;

	let clients = room.sockets.map((s: { socket: WebSocket; id: string }) => {
		return s.socket;
	});

	let message = {
		message: payload.message,
		createdAt: new Date(),
		user: payload.user,
		type: 'message',
	};

	await chat.updateOne(
		{ _id: room.id },
		{
			$push: { messages: message },
		}
	);

	return broadcast(clients, JSON.stringify(message));
}
