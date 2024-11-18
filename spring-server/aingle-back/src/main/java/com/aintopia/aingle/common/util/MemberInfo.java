package com.aintopia.aingle.common.util;

import org.springframework.security.core.context.SecurityContextHolder;

public class MemberInfo {

    private MemberInfo(){}

    public static Long getId() {
        return Long.parseLong(
            SecurityContextHolder.getContext()
            .getAuthentication()
            .getName()
        );
    }
}
