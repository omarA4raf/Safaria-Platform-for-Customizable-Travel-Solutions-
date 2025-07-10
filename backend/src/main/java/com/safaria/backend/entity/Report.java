package com.safaria.backend.entity;

import com.safaria.backend.DTO.ReportDTO;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Report") // Explicitly set the table name
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "report_id")
    private Integer report_id;
    @Column(name = "reporting_user_username")
    private String reporting_user_username;

    @Column(name = "reported_user_username")
    private String reported_user_username;

    @Column(name = "comment")
    private String comment;
    @Column(name = "blogId")
    private Integer blogId;
    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    // type :0 --> tourist, :1--> tourProvider
    @Column(name = "reporting_user_type")
    private Boolean reporting_user_type;
    @Column(name = "reported_user_type")
    private Boolean reported_user_type;

    public Report(ReportDTO reportDTO) {
        this.reporting_user_username = reportDTO.getReporting_user_username();
        this.reported_user_username = reportDTO.getReported_user_username();
        this.reporting_user_type = reportDTO.getReporting_user_type();
        this.reported_user_type = reportDTO.getReported_user_type();
        this.comment = reportDTO.getComment();
        this.createdAt = LocalDateTime.now();
        this.blogId = reportDTO.getBlogId();
    }
}
