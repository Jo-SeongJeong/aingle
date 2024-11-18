package com.aintopia.aingle.common.service;

import com.aintopia.aingle.common.dto.FcmDto;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.stereotype.Service;
import org.springframework.transaction.event.TransactionalEventListener;

import java.util.Date;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ScheduledFuture;

@Service
@RequiredArgsConstructor
@Slf4j
public class FcmService {

    private final TaskScheduler taskScheduler;
    private final Map<Long, ScheduledFuture<?>> scheduledTasks = new ConcurrentHashMap<>();


    @TransactionalEventListener
    public void scheduleNotificationWithDelay(FcmDto fcmDto) {
        ScheduledFuture<?> scheduledTask  = taskScheduler.schedule(
                () -> sendNotification(fcmDto),
                new Date(System.currentTimeMillis() + (fcmDto.getDelayMinutes() * 60 * 1000))
        );
        // 게시글 ID 또는 알림 ID를 키로 사용해 작업 저장
        scheduledTasks.put(fcmDto.getAlarmId(), scheduledTask);
        log.info("Scheduled notification with delay: " + fcmDto.getDelayMinutes() + " 분 뒤에 알림을 보낼겁니다!");
    }

    public void cancelScheduledNotification(Long alarmId) {
        ScheduledFuture<?> scheduledTask = scheduledTasks.get(alarmId);
        if (scheduledTask != null) {
            scheduledTask.cancel(false); // 작업 취소
            scheduledTasks.remove(alarmId); // 작업 제거
            log.info("Scheduled notification for Alarm ID " + alarmId + " was canceled.");
        } else {
            log.info("No scheduled notification found for Alarm ID " + alarmId);
        }
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
