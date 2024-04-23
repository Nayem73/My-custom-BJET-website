package com.alumni.bjet.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import static jakarta.persistence.GenerationType.SEQUENCE;

@Entity(name = "SuperAdminResource")
@Table(name = "super_admin_resource")
public class SuperAdminResource {
    @Id
    @SequenceGenerator(
            name = "super_admin_sequence",
            sequenceName = "super_admin_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = SEQUENCE,
            generator = "super_admin_sequence"
    )
    @Column(
            name = "id",
            updatable = false
    )
    private Long id;

    @Column(
            name = "description",
            nullable = false,
            columnDefinition = "TEXT"
    )
    private String description;

    @Column(name = "img")
    private String img;

    @Column(name = "review_date_time") // Add the new dateTime field
    private LocalDateTime localDateTime;

    @ManyToOne
    @JoinColumn(
            name = "super_admin_id",
            referencedColumnName = "id",
            nullable = false,
            foreignKey = @ForeignKey(
                    name = "super_admin_foreign_key"
            )
    )
    private UserInfo userInfo;

    public SuperAdminResource() {
    }

    public SuperAdminResource(String description, String img, UserInfo userInfo, LocalDateTime localDateTime) {
        this.description = description;
        this.img = img;
        this.userInfo = userInfo;
        this.localDateTime = localDateTime;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public LocalDateTime getLocalDateTime() {
        return localDateTime;
    }

    public void setLocalDateTime(LocalDateTime localDateTime) {
        this.localDateTime = localDateTime;
    }

    public UserInfo getUserInfo() {
        return userInfo;
    }

    public void setUserInfo(UserInfo userInfo) {
        this.userInfo = userInfo;
    }
}
