package org.example;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class Main {
    @Bean
    public ModelMapper modelMapper(){
        ModelMapper mapper=new ModelMapper();
        mapper.getConfiguration().setPreferNestedProperties(false);
        return mapper;
    }
    public static void main(String[] args) {
        SpringApplication.run(Main.class);
    }

}