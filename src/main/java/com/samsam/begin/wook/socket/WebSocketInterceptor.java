package com.samsam.begin.wook.socket;

import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

@Component
public class WebSocketInterceptor implements ChannelInterceptor {

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);

        if (accessor.getCommand() == StompCommand.CONNECT) {
            String authToken = accessor.getFirstNativeHeader("auth-token");

            if (!"spring-chat-auth-token".equals(authToken)) {
                throw new RuntimeException("Invalid auth token");
            }

            String userId = accessor.getFirstNativeHeader("user-id");

            if (userId == null || userId.isEmpty()) {
                throw new RuntimeException("User ID not provided");
            }

            accessor.setUser(() -> userId); // Set user ID for this session
        }

        return message;
    }
}
