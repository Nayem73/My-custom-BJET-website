package com.alumni.bjet.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static jakarta.persistence.GenerationType.SEQUENCE;

@Entity(name = "UserInfo")
@Table(name = "user_info")
public class UserInfo {

    @Id
    @SequenceGenerator(
            name = "user_info_sequence",
            sequenceName = "user_info_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = SEQUENCE,
            generator = "user_info_sequence"
    )
    @Column(
            name = "id",
            updatable = false
    )
    private int id;

    @Column(
            name = "userName",
            nullable = false,
            columnDefinition = "TEXT"
    )
    private String userName;

    @Column(
            name = "email",
            nullable = false,
            columnDefinition = "TEXT"
    )
    private String email;

    @Column(
            name = "password",
            nullable = false,
            columnDefinition = "TEXT"
    )
    private String password;

    @Column(
            name = "role",
            nullable = false,
            columnDefinition = "TEXT"
    )
    private String role;
    @Column(name = "profilePicture")
    private String profilePicture;

    @Column(name = "bjetBatch")
    private String bjetBatch;
    @Column(name = "about")
    private String about;

    @Column(name = "address")
    private String address;

    @Column(name = "company")
    private String company;

    @Column(name = "position")
    private String position;

    @Column(name = "notificationCount")
    private Long notificationCount;


    @ElementCollection
    @CollectionTable(name = "technology_stack", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "technology")
    private List<String> technologyStack = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "social_media", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "value")
    @MapKeyColumn(name = "platform")
    private Map<String, String> social = new HashMap<>();


    public UserInfo() {
        this.profilePicture = "/api/picture?link=static/avatar.png";
        this.notificationCount = 0L;
    }

    public UserInfo(String userName, String email, String password, String role, String bjetBatch, String about, String address, String company, String position) {
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.role = role;
        this.bjetBatch = bjetBatch;
        this.about = about;
        this.address = address;
        this.company = company;
        this.position = position;
        this.profilePicture = "/api/picture?link=static/avatar.png";
        this.notificationCount = 0L;
    }

    public long getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String name) {
        this.userName = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getAbout() {
        return about;
    }

    public void setAbout(String about) {
        this.about = about;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public List<String> getTechnologyStack() {
        return technologyStack;
    }

    public void setTechnologyStack(String currentTechnology) {
        technologyStack.add(currentTechnology);
    }

    public Map<String, String> getSocial() {
        return social;
    }

    public void setSocial(String platform, String handle) {
        social.put(platform, handle);
    }

    public String getBjetBatch() {
        return bjetBatch;
    }

    public void setBjetBatch(String bjetBatch) {
        this.bjetBatch = bjetBatch;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }

    public Long getNotificationCount() {
        return notificationCount;
    }

    public void setNotificationCount(Long notificationCount) {
        this.notificationCount = notificationCount;
    }
}
