package org.example.contollers;

import jakarta.validation.Valid;
import org.example.dto.CommentsDTO;
import org.example.service.CommentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController("")
@RequestMapping("/comment")
public class CommentController {
    private CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping(path = "/add/{id}", consumes="application/json")
    public ResponseEntity<CommentsDTO> createComment(@PathVariable(value = "id") long id, @Valid @RequestBody CommentsDTO commentsDTO){
        return new ResponseEntity<>(commentService.createComment(id,commentsDTO), HttpStatus.CREATED);
    }
}
