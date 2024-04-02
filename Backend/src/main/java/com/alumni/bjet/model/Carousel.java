package com.alumni.bjet.model;

import jakarta.persistence.*;

import static jakarta.persistence.GenerationType.SEQUENCE;

@Entity(name = "Carousel")
@Table(name = "carousel")
public class Carousel {
    @Id
    @SequenceGenerator(
            name = "carousel_sequence",
            sequenceName = "carousel_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = SEQUENCE,
            generator = "carousel_sequence"
    )
    @Column(
            name = "id",
            updatable = false
    )
    private Long id;

    @Column(name = "img")
    private String img;

    public Carousel() {
    }

    public Carousel(String img) {
        this.img = img;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }
}
