package org.example.contollers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller()
public class WebController {
    @GetMapping("/")
    public String web(){
        return "web";
    }

}
