package com.alumni.bjet.repository;

import com.alumni.bjet.model.NotificationInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<NotificationInfo, Long> {
    List<NotificationInfo> findByRecipientId(Long recipientId);
}
