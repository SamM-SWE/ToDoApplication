package com.samuelmonneh.backend.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRegisterResponseDTO {
    private Long id;
    private String name;
    private String email;
    private String message;
}
