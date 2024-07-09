package com.samsam.begin.chan.controller;

import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @GetMapping
    public List<String> getCategories() {
        return Arrays.asList("전자기기", "서적", "의류", "취미용품", "생활용품");
    }
}
