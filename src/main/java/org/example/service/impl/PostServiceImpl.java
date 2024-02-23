package org.example.service.impl;

import org.example.dto.CommentsDTO;
import org.example.dto.PostDTO;
import org.example.entities.Comment;
import org.example.entities.Post;
import org.example.exceptions.NotFoundException;
import org.example.repository.CommentRepository;
import org.example.repository.PostRepository;
import org.example.service.PostService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class PostServiceImpl implements PostService {
    private PostRepository postRepository;
    private ModelMapper modelMapper;
    private CommentRepository commentRepository;

    public PostServiceImpl(PostRepository postRepository, ModelMapper modelMapper, CommentRepository commentRepository) {
        this.postRepository = postRepository;
        this.modelMapper = modelMapper;
        this.commentRepository = commentRepository;
    }

    @Override
    public PostDTO getPost(Long id){
        PostDTO postDTO=mapToDTO(
                postRepository
                        .findById(id)
                        .orElseThrow(
                                ()->new NotFoundException("Post id "+id +" not Found")
                        )
        );

        Set<CommentsDTO> commentsDTOS=commentRepository.findByPostId(id).stream()
                .map(
                        this::mapToComDTO)
                .collect(Collectors.toSet()
                )
                .stream()
                .sorted(
                        Comparator
                                .comparing(CommentsDTO::getDate).reversed()
                ).collect(
                        Collectors
                                .toCollection(LinkedHashSet::new)
                );

        postDTO.setComments(commentsDTOS);
        return postDTO;
    }
    @Override
    public List<PostDTO> getAllPosts(int page){
        int pageSize=6;
        Sort sort=Sort.by("id").descending();
        Pageable pageable= PageRequest.of(page,pageSize,sort);
        List<Post> posts = postRepository.findAll(pageable).getContent();
        return posts.stream().map(this::mapToDTO).toList();
    }


    @Override
    public PostDTO plus(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(
                        ()->new NotFoundException("Post id "+id +" not Found")
                );
        post.setUp(post.getUp()+1);
        postRepository.save(post);
        return mapToDTO(post);
    }

    @Override
    public PostDTO minus(Long id){
        Post post = postRepository.findById(id).orElseThrow(()->new NotFoundException("Post id "+ id+" not Found"));
        post.setDown(post.getDown()+1);
        postRepository.save(post);
        return mapToDTO(post);
    }

    private PostDTO mapToDTO(Post post){
        return modelMapper.map(post,PostDTO.class);
    }
    private Post mapToPost(PostDTO postDTO){
        return modelMapper.map(postDTO, Post.class);
    }
    private CommentsDTO mapToComDTO(Comment comment){

        return modelMapper.map(comment,CommentsDTO.class);
    }
}
