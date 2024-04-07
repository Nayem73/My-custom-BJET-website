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
        List<NotificationInfo> notifications = notificationRepository.findByRecipientId(userInfo.getId());
        return ResponseEntity.ok().body(notifications);
    }

    public ResponseEntity<?> sendNotification(Long senderId, Long recipientId, String message) {
        NotificationInfo notification = new NotificationInfo();
        notification.setSenderId(senderId);
        notification.setRecipientId(recipientId);
        notification.setMessage(message);
        notificationRepository.save(notification);
        return ResponseEntity.status(HttpStatus.CREATED).body("Notification sent successfully.");
    }

    public ResponseEntity<?> replyToNotification(Long notificationId, Long senderId, String replyMessage) {
        NotificationInfo notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new RuntimeException("Notification not found with id: " + notificationId));

        if (!notification.getRecipientId().equals(senderId)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("You are not authorized to reply to this notification.");
        }

        notification.setMessage(replyMessage);
        notificationRepository.save(notification);
        return ResponseEntity.ok().body("Reply sent successfully.");
    }
}
