package org.example.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.Date;

@Data
public class CommentsDTO {
    private Long id;
    @NotEmpty
    private String name;
    @NotEmpty
    @Email
    private String email;
    @NotEmpty
    @Size(min = 2,message = "Body must be more then 2 characters long")
    private String body;

    private Date date;

}
