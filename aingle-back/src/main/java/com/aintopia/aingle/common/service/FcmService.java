package com.aintopia.aingle.common.service;

import com.aintopia.aingle.common.dto.FcmDto;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.event.TransactionalEventListener;

import java.util.Date;

@Service
@RequiredArgsConstructor
@Slf4j
public class FcmService {

    private final TaskScheduler taskScheduler;

    @TransactionalEventListener
    public void scheduleNotificationWithDelay(FcmDto fcmDto) {
        taskScheduler.schedule(
                () -> sendNotification(fcmDto),
                new Date(System.currentTimeMillis() + (fcmDto.getDelayMinutes() * 60 * 1000))
        );
        log.info("Scheduled notification with delay: " + fcmDto.getDelayMinutes() + " 분 뒤에 알림을 보낼겁니다!");
    }

    public void sendNotification(FcmDto fcmDto) {
        try {
            log.info("Sending notification to FCM: 댓글 생성 알림을 보낼게요!");
            Message fcmMessage = Message.builder()
                    .setToken(fcmDto.getFcmToken())
                    .setNotification(Notification.builder()
                            .setTitle(fcmDto.getTitle())
                            .setBody(fcmDto.getMessage())
                            .build())
                    .putData("postId", fcmDto.getPostId().toString())
                    .putData("alarmId", fcmDto.getAlarmId().toString())
                    .build();

            FirebaseMessaging.getInstance().send(fcmMessage);
        } catch (Exception e) {
            log.error("FCM 메시지 전송 실패: {}", e.getMessage());
        }
    }
}
