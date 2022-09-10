package com.tan.ecommerce.dto;


import lombok.Data;

import java.util.List;

@Data
public class PerfumeSearchFilterDto {
    List<Integer> prices;
    List<String> perfumers;
    List<String> genders;
    String perfumeGender;
    String perfumer;
}
