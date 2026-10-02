package com.samuelmonneh.backend.Service;

import com.samuelmonneh.backend.DTO.UserRegisterRequestDTO;
import com.samuelmonneh.backend.DTO.UserRegisterResponseDTO;
import com.samuelmonneh.backend.Model.UserModel;
import com.samuelmonneh.backend.Repo.UserRepo;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    private UserRepo userRepo;
    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AuthService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    public UserRegisterResponseDTO register(UserRegisterRequestDTO registerRequestDTO) {
        UserModel user = new UserModel();
        user.setName(registerRequestDTO.getName());
        user.setEmail(registerRequestDTO.getEmail());

        String encodedPassword = passwordEncoder.encode(registerRequestDTO.getPassword());

        user.setPassword(encodedPassword);
        user.setEnabled(true);

        userRepo.save(user);

        UserRegisterResponseDTO responseDTO = new UserRegisterResponseDTO();

        responseDTO.setEmail(user.getEmail());
        responseDTO.setId(user.getId());
        responseDTO.setName(user.getName());
        responseDTO.setMessage("User saved successfully");

        return responseDTO;
    }

    public UserRegisterResponseDTO login(
            UserRegisterRequestDTO registerRequestDTO) {

        Optional<UserModel> userOptional =
                userRepo.findByEmail(registerRequestDTO.getEmail());

        if (userOptional.isEmpty()) {
            return null;
        }

        UserModel user = userOptional.get();

        boolean passwordMatches = passwordEncoder.matches(
                registerRequestDTO.getPassword(),
                user.getPassword()
        );

        if (!passwordMatches) {
            return null;
        }

        UserRegisterResponseDTO responseDTO =
                new UserRegisterResponseDTO();

        responseDTO.setId(user.getId());       // <-- ID from database
        responseDTO.setEmail(user.getEmail());
        responseDTO.setName(user.getName());
        responseDTO.setMessage("200 OK");

        return responseDTO;
    }
}
