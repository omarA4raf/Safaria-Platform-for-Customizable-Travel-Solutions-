package com.safaria.backend.DTO;

import com.safaria.backend.entity.Report;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
@Data
public class ReportDTO {
    private Integer report_id;

    private String  reporting_user_username;

    private String reported_user_username;

    private String comment;

    private LocalDateTime createdAt;
    // type :0 --> tourist, :1--> tourProvider

    private Boolean reporting_user_type;

    private Boolean reported_user_type;

    private Integer blogId;

    public ReportDTO(Report report){
        this.report_id=report.getReport_id();
        this.reporting_user_username=report.getReporting_user_username();
        this.reported_user_username= report.getReported_user_username();
        this.reporting_user_type=report.getReporting_user_type();
        this.reported_user_type=report.getReported_user_type();
        this.comment=report.getComment();
        this.createdAt=report.getCreatedAt();
        this.blogId=report.getBlogId();
    }
    public ReportDTO() {}
}
