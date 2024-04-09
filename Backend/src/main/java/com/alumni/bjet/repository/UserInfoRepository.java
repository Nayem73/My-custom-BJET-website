package com.alumni.bjet.repository;

import com.alumni.bjet.model.UserInfo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserInfoRepository extends JpaRepository<UserInfo, Long> {
    Optional<UserInfo> findByUserName(String username);
    Optional<UserInfo> findByEmail(String email);

    @Query("SELECT c FROM UserInfo c WHERE c.email = ?1")
    UserInfo getUserNameByEmail(String email);

    @Query("SELECT c FROM UserInfo c WHERE c.userName = ?1")
    UserInfo getByUserName(String userName);

    UserInfo findById(int id);
    List<UserInfo> findByRole(String role);

//    Page<UserInfo> findAll(Pageable pageable);
}
