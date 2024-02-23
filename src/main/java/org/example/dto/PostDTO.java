package org.example.dto;

import lombok.Data;

import java.util.Set;

@Data
public class PostDTO {
    private Long id;
    private String imgURL;

    private Long up;
    private Long down;
    private Set<CommentsDTO> comments;
}
