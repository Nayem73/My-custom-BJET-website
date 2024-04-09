package com.alumni.bjet.controller;

import com.alumni.bjet.model.UserInfo;
import com.alumni.bjet.repository.UserInfoRepository;
import com.alumni.bjet.service.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api")
public class UserInfoController {
    private final UserInfoRepository userInfoRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Autowired
    public UserInfoController(
            UserInfoRepository userInfoRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            AuthenticationManager authenticationManager) {
        this.userInfoRepository = userInfoRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/signup/")
    public ResponseEntity<?> addNewUser(
            @RequestParam("userName") String userName,
            @RequestParam("email") String email,
            @RequestParam("password") String password) {

        Map<String, Object> response = new LinkedHashMap<>();
        if (userName.length() > 10) {
            response.put("message", "userName is too large!");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(response);
        }

        Optional<UserInfo> existingUser = userInfoRepository.findByUserName(userName);
        Optional<UserInfo> existingUserByEmail = userInfoRepository.findByEmail(email);

        if (existingUser.isPresent()) {
            response.put("message", "User already exists with the same userName or email");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(response);
        } else if (existingUserByEmail.isPresent()) {
            response.put("message", "User already exists with the same userName or email");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(response);
        } else {
            // Encode the password and save the new user
            String encodedPassword = passwordEncoder.encode(password);

            UserInfo newUser = new UserInfo();
            newUser.setUserName(userName);
            newUser.setEmail(email);
            newUser.setPassword(encodedPassword);
            newUser.setRole("ROLE_USER");

            userInfoRepository.save(newUser);
            return ResponseEntity.ok("User added successfully");
        }
    }


    @PostMapping("/signin/")
    public ResponseEntity<Map<String, Object>> authenticateAndGetToken(
            @RequestParam("email") String email,
            @RequestParam("password") String password) {

        System.out.println(email);
        System.out.println(password);

        UserInfo userInfo = userInfoRepository.getUserNameByEmail(email);
        if (userInfo == null) {
            // Create the response map
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("message", "Invalid email or password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(response);
        }

        String userName = userInfo.getUserName();
        String role = userInfo.getRole();
        boolean isAdmin = "ROLE_ADMIN".equals(role); // Using .equals() for String comparison
        boolean isSuperAdmin = "ROLE_SUPER_ADMIN".equals(role);

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(userName, password));

            if (authentication.isAuthenticated()) {
                String token = jwtService.generateToken(userName);

                // Create the response map
                Map<String, Object> response = new LinkedHashMap<>();
                response.put("token", token);
                response.put("username", userName);
                response.put("isSuperAdmin", isSuperAdmin);
                if (isSuperAdmin) {
                    response.put("isAdmin", true);
                } else {
                    response.put("isAdmin", isAdmin);
                }

                return ResponseEntity.ok(response);
            } else {
                // Create the response map
                Map<String, Object> response = new LinkedHashMap<>();
                response.put("message", "Invalid username or password");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(response);
            }
        } catch (AuthenticationException e) {
            // Create the response map
            Map<String, Object> response = new LinkedHashMap<>();
//            response.put("message", "Authentication failed: " + e.getMessage());
            response.put("message", "Invalid username or password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(response);
        }
    }

    @PostMapping("/signout/")
    public String logout(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer")) {
            String token = authHeader.substring(7);
            jwtService.addToBlacklist(token);
            return "Logged out successfully";
        }
        return "Logout failed";
    }

