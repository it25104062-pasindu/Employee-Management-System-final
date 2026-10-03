package com.ems.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "recruitment_stages")
public class RecruitmentStage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "application_id", nullable = false)
    private Application application;

    @Column(name = "stage_name", nullable = false)
    private String stageName;

    @Column(name = "stage_date")
    private java.time.LocalDate stageDate;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(nullable = false)
    private String status = "Pending";

    public RecruitmentStage() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Application getApplication() {
        return application;
    }

    public void setApplication(Application application) {
        this.application = application;
    }

    public String getStageName() {
        return stageName;
    }

    public void setStageName(String stageName) {
        this.stageName = stageName;
    }

    public java.time.LocalDate getStageDate() {
        return stageDate;
    }

    public void setStageDate(java.time.LocalDate stageDate) {
        this.stageDate = stageDate;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}