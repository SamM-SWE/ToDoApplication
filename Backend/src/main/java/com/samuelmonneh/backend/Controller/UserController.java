package com.samuelmonneh.backend.Controller;

import com.samuelmonneh.backend.DTO.UserRegisterRequestDTO;
import com.samuelmonneh.backend.DTO.UserRegisterResponseDTO;
import com.samuelmonneh.backend.Model.UserModel;
import com.samuelmonneh.backend.Service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/userservices")
public class UserController {

    private AuthService authService;

    public UserController(AuthService authService) {
        this.authService = authService;
    }


    @PostMapping("/login")
    public ResponseEntity<UserRegisterResponseDTO> login(@RequestBody UserRegisterRequestDTO requestDTO) {

        UserRegisterResponseDTO response =
                authService.login(requestDTO);

        if (response == null) {
            return ResponseEntity.status(401).build();
        }

        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<UserRegisterResponseDTO> register(@RequestBody UserRegisterRequestDTO userRegisterRequestDTO) {
        UserRegisterResponseDTO userRegisterResponseDTO = authService.register(userRegisterRequestDTO);

        return ResponseEntity.ok(userRegisterResponseDTO);
    }

    @GetMapping("/token")
    public CsrfToken getToken(CsrfToken csrfToken) {
        return csrfToken;
    }
}
