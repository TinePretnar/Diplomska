package com.example.DiplomskaSpringBoot;

import com.example.DiplomskaSpringBoot.entity.User;
import com.example.DiplomskaSpringBoot.repository.UserRepository;
import com.example.DiplomskaSpringBoot.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@SpringBootTest
@AutoConfigureMockMvc
@Import(TestDatabaseConfiguration.class)
class OdlagaliscaControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Mock
    private UserService userService;

    @InjectMocks
    private DiplomskaController diplosmkaController;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordHasher passwordHasher;

    @BeforeEach
    void setUp() {
        // Insert test data into the database
        User mockUser = new User();
        mockUser.setEmail("test@gmail.com");
        mockUser.setPassword(passwordHasher.hashPassword("1234"));
        mockUser.setAdmin(false);
        mockUser.setId(8L);
        userRepository.save(mockUser);
    }

    @Test
    void testGetOdlagalisca() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/odlagalisca"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$").isArray())
                .andExpect(MockMvcResultMatchers.jsonPath("$.length()").value(13780));
        // You can add more assertions for the response content if needed
    }

    @Test
    void testLoginUserValidCredentials() throws Exception {
        String userEmail = "test@gmail.com";
        String userPassword = "1234";

        // Create a request body
        User requestUser = new User();
        requestUser.setEmail(userEmail);
        requestUser.setPassword(userPassword);

        mockMvc.perform(MockMvcRequestBuilders
                        .post("/odlagalisca/user/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(requestUser)))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.email").value(userEmail))
                .andExpect(MockMvcResultMatchers.jsonPath("$.password").doesNotExist());
    }

    @Test
    void testLoginUserInvalidCredentials() throws Exception {
        String userEmail = "test@gmail.com";
        String userPassword = "incorrectPassword";

        // Create a request body
        User requestUser = new User();
        requestUser.setEmail(userEmail);
        requestUser.setPassword(userPassword);

        mockMvc.perform(MockMvcRequestBuilders
                        .post("/odlagalisca/user/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(requestUser)))
                .andExpect(MockMvcResultMatchers.status().isUnauthorized())
                .andExpect(MockMvcResultMatchers.content().string("Authentication failed: Incorrect email or password."));
    }

}

