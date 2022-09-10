package com.tan.ecommerce.controller;


import com.tan.ecommerce.dto.PerfumeSearchFilterDto;
import com.tan.ecommerce.service.PerfumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/rest")
public class MenuRestController {
    private final PerfumeService perfumeService;

    @Autowired
    public MenuRestController(PerfumeService perfumeService) {
        this.perfumeService = perfumeService;
    }

    @PostMapping("/menu/search")
    public ResponseEntity<?> findProductsByFilterParams(@RequestBody PerfumeSearchFilterDto perfumeSearchFilterDto) {
        return new ResponseEntity<>(perfumeService.filter(
                perfumeSearchFilterDto.getPerfumers(),
                perfumeSearchFilterDto.getGenders(),
                perfumeSearchFilterDto.getPrices()),
                HttpStatus.OK);
    }

    @PostMapping("menu/gender")
    public ResponseEntity<?> findByPerfumeGender(@RequestBody PerfumeSearchFilterDto perfumeSearchFilterDto){
        return new ResponseEntity<>(perfumeService.findByPerfumeGenderOrderByPriceDesc(perfumeSearchFilterDto.getPerfumeGender()), HttpStatus.OK);
    }

    @PostMapping("/menu/perfumer")
    public ResponseEntity<?> findByPerfumer(@RequestBody PerfumeSearchFilterDto perfumeSearchFilterDto){
        return new ResponseEntity<>(perfumeService.findByPerfumerOrderByPriceDesc(perfumeSearchFilterDto.getPerfumer()), HttpStatus.OK);
    }


}
