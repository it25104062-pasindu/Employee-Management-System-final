package com.ems.service;

import com.ems.entity.Interview;
import com.ems.repository.InterviewRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InterviewService {

    private final InterviewRepository interviewRepository;

    public InterviewService(InterviewRepository interviewRepository) {
        this.interviewRepository = interviewRepository;
    }

    public List<Interview> getAllInterviews() {
        return interviewRepository.findAll();
    }

    public Interview getInterviewById(Long id) {
        return interviewRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Interview not found with id: " + id
                        )
                );
    }

    public List<Interview> getInterviewsByApplication(Long applicationId) {
        return interviewRepository.findByApplication_Id(applicationId);
    }

    public List<Interview> getInterviewsByStatus(String status) {
        return interviewRepository.findByStatus(status);
    }

    public List<Interview> getInterviewsByType(String interviewType) {
        return interviewRepository.findByInterviewType(interviewType);
    }

    public Interview createInterview(Interview interview) {

        if (interview.getStatus() == null ||
                interview.getStatus().isBlank()) {
            interview.setStatus("Scheduled");
        }

        return interviewRepository.save(interview);
    }

    public Interview updateInterview(
            Long id,
            Interview updatedInterview) {

        Interview existingInterview = getInterviewById(id);

        existingInterview.setApplication(
                updatedInterview.getApplication()
        );

        existingInterview.setInterviewDate(
                updatedInterview.getInterviewDate()
        );

        existingInterview.setInterviewTime(
                updatedInterview.getInterviewTime()
        );

        existingInterview.setInterviewType(
                updatedInterview.getInterviewType()
        );

        existingInterview.setInterviewer(
                updatedInterview.getInterviewer()
        );

        existingInterview.setNotes(
                updatedInterview.getNotes()
        );

        existingInterview.setStatus(
                updatedInterview.getStatus()
        );

        return interviewRepository.save(existingInterview);
    }

    public void deleteInterview(Long id) {

        if (!interviewRepository.existsById(id)) {
            throw new RuntimeException(
                    "Interview not found with id: " + id
            );
        }

        interviewRepository.deleteById(id);
    }
}