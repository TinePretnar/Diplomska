package com.example.DiplomskaSpringBoot;

import com.example.DiplomskaSpringBoot.entity.Odlagalisca;
import com.example.DiplomskaSpringBoot.entity.User;
import com.example.DiplomskaSpringBoot.service.OdlagaliscaService;
import com.example.DiplomskaSpringBoot.service.UserService;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/odlagalisca")
@CrossOrigin(origins = "http://localhost:4200/")
public class DiplomskaController {

    private final OdlagaliscaService odlagaliscaService;
    private final UserService userService;

    public DiplomskaController(OdlagaliscaService odlagaliscaService, UserService userService) {
        this.odlagaliscaService = odlagaliscaService;
        this.userService = userService;
    }

    @GetMapping
    public List<Odlagalisca> getOdlagalisca() {
        return odlagaliscaService.getOdlagalisca();
    }

    @GetMapping("/uploads/{fileName:.+}")
    public ResponseEntity<Resource> serveImage(@PathVariable String fileName) {
        // Define the path to the uploads directory
        String uploadsDirectoryPath = "C:/Users/tine/Desktop/Diplomska/DiplomskaSpringBoot/src/main/java/com/example/DiplomskaSpringBoot/uploads/";

        // Construct the path to the requested image file
        String filePath = uploadsDirectoryPath + fileName;

        // Create a FileSystemResource from the file path
        Resource resource = new FileSystemResource(filePath);

        // Check if the file exists and is readable
        if (resource.exists() && resource.isReadable()) {
            // Return the image file with the appropriate Content-Type
            return ResponseEntity.ok().header("Content-Type", "image/png").body(resource);
        } else {
            // Return a 404 Not Found response if the file does not exist or is not readable
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/add")
    public void addNewOdlagalisce(@RequestPart Odlagalisca newOdlagalisce,   @RequestParam(name = "images", required = false) MultipartFile[] images) {
        // Check if images were uploaded
        if (images != null && images.length > 0 && images[0] != null){
            String[] picturePaths = new String[images.length];
            // Save pictures locally and get their paths
            savePicturesOnServer(picturePaths, Arrays.asList(images));
            // Set the picturePaths in the Odlagalisca entity
            newOdlagalisce.setPicturePaths(picturePaths);
        }else{
            // Set picturePaths to null if there are no images
            newOdlagalisce.setPicturePaths(null);
        }
        // Save the Odlagalisca entity with picture paths in the database
        odlagaliscaService.addNewOdlagalisce(newOdlagalisce);
    }

    @GetMapping("/user/checkEmail")
    public boolean checkEmailExists(@RequestParam String email) {
        return userService.checkEmailExists(email);
    }

    @PostMapping("/user/register")
    public User registerUser(@RequestBody User user) {
        // Hash the user's password before saving
        String hashedPassword = PasswordHasher.hashPassword(user.getPassword());
        user.setPassword(hashedPassword);
        return userService.saveUser(user);
    }

    @PostMapping("/user/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        User storedUser = userService.getUserByEmail(user.getEmail());

        if (storedUser != null && PasswordHasher.verifyPassword(user.getPassword(), storedUser.getPassword())) {
            // If email and password match, return the user object (exclude the password for security)
            storedUser.setPassword(null);
            return ResponseEntity.ok(storedUser);
        } else {
            // If authentication fails, return a 401 Unauthorized status
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication failed: Incorrect email or password.");
        }
    }

    @DeleteMapping("/delete/{markerId}")
    public ResponseEntity<String> deleteOdlagalisce(@PathVariable int markerId) {
        // Check if the marker exists
        if (!odlagaliscaService.odlagalisceExists(markerId)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Odlagalisce not found.");
        }

        // Perform the deletion
        odlagaliscaService.deleteOdlagalisce(markerId);

        return ResponseEntity.ok("Odlagalisce deleted.");
    }

    @PutMapping("/update/{odlagalisceId}")
    public ResponseEntity<String> updateOdlagalisce(@PathVariable int odlagalisceId,
                                                    @RequestPart Odlagalisca updatedOdlagalisce,
                                                    @RequestParam(name = "images", required = false) MultipartFile[] images) {
        // Check if the odlagališče exists
        if (!odlagaliscaService.odlagalisceExists(odlagalisceId)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Odlagališče not found.");
        }
        // Get the existing odlagališče
        Odlagalisca existingOdlagalisce = odlagaliscaService.getOdlagalisceById(odlagalisceId);
        deleteOldImages(existingOdlagalisce, updatedOdlagalisce.getPicturePaths());
        // Check if images were uploaded
        if (images != null && images.length > 0 && images[0] != null) {
            String[] newPicturePaths = new String[images.length];
            // Save pictures locally and get their paths
            savePicturesOnServer(newPicturePaths, Arrays.asList(images));

            // Append new picture paths to existing picture paths
            String[] updatedPicturePaths = Arrays.copyOf(updatedOdlagalisce.getPicturePaths(), updatedOdlagalisce.getPicturePaths().length + newPicturePaths.length);
            System.arraycopy(newPicturePaths, 0, updatedPicturePaths, updatedOdlagalisce.getPicturePaths().length, newPicturePaths.length);
            updatedOdlagalisce.setPicturePaths(updatedPicturePaths);
        }

        // Update the odlagališče in the database
        odlagaliscaService.updateOdlagalisce(odlagalisceId, updatedOdlagalisce);

        return ResponseEntity.ok("Odlagališče updated.");
    }




    private void savePicturesOnServer(String[] picturePaths, List<MultipartFile> images) {
        try {
            // Create the uploads directory if it doesn't exist
            Path uploadsDirectory = Paths.get("C:/Users/tine/Desktop/Diplomska/DiplomskaSpringBoot/src/main/java/com/example/DiplomskaSpringBoot/uploads");
            Files.createDirectories(uploadsDirectory);

            // Loop through the images and save them on the server with unique names
            for (int i = 0; i < images.size(); i++) {
                MultipartFile image = images.get(i);
                String uniqueFileName = System.currentTimeMillis() + "_" + i + "_" + image.getOriginalFilename();
                Path filePath = uploadsDirectory.resolve(uniqueFileName);
                Files.write(filePath, image.getBytes());
                picturePaths[i] = "http://localhost:8080/odlagalisca/uploads/" + uniqueFileName; // Store the URL path in the picturePaths array
            }
        } catch (IOException e) {
            // Handle any errors that occur during file saving
            e.printStackTrace();
            // You can also throw an exception or return an error response if needed
        }
    }

    private void deleteOldImages(Odlagalisca odlagalisce, String[] newPicturePaths) {
        // Get the existing picture paths from the odlagališče entity
        String[] existingPicturePaths = odlagalisce.getPicturePaths();

        // Compare existing picture paths with new picture paths
        for (String existingPicturePath : existingPicturePaths) {
            boolean pathExistsInNewPaths = Arrays.stream(newPicturePaths).anyMatch(newPath -> newPath.equals(existingPicturePath));
            if (!pathExistsInNewPaths) {
                // Delete the old image file
                String fileName = existingPicturePath.substring(existingPicturePath.lastIndexOf("/") + 1);
                deleteImageFromServer(fileName);
            }
        }
    }

    private void deleteImageFromServer(String fileName) {
        String filePath = "C:/Users/tine/Desktop/Diplomska/DiplomskaSpringBoot/src/main/java/com/example/DiplomskaSpringBoot/uploads/" + fileName;
        Path imagePath = Paths.get(filePath);
        try {
            Files.delete(imagePath);
        } catch (IOException e) {
            // Handle any errors that occur during image deletion
            e.printStackTrace();
        }
    }

}

