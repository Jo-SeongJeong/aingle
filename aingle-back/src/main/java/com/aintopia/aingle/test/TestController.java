package com.aintopia.aingle.test;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/test")
public class TestController {

    @GetMapping
    public long test(){
        return System.currentTimeMillis();
    }
}
