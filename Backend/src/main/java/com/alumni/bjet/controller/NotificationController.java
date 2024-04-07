package com.alumni.bjet.controller;

import com.alumni.bjet.service.NotificationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/notification")
public class NotificationController {
    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping("/")
    public ResponseEntity<?> getNotifications(Authentication authentication) {
        if (authentication == null) {
            return new ResponseEntity<>("User is not authenticated", HttpStatus.UNAUTHORIZED);
        }
        String userName = authentication.getName();
        return notificationService.getNotificationsForUser(userName);
    }

    @PostMapping("/send")
    public ResponseEntity<?> sendNotification(
            @RequestParam String senderUsername,
            @RequestParam String recipientUsername,
            @RequestParam String message) {
        return notificationService.sendNotification(senderUsername, recipientUsername, message);
    }

    @PostMapping("/{notificationId}/reply")
    public ResponseEntity<?> replyToNotification(
            @PathVariable Long notificationId,
            @RequestParam Long senderId,
            @RequestParam String replyMessage) {
        return notificationService.replyToNotification(notificationId, senderId, replyMessage);
    }
}
