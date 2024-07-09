//package com.samsam.info_final.chatcontroller;
//
//import java.util.Scanner;
//import java.util.concurrent.ExecutionException;
//
//import org.springframework.messaging.simp.stomp.StompHeaders;
//import org.springframework.messaging.simp.stomp.StompSession;
//import org.springframework.messaging.simp.stomp.StompSessionHandlerAdapter;
//import org.springframework.web.socket.WebSocketHttpHeaders;
//import org.springframework.web.socket.messaging.WebSocketStompClient;
//
//import lombok.extern.slf4j.Slf4j;
//
//@Slf4j
//public class StompClientTest {
//
//    public static void main(String[] args) throws ExecutionException, InterruptedException {
//        StompChatClient client = new StompChatClient("ws://localhost:8088/stomp/chat", "/sub/chat/1");
//        client.connect();
//
//        Scanner scanner = new Scanner(System.in);
//
//        while (true) {
//            System.out.print("Enter message (roomId:message): ");
//            String line = scanner.nextLine().trim();
//
//            if (line.equalsIgnoreCase("exit")) {
//                client.disconnect();
//                break;
//            }
//
//            try {
//                String[] commands = line.split(":");
//                Integer roomId = Integer.parseInt(commands[0]);
//                String message = commands[1];
//
//                client.send(new ChatMessage(roomId, message));
//            } catch (Exception e) {
//                log.error("Error sending message", e);
//            }
//        }
//
//        log.info("Exiting StompClientTest");
//    }
//
//    private static class StompChatClient extends StompSessionHandlerAdapter {
//        private final String url;
//        private final String subscribe;
//        private StompSession session;
//
//        public StompChatClient(String url, String subscribe) {
//            this.url = url;
//            this.subscribe = subscribe;
//        }
//
//        public void connect() {
//            WebSocketHttpHeaders httpHeaders = new WebSocketHttpHeaders();
//            StompHeaders stompHeaders = new StompHeaders();
//            stompHeaders.add("auth-token", "spring-chat-auth-token");
//
//            WebSocketStompClient stompClient = new WebSocketStompClient(new StandardWebSocketClient());
//            stompClient.setMessageConverter(new MappingJackson2MessageConverter());
//
//            stompClient.connect(url, httpHeaders, stompHeaders, this);
//            log.info("Connected to WebSocket at {}", url);
//        }
//
//        public void send(ChatMessage chatMessage) {
//            if (session != null && session.isConnected()) {
//                session.send("/pub/chat", chatMessage);
//                log.info("Message sent to /pub/chat: {}", chatMessage);
//            } else {
//                log.warn("Not connected to WebSocket. Cannot send message.");
//            }
//        }
//
//        public void disconnect() {
//            if (session != null && session.isConnected()) {
//                session.disconnect();
//                log.info("Disconnected from WebSocket");
//            }
//        }
//
//        @Override
//        public void afterConnected(StompSession session, StompHeaders connectedHeaders) {
//            this.session = session;
//            this.session.subscribe(subscribe, this);
//            log.info("Subscribed to {}", subscribe);
//        }
//
//        @Override
//        public void handleFrame(StompHeaders headers, Object payload) {
//            ChatMessage chatMessage = (ChatMessage) payload;
//            log.info("Received message from {}: {}", headers.getDestination(), chatMessage);
//        }
//
//        @Override
//        public Type getPayloadType(StompHeaders headers) {
//            return ChatMessage.class;
//        }
//    }
//
//    private static class ChatMessage {
//        private Integer roomId;
//        private String message;
//
//        public ChatMessage(Integer roomId, String message) {
//            this.roomId = roomId;
//            this.message = message;
//        }
//
//        // Getters and setters
//        public Integer getRoomId() {
//            return roomId;
//        }
//
//        public void setRoomId(Integer roomId) {
//            this.roomId = roomId;
//        }
//
//        public String getMessage() {
//            return message;
//        }
//
//        public void setMessage(String message) {
//            this.message = message;
//        }
//
//        @Override
//        public String toString() {
//            return "ChatMessage{" +
//                    "roomId=" + roomId +
//                    ", message='" + message + '\'' +
//                    '}';
//        }
//    }
//}