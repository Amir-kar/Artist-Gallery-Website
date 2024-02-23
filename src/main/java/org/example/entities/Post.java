package org.example.entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(
        name = "Post", uniqueConstraints = {@UniqueConstraint(columnNames = "imgURL")}
)

public class Post {
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;
    @Column(name = "imgURL", nullable = false)
    private String imgURL;

    private Long up=0L;
    private Long down= 0L;
    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true,fetch = FetchType.LAZY)
    private Set<Comment> comments= new HashSet<>();
}
