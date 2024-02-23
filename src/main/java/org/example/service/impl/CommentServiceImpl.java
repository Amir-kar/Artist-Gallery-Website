package org.example.service.impl;

import jakarta.validation.Valid;
import org.example.dto.CommentsDTO;
import org.example.entities.Comment;
import org.example.entities.Post;
import org.example.exceptions.NotFoundException;
import org.example.repository.CommentRepository;
import org.example.repository.PostRepository;
import org.example.service.CommentService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
public class CommentServiceImpl implements CommentService {
    private CommentRepository commentRepository;
    private PostRepository postRepository;
    private ModelMapper modelMapper;

    public CommentServiceImpl(CommentRepository commentRepository, PostRepository postRepository, ModelMapper modelMapper) {
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public CommentsDTO createComment(Long postID, @Valid CommentsDTO commentsDTO) {
        Comment comment=mapToCom(commentsDTO);
        Post post=postRepository.findById(postID).orElseThrow(()->new NotFoundException("Post id "+postID +" not Found"));
        comment.setPost(post);
        commentRepository.save(comment);
        return mapToDto(comment);
    }
    private CommentsDTO mapToDto(Comment comment){
        return modelMapper.map(comment,CommentsDTO.class);
    }
    private Comment mapToCom(CommentsDTO commentsDTO){
        return modelMapper.map(commentsDTO,Comment.class);
    }
}
