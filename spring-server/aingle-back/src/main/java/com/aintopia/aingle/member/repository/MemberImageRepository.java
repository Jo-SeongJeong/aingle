package com.aintopia.aingle.member.repository;

import com.aintopia.aingle.member.domain.Member;
import com.aintopia.aingle.member.domain.MemberImage;
import org.springframework.data.jpa.repository.JpaRepository;


public interface MemberImageRepository extends JpaRepository<MemberImage, Member> {

}
