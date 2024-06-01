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
        Carousel carousel = new Carousel("/api/picture?link=images/" + fileName);
        carouselRepository.save(carousel);

        // Create a response with the picture ID and image URL
        Map<String, Object> response = new HashMap<>();
        response.put("link", "/api/picture?link=images/" + fileName);

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(response);
    }

    @PutMapping("/carousel/{carouselId}")
    public ResponseEntity<Map<String, Object>> editCarousel(
            @PathVariable Long carouselId,
            @RequestParam("img") MultipartFile file) throws IOException {

        // Fetch the existing carousel object from the database using the carouselId
        Optional<Carousel> existingCarousel = carouselRepository.findById(carouselId);
        if (existingCarousel.isEmpty()) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("message", "Carousel not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }

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

        // Update the existing carousel object with the new image path
        Carousel carousel = existingCarousel.get();
        carousel.setImg("/api/picture?link=images/" + fileName);
        carouselRepository.save(carousel);

        // Create a response with the picture ID and image URL
        Map<String, Object> response = new HashMap<>();
        response.put("link", "/api/picture?link=images/" + fileName);

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(response);
    }

    private boolean isImageFile(MultipartFile file) {
        String fileName = file.getOriginalFilename();
        return fileName != null && (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg") || fileName.endsWith(".png"));
    }

    @DeleteMapping("/carousel/{carouselId}")
    public ResponseEntity<Map<String, String>> deleteCarousel(@PathVariable Long carouselId) {
        Optional<Carousel> carousel = carouselRepository.findById(carouselId);
        if (carousel.isEmpty()) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Carousel not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }

        // Perform the delete operation
        carouselRepository.deleteById(carouselId);

        // Create a response confirming the deletion
        Map<String, String> response = new HashMap<>();
        response.put("message", "Carousel with ID " + carouselId + " deleted successfully");

        return ResponseEntity.ok().body(response);
    }


    @GetMapping("/aboutus")
    public ResponseEntity<Map<String, String>> getAboutUs() {
        String aboutUs = "Waseda University has been participating in the \"Miyazaki-Bangladesh Model,\" an industry-government-academia collaborative project to introduce advanced ICT human resources since 2017, from the planning stage of the JICA technical cooperation project Japan\"Bangladesh-Japan ICT Engineers' Training Program (B-JET),\" which has been implemented since 2017. We dispatched Japanese teachers from November 2017 to October 2020. In addition, the Japanese × IT Internship Program (JIP), which was supported Japanese×by Miyazaki City, accepted B-JET graduates for short-term study abroad programs and provided internships and Japanese education at companies to support their employment and retention in the community.\n" +
                "\n" +
                "In the first phase of the B-JET Programme, 265 students completed the program in eight periods from November 2017 to October 2020, of which 57 participated in the JIP at the university. Of these, 50 are employed in Miyazaki Prefecture, and a total of 24 companies have accepted them. Of the 186 B-JET graduates who have found employment in Japan, this is the second largest number of employees in Japan after Tokyo, and is attracting attention as an initiative to support the introduction of unique regional human resources.";

        Map<String, String> response = new HashMap<>();
        response.put("aboutUs", aboutUs);

        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/testimonial")
    public ResponseEntity<Map<String, String>> getTestimonial() {
        Map<String, String> response = new HashMap<>();
        String name = "Md. Sazzad Hossain";
        String role = "System Engineer from Co-Well Co., Ltd.";
        String testimonial = "As a fresh graduate with the dream to join a reputed IT firm in Japan, it seemed hard, and I felt lost at first. However, soon with the help of B-JET, I was finally able to reach my goal. This is a program for people who have a passion to build their careers in Japan with the goal to learn and develop. If you have a strong conviction, determined about reaching your target, B-JET will surely guide you to the best of its abilities and help you reach your goal.";
        response.put("name", name);
        response.put("role", role);
        response.put("testimonial", testimonial);

        return ResponseEntity.ok().body(response);
    }
}
