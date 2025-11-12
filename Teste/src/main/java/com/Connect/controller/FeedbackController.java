// 7. Controller (Endpoints da API) para Feedback
package com.Connect.controller;

import com.Connect.dto.FeedbackRequestDTO;
import com.Connect.dto.FeedbackResponseDTO;
import com.Connect.service.FeedbackService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/feedbacks")
public class FeedbackController {

    private final FeedbackService feedbackService;

    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    @PostMapping
    public ResponseEntity<FeedbackResponseDTO> createFeedback(@RequestBody FeedbackRequestDTO dto) {
        try {
            FeedbackResponseDTO response = feedbackService.create(dto);
            URI location = URI.create("/api/feedbacks/" + response.getId());
            return ResponseEntity.created(location).body(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/sent/{userId}")
    public ResponseEntity<List<FeedbackResponseDTO>> getSentFeedbacks(@PathVariable Long userId) {
        List<FeedbackResponseDTO> feedbacks = feedbackService.getSentByMe(userId);
        return ResponseEntity.ok(feedbacks);
    }

    @GetMapping("/received/{userId}")
    public ResponseEntity<List<FeedbackResponseDTO>> getReceivedFeedbacks(@PathVariable Long userId) {
        List<FeedbackResponseDTO> feedbacks = feedbackService.getReceivedByMe(userId);
        return ResponseEntity.ok(feedbacks);
    }

    @DeleteMapping("/{feedbackId}/{userId}")
    public ResponseEntity<Void> deleteFeedback(@PathVariable Long feedbackId, @PathVariable Long userId) {
        try {
            feedbackService.delete(feedbackId, userId);
            return ResponseEntity.noContent().build(); // 204 OK
        } catch (RuntimeException e) {
            // Retorna 401 Unauthorized se o usuário não for o dono
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}