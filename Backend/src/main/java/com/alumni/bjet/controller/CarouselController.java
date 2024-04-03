package com.alumni.bjet.controller;

import com.alumni.bjet.model.Carousel;
import com.alumni.bjet.repository.CarouselRepository;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@RestController
@RequestMapping("/api")
public class CarouselController {
    private final CarouselRepository carouselRepository;

    public CarouselController(CarouselRepository carouselRepository) {
        this.carouselRepository = carouselRepository;
    }

    @GetMapping("/carousel/{carouselId}")
    public ResponseEntity<?> getAllCarouselPicturesByCarouselId(@PathVariable Long carouselId) {
        // Fetch the corresponding carousel object from the database using the carouselId
        Optional<Carousel> carousel = carouselRepository.findById(carouselId);
        if (carousel.isEmpty()) {
            // If the carouselId does not match any existing carousel, return a response with the "picture not found" message
            Map<String, String> responseMessage = new HashMap<>();
            responseMessage.put("message", "Picture not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseMessage);
        }
        return ResponseEntity.ok().body(carousel);
    }

    @GetMapping("/carousel")
    public ResponseEntity<?> getAllCarouselPictures() {
        // Fetch the corresponding carousel object from the database using the carouselId
        List<Carousel> carousel = carouselRepository.findAll();
        if (carousel.isEmpty()) {
            // If the carouselId does not match any existing carousel, return a response with the "picture not found" message
            Map<String, String> responseMessage = new HashMap<>();
            responseMessage.put("message", "Picture not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseMessage);
        }
        return ResponseEntity.ok().body(carousel);
    }

    @GetMapping("/picture")
    public ResponseEntity<Resource> showPicture(@RequestParam("link") String imagePath) throws IOException {
        // Concatenate the base image path with the relative image path from the request parameter
        String baseImagePath = "src/main/resources/";
        Path imageFilePath = Paths.get(baseImagePath, imagePath);

        if (!Files.exists(imageFilePath)) {
            return ResponseEntity.notFound().build();
        }

        // Read the image file as a Resource and set appropriate headers
        Resource imageResource = new UrlResource(imageFilePath.toUri());
        String contentType = Files.probeContentType(imageFilePath);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .body(imageResource);
    }

    @PostMapping("/carousel")
    public ResponseEntity<Map<String, Object>> addCarousel(
            @RequestParam("img") MultipartFile file) throws IOException {

        if (file.isEmpty()) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("message", "Please select an image file.");
            return ResponseEntity.badRequest().body(errorResponse);
        }

        // Check if the uploaded file is an image
        if (!isImageFile(file)) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("message", "Only image files are allowed.");
            return ResponseEntity.badRequest().body(errorResponse);
        }

        // Set the appropriate path to store the image (adjust this to your needs)
        String imagePath = "src/main/resources/images";

        // Create the directory if it doesn't exist
        Path imageDir = Paths.get(imagePath);
        if (!Files.exists(imageDir)) {
            Files.createDirectories(imageDir);
        }

        // Generate a unique file name for the image
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

        // Save the image file using the provided path
        Path targetPath = imageDir.resolve(fileName);
        Files.copy(file.getInputStream(), targetPath);


        // Create a new carousel object with the image path and the fetched carousel object
        Carousel carousel = new Carousel("/api/carousel?link=images/" + fileName);
        carouselRepository.save(carousel);

        // Create a response with the picture ID and image URL
        Map<String, Object> response = new HashMap<>();
        response.put("link", "/api/carousel?link=images/" + fileName);

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(response);
    }


    private boolean isImageFile(MultipartFile file) {
        String fileName = file.getOriginalFilename();
        return fileName != null && (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg") || fileName.endsWith(".png"));
    }
}
