package com.ems.project.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentDTO {
    private Long paymentId;
    private Double amount;
    private LocalDate paymentDate;
    private String paymentMethod;
    private String status;
}
