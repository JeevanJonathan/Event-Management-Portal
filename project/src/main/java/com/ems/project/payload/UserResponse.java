package com.ems.project.payload;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
public class UserResponse {
    private List<UserDTO> users;
    private Integer pageNumber;
    private Integer pageSize;
    private Long totalElements;
    private Integer totalPages;
    private boolean lastPage;
}
