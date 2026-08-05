package com.seilixx.issuetracker.security;

import org.springframework.stereotype.Service;

import java.security.Key;

@Service
public class JwtService {
    private static String SECRET_KEY="VGhpcy1pcy1hLXNlY3JldC1rZXktdGhhdC1tdXN0LWJlLWF0LWxlYXN0LTI1Ni1iaXRzLWxvbmch";

    private Key getSignInKey(){
        byte[] KeyBytes = SECRET_KEY.getBytes();

    }
}
