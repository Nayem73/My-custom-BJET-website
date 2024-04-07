package com.alumni.bjet.model;

import jakarta.persistence.*;

import static jakarta.persistence.GenerationType.SEQUENCE;

@Entity(name = "NotificationInfo")
@Table(name = "notification_info")
public class NotificationInfo {
    @Id
    @SequenceGenerator(
            name = "notification_info_sequence",
            sequenceName = "notification_info_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = SEQUENCE,
            generator = "notification_info_sequence"
    )
    @Column(
            name = "id",
            updatable = false
    )
    private Long id;

    private Long senderId;

    private Long recipientId;

    private String message;

    public NotificationInfo() {
    }

    public NotificationInfo(Long senderId, Long recipientId, String message) {
        this.senderId = senderId;
        this.recipientId = recipientId;
        this.message = message;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getSenderId() {
        return senderId;
    }

    public void setSenderId(Long senderId) {
        this.senderId = senderId;
    }

    public Long getRecipientId() {
        return recipientId;
    }

    public void setRecipientId(Long recipientId) {
        this.recipientId = recipientId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
