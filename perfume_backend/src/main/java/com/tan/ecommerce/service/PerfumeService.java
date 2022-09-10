package com.tan.ecommerce.service;

import com.tan.ecommerce.domain.Perfume;

import java.util.List;

public interface PerfumeService {
    Perfume findById(Long id);

    Perfume save(Perfume perfume);

    void saveProductInfoById(Perfume perfume);

    List<Perfume> getAllProducts();

    List<Perfume> filter(List<String> perfumers, List<String> genders, List<Integer> prices);

    List<Perfume> findByPerfumeGenderOrderByPriceDesc(String gender);

    List<Perfume> findByPerfumerOrderByPriceDesc(String perfumer);
}
