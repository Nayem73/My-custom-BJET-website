package com.alumni.bjet.service;

import com.alumni.bjet.model.NotificationInfo;
import com.alumni.bjet.model.UserInfo;
import com.alumni.bjet.repository.NotificationRepository;
import com.alumni.bjet.repository.UserInfoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;
import java.util.LinkedHashMap;

@Service
public class NotificationService {
    private final NotificationRepository notificationRepository;
    private final UserInfoRepository userInfoRepository;

    public NotificationService(NotificationRepository notificationRepository, UserInfoRepository userInfoRepository) {
        this.notificationRepository = notificationRepository;
        this.userInfoRepository = userInfoRepository;
    }

    public ResponseEntity<?> getNotificationsForUser(String userName) {
        UserInfo userInfo = userInfoRepository.getByUserName(userName);
        if (userInfo == null) {
            return new ResponseEntity<>("User is not authenticated", HttpStatus.UNAUTHORIZED);
        }
        List<NotificationInfo> notifications = notificationRepository.findByRecipientId(userInfo.getId());
        return ResponseEntity.ok().body(notifications);
    }

    // NotificationService.java

    public ResponseEntity<?> sendNotification(String senderUsername, String recipientUsername, String message) {
        // Get UserInfo entities corresponding to sender and recipient usernames
        UserInfo senderInfo = userInfoRepository.getByUserName(senderUsername);
        UserInfo recipientInfo = userInfoRepository.getByUserName(recipientUsername);

        // Check if sender and recipient exist
        if (senderInfo == null || recipientInfo == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Sender or recipient not found.");
        }

        // Create NotificationInfo object and set senderId, recipientId, and message
        NotificationInfo notification = new NotificationInfo();
        notification.setSenderId(senderInfo.getId());
        notification.setSenderUsername(senderInfo.getUserName());
        notification.setRecipientId(recipientInfo.getId());
        notification.setMessage(message);
        recipientInfo.setNotificationCount(recipientInfo.getNotificationCount() + 1L);

        // Save notification
        notificationRepository.save(notification);

        return ResponseEntity.status(HttpStatus.CREATED).body("Notification sent successfully.");
    }

    public ResponseEntity<?> deleteNotification(Long notificationId, String username) {
        // Check if notification exists
        if (!notificationRepository.existsById(notificationId)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Notification not found.");
        }
        UserInfo userInfo = userInfoRepository.getByUserName(username);

        // Check if sender and recipient exist
        if (userInfo == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("user not found.");
        }

        // Reduce user's notification count by 1
        userInfo.setNotificationCount(userInfo.getNotificationCount() - 1L);

        // Delete the notification by its ID
        notificationRepository.deleteById(notificationId);

        return ResponseEntity.ok().body("Notification deleted successfully.");
    }

}
