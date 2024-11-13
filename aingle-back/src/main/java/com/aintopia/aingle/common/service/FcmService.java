package com.aintopia.aingle.common.service;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
@Slf4j
public class FcmService {

    private final TaskScheduler taskScheduler;

    public void scheduleNotificationWithDelay(String token, String title, String message, int delayMinutes) {
        taskScheduler.schedule(
                () -> sendNotification(token, title, message),
                new Date(System.currentTimeMillis() + (delayMinutes * 60 * 1000))
        );
        log.info("Scheduled notification with delay: " + delayMinutes + " minutes 뒤에 알림을 보낼겁니다!");
    }

    public void sendNotification(String token, String title, String message) {
        try {
            log.info("Sending notification to FCM: 최초 댓글 생성 알림을 보낼게요!");
            Message fcmMessage = Message.builder()
                    .setToken(token)
                    .setNotification(Notification.builder()
                            .setTitle(title)
                            .setBody(message)
                            .build())
                    .build();

            FirebaseMessaging.getInstance().send(fcmMessage);
        } catch (Exception e) {
            log.error("FCM 메시지 전송 실패: {}", e.getMessage());
        }
    }
}
