package com.aintopia.aingle.alarm.repository;

import com.aintopia.aingle.alarm.domain.Alarm;
import com.aintopia.aingle.member.domain.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


public interface AlarmRepository extends JpaRepository<Alarm, Long> {
    Page<Alarm> findByMember(Member member, Pageable pageable);
}
