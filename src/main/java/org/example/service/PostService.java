package org.example.service;

import org.example.dto.PostDTO;

import java.util.List;

public interface PostService {
    PostDTO getPost(Long id);
    List<PostDTO> getAllPosts(int page);
    PostDTO plus(Long id);
    PostDTO minus(Long id);
}
