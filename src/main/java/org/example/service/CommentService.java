package org.example.service;

import org.example.dto.CommentsDTO;

public interface CommentService {
    CommentsDTO createComment(Long postID, CommentsDTO commentsDTO);
}
