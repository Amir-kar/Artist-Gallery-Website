package org.example.contollers;

import org.example.dto.PostDTO;
import org.example.service.PostService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("/post")
public class PostController {
    private PostService postService;

    public PostController(PostService postService){
        this.postService=postService;
    }

    @GetMapping("/getPost/{id}")
    public ResponseEntity<PostDTO> getPost(@PathVariable Long id){
        return new ResponseEntity<>(postService.getPost(id),HttpStatus.OK);
    }
    @GetMapping("/getPosts/{page}")
    public ResponseEntity<List<PostDTO>> getAllPosts(@PathVariable int page){
        return new ResponseEntity<>(postService.getAllPosts(page),HttpStatus.OK);
    }
    @PostMapping("/plus/{id}")
    public ResponseEntity<PostDTO> plus(@PathVariable Long id) {
        return new ResponseEntity<>(postService.plus(id),HttpStatus.OK);
    }
    @PostMapping("/minus/{id}")
    public ResponseEntity<PostDTO> minus(@PathVariable Long id){
        return new ResponseEntity<>(postService.minus(id),HttpStatus.OK);
    }

}
