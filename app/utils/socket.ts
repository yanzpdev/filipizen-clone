'use client';
import io, { Socket } from "socket.io-client";

export const initializeSocket = (uuid: string, onMessage: (message: any) => void): Socket => {
//   const url = process.env.SERVER_URL
  const socket = io('http://localhost:5000', { query: { uuid } });

  socket.on('connect', () => {
    console.log("connected to server");
    console.log("uuid is: ", uuid);
    socket.emit("join", uuid);
  });

  socket.on('message', onMessage);

  socket.on('disconnect', () => console.log("disconnected from server"));
  socket.on('error', (errMsg) => console.error("socket error:", errMsg));

  return socket;
};
