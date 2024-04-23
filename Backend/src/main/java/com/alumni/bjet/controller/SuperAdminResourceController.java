package com.alumni.bjet.controller;

import com.alumni.bjet.model.UserInfo;
import com.alumni.bjet.model.SuperAdminResource;
import com.alumni.bjet.repository.UserInfoRepository;
import com.alumni.bjet.repository.SuperAdminResourceRepository;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@RestController
@RequestMapping("/api")
public class SuperAdminResourceController {
    private final SuperAdminResourceRepository superAdminResourceRepository;
    private final UserInfoRepository userInfoRepository;

    public SuperAdminResourceController(SuperAdminResourceRepository superAdminResourceRepository, UserInfoRepository userInfoRepository) {
        this.superAdminResourceRepository = superAdminResourceRepository;
        this.userInfoRepository = userInfoRepository;
    }

    @GetMapping("/resources")
    public ResponseEntity<Page<Map<String, Object>>> getAllSuperAdminResources(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "id"));
        Page<SuperAdminResource> superAdminResourcePage = superAdminResourceRepository.findAll(pageable);

        List<Map<String, Object>> response = new ArrayList<>();

        for (SuperAdminResource superAdminResource : superAdminResourcePage.getContent()) {
            Map<String, Object> res = new LinkedHashMap<>();
            res.put("resourceId", superAdminResource.getId());
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            String formattedDateTime = superAdminResource.getLocalDateTime().format(formatter);
            res.put("created", formattedDateTime);
            res.put("description", superAdminResource.getDescription());
            res.put("img", superAdminResource.getImg());
            res.put("userName", superAdminResource.getUserInfo().getUserName());

            response.add(res);
        }

        return ResponseEntity.ok()
                .body(new PageImpl<>(response, pageable, superAdminResourcePage.getTotalElements()));
    }

    @PostMapping("/resources")
    public ResponseEntity<Map<String, Object>> addSuperAdminResource(
            @RequestParam("description") String text,
            @RequestParam(value = "img", required = false) MultipartFile file,
            Authentication authentication
    ) throws IOException {

        if (authentication == null) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("message", "Please login first.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        String userName = authentication.getName();
        UserInfo userInfo = userInfoRepository.getByUserName(userName);
        if (userInfo == null) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("message", "Please login first.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        String realPath;
        if (file == null) {
            realPath = "null";
        } else {
            if (!isImageFile(file)) {
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("message", "Only image files are allowed.");
                return ResponseEntity.badRequest().body(errorResponse);
            }

            String imagePath = "src/main/resources/images";
            Path imageDir = Paths.get(imagePath);
            if (!Files.exists(imageDir)) {
                Files.createDirectories(imageDir);
            }

            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path targetPath = imageDir.resolve(fileName);
            Files.copy(file.getInputStream(), targetPath);
            realPath = "/api/picture?link=images/" + fileName;
        }

        LocalDateTime curDateTime = LocalDateTime.now();

        SuperAdminResource superAdminResource = new SuperAdminResource(text, realPath, userInfo, curDateTime);
        superAdminResourceRepository.save(superAdminResource);

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("resourceId", superAdminResource.getId());
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedDateTime = superAdminResource.getLocalDateTime().format(formatter);
        response.put("created", formattedDateTime);
        response.put("description", superAdminResource.getDescription());
        response.put("img", superAdminResource.getImg());
        response.put("userName", superAdminResource.getUserInfo().getUserName());

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(response);
    }

    @PutMapping("/resources/{resourceId}")
    public ResponseEntity<Map<String, Object>> updateSuperAdminResource(
            @PathVariable Long resourceId,
            @RequestParam(value = "description", required = false) String text,
            @RequestParam(value = "img", required = false) MultipartFile file,
            Authentication authentication
    ) throws IOException {

        if (authentication == null) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("message", "Please login first.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        Optional<SuperAdminResource> optionalSuperAdminResource = superAdminResourceRepository.findById(resourceId);
        if (!optionalSuperAdminResource.isPresent()) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("message", "Resource not found.");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

        SuperAdminResource superAdminResource = optionalSuperAdminResource.get();

        if (!superAdminResource.getUserInfo().getUserName().equals(authentication.getName())) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("message", "Only the owner can update the resource.");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
        }

        if (text != null) {
            superAdminResource.setDescription(text);
        }

        if (file != null) {
            if (!isImageFile(file)) {
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("message", "Only image files are allowed.");
                return ResponseEntity.badRequest().body(errorResponse);
            }

            String imagePath = "src/main/resources/images";
            Path imageDir = Paths.get(imagePath);
            if (!Files.exists(imageDir)) {
                Files.createDirectories(imageDir);
            }

            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path targetPath = imageDir.resolve(fileName);
            Files.copy(file.getInputStream(), targetPath);

            superAdminResource.setImg("/api/picture?link=images/" + fileName);
        }

        superAdminResourceRepository.save(superAdminResource);

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("resourceId", superAdminResource.getId());
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedDateTime = superAdminResource.getLocalDateTime().format(formatter);
        response.put("created", formattedDateTime);
        response.put("description", superAdminResource.getDescription());
        response.put("img", superAdminResource.getImg());
        response.put("userName", superAdminResource.getUserInfo().getUserName());

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(response);
    }

    @DeleteMapping("/resources/{resourceId}")
    public ResponseEntity<Map<String, Object>> deleteSuperAdminResource(
            @PathVariable Long resourceId,
            Authentication authentication) {

        if (authentication == null) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("message", "Please login first.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        Optional<SuperAdminResource> optionalSuperAdminResource = superAdminResourceRepository.findById(resourceId);
        if (!optionalSuperAdminResource.isPresent()) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("message", "Resource not found.");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

        SuperAdminResource superAdminResource = optionalSuperAdminResource.get();

        if (!superAdminResource.getUserInfo().getUserName().equals(authentication.getName())) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("message", "Only the owner can delete the resource.");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
        }

        superAdminResourceRepository.delete(superAdminResource);

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("message", "Resource deleted successfully.");
        return ResponseEntity.ok().body(response);
    }

    private boolean isImageFile(MultipartFile file) {
        String fileName = file.getOriginalFilename();
        return fileName != null && (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg") || fileName.endsWith(".png"));
    }
}