    @PatchMapping("/changepassword/")
    public ResponseEntity<?> resetPassword(
            @RequestParam("currentPassword") String currentPassword,
            @RequestParam("newPassword") String newPassword,
            @RequestParam("confirmPassword") String confirmPassword,
            Authentication authentication) {

        Map<String, Object> response = new LinkedHashMap<>();
        // Check if the user is authenticated (logged in)
        if (authentication == null) {
            response.put("message", "Please login first.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
        // Retrieve the email of the logged-in user from the Authentication object
        String userName = authentication.getName();
        // Retrieve the UserInfo entity for the logged-in user
        UserInfo currentUser = userInfoRepository.getByUserName(userName);
        // Check if UserInfo entity exists for the user
        if (currentUser == null) {
            response.put("message", "Please login first.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        // Verify the current password
        if (!passwordEncoder.matches(currentPassword, currentUser.getPassword())) {
            response.put("message", "Current password is incorrect");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(response);
        }

        // Check if new password and confirm password match
        if (!newPassword.equals(confirmPassword)) {
            response.put("message", "New password and confirm password do not match");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(response);
        }

        // Encode the new password and save it
        String encodedNewPassword = passwordEncoder.encode(newPassword);
        currentUser.setPassword(encodedNewPassword);
        userInfoRepository.save(currentUser);

        response.put("message", "Password reset successful");
        return ResponseEntity.ok(response);
    }



    @GetMapping("/profile/")
    public ResponseEntity<Map<String, Object>> getProfile(Authentication authentication) {
        if (authentication == null) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("message", "Please login first.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        String userName = authentication.getName();
        Optional<UserInfo> userInfoOptional = userInfoRepository.findByUserName(userName);
        if (!userInfoOptional.isPresent()) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("message", "User not found.");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

        UserInfo userInfo = userInfoOptional.get();

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("id", userInfo.getId());
        response.put("userName", userInfo.getUserName());
        response.put("email", userInfo.getEmail());
        response.put("Profile Picture", userInfo.getProfilePicture());
        response.put("B-JET Batch", userInfo.getBjetBatch());
        response.put("About", userInfo.getAbout());
        response.put("Current Address", userInfo.getAddress());
        response.put("Current Company", userInfo.getCompany());
        response.put("Current Position", userInfo.getPosition());
        response.put("Technology Stack", userInfo.getTechnologyStack());
        response.put("Social Media", userInfo.getSocial());


        return ResponseEntity.ok(response);
    }

    @GetMapping("/alumni/")
    public ResponseEntity<?> getAlumni() {
        List<UserInfo> bjetAlumni = userInfoRepository.findByRole("ROLE_BJET");
        return ResponseEntity.ok(bjetAlumni);
    }
    @GetMapping("/users/{id}")
    public ResponseEntity<?> getNotifications(@PathVariable Integer id) {
        if (id == null) {
            return new ResponseEntity<>("User id is not provided as PathVariable", HttpStatus.UNAUTHORIZED);
        }
        UserInfo userInfo =  userInfoRepository.findById(id);
        Map<String, Object> response = new LinkedHashMap<>();
        if (userInfo.getRole().equals("ROLE_BJET")) response.put("profile", "B-JET Graduate");
        response.put("profilePicture", userInfo.getProfilePicture());
        response.put("userName", userInfo.getUserName());
        response.put("email", userInfo.getEmail());
        response.put("about", userInfo.getAbout());
        if (userInfo.getRole().equals("ROLE_BJET")) {
            response.put("B-JET Batch", userInfo.getBjetBatch());
            response.put("address", userInfo.getAddress());
            response.put("company", userInfo.getCompany());
            response.put("position", userInfo.getPosition());
            response.put("technologyStack", userInfo.getTechnologyStack());
            response.put("social", userInfo.getSocial());
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping("/userlist/")
    @PreAuthorize("hasAuthority('ROLE_ADMIN') OR hasAuthority('ROLE_SUPER_ADMIN')")
    public ResponseEntity<Page<Map<String, Object>>> getAllUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<UserInfo> usersPage = userInfoRepository.findAll(pageable);

        List<Map<String, Object>> userResponseList = new ArrayList<>();
        for (UserInfo user : usersPage) {
            Map<String, Object> userResponse = new LinkedHashMap<>();
            userResponse.put("id", user.getId());
            userResponse.put("userName", user.getUserName());
            userResponse.put("email", user.getEmail());
            if ("ROLE_SUPER_ADMIN".equals(user.getRole()) || "ROLE_ADMIN".equals(user.getRole())) {
                userResponse.put("isSubscribed", true);
            }
            userResponse.put("isSuperAdmin", "ROLE_SUPER_ADMIN".equals(user.getRole()));
            if ("ROLE_SUPER_ADMIN".equals(user.getRole())) {
                userResponse.put("isAdmin", true);
            } else {
                userResponse.put("isAdmin", "ROLE_ADMIN".equals(user.getRole()));
            }
            userResponseList.add(userResponse);
        }

        return ResponseEntity.ok()
                .body(new PageImpl<>(userResponseList, pageable, usersPage.getTotalElements()));
    }


    @PatchMapping("/userlist/{id}")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN')")
    public ResponseEntity<Map<String, Object>> userUpdate(
            @PathVariable Integer id,
            @RequestParam(value="isAdmin") Boolean isAdmin) {

        UserInfo userInfo = userInfoRepository.findById(id);
//        System.out.println("~~~~~~~~~~~~~"+ userInfo.getRole());
        Map<String, Object> response = new LinkedHashMap<>();
        if (userInfo == null) {
            response.put("message", "User not found.");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } else if (userInfo.getRole().equals("ROLE_ADMIN") && isAdmin) {
            response.put("message", userInfo.getUserName() + " is already an Admin");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        } else if (userInfo.getRole().equals("ROLE_USER") && !isAdmin) {
            response.put("message", "isAdmin is provided false and " +userInfo.getUserName() + " is already a User.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        if (isAdmin) {
            userInfo.setRole("ROLE_ADMIN");
//            userInfo.setSubscribed(true);
            userInfoRepository.save(userInfo); // Save the changes
            response.put("Success", "User " + userInfo.getUserName() + " is now Admin");
            return ResponseEntity.ok(response);
        }

        userInfo.setRole("ROLE_USER");
        userInfoRepository.save(userInfo); // Save the changes
        response.put("Success", "User " + userInfo.getUserName() + " is no longer an Admin");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/username/{username}")
    public ResponseEntity<?> getUserByUsername(@PathVariable String username) {
        Optional<UserInfo> userInfoOptional = userInfoRepository.findByUserName(username);

        if (userInfoOptional.isPresent()) {
            UserInfo userInfo = userInfoOptional.get();
            return ResponseEntity.ok(userInfo);
        } else {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "User not found for username: " + username);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }
}
