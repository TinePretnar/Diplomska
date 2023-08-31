package com.example.DiplomskaSpringBoot;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
@Component
public class PasswordHasher {

    @Autowired
    public static String hashPassword(String password) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] encodedHash = digest.digest(password.getBytes(StandardCharsets.UTF_8));

            // Convert the byte array to a hexadecimal representation
            StringBuilder hexString = new StringBuilder();
            for (byte b : encodedHash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) {
                    hexString.append('0');
                }
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            // Handle the exception appropriately
        }
        return null;
    }

    public static boolean verifyPassword(String inputPassword, String hashedPassword) {
        // Hash the input password using the same method as when it was stored
        String hashedInputPassword = hashPassword(inputPassword);

        // Compare the newly hashed input password with the stored hashed password
        return hashedInputPassword.equals(hashedPassword);
    }
}
