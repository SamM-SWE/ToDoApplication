package com.samuelmonneh.backend.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRegisterRequestDTO {
    private String name;
    private String email;
    private String password;
}
