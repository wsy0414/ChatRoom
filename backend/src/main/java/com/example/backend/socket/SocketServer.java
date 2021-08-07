package com.example.backend.socket;

import java.util.concurrent.CopyOnWriteArrayList;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import com.example.backend.model.ChatMessage;

import org.springframework.stereotype.Component;

@ServerEndpoint("/ws")
@Component
public class SocketServer {
    private static CopyOnWriteArrayList<Session> sessionList = new CopyOnWriteArrayList<>();
    
    @OnOpen
	public void onOpen(Session session) throws Exception {
		sessionList.add(session); 

		System.out.println("new connection!!");
    }

    @OnClose
    public void onClose(Session session) throws Exception {
        sessionList.remove(session);

        System.out.println("disconnection 1");
    }

    @OnMessage
    public void OnMessage(String message, Session session) throws Exception {
        sendMessage(session, message);
    }

    @OnError
    public void onError(Session session, Throwable error) {
        System.out.println(error.getMessage());
    }

    private static void sendMessage(Session session, String message) {
        try {
            for(Session target: sessionList){
                if(target.equals(session)){
                    continue;
                }
                target.getBasicRemote().sendText(message);
            }
        } catch (Exception e) {
            //TODO: handle exception
            e.printStackTrace();
        }
    }

}
