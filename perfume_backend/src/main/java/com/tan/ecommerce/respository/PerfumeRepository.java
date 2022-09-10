package com.tan.ecommerce.respository;

import com.tan.ecommerce.domain.Perfume;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PerfumeRepository extends JpaRepository<Perfume, Long> {
//    findByPriceBetweenOrderByPriceDesc
    List<Perfume> findByPriceBetweenOrderByPriceDesc(Integer minPrice, Integer maxPrice);
//    findByPerfumerInAndPerfumeGenderInOrderByPriceDesc
    List<Perfume> findByPerfumeInAndPerfumeGenderInOrderByPriceDesc(List<String> perfumes, List<String> genders);
//    findByPerfumerInOrPerfumeGenderInOrderByPriceDesc
    List<Perfume> findByPerfumeInOrPerfumeGenderInOrderByPriceDesc(List<String> perfumes, List<String> genders);

    List<Perfume> findByPerfumeGenderOrderByPriceDesc(String gender);

    List<Perfume> findByPerfumeOrderByPriceDesc(String perfumer);
}
