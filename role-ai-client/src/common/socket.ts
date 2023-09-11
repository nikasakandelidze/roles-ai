import { Socket, io } from "socket.io-client";

const URL: string = "http://localhost:3001";

export const socket: Socket = io(URL);
console.log(socket);
