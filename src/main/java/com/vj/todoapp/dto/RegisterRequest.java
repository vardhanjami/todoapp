package com.vj.todoapp.dto;
import jakarta.validation.constraints.*;

public class RegisterRequest {
    @NotBlank(message = "uswername is required")
    @Size(min=4,max=20)
    private String username;

    @NotBlank(message = "password is required")
    @Size(min=8)
    @Pattern(regexp = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@#$%^&+=]).*$",
            message = "Weak password")
    private String password;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
