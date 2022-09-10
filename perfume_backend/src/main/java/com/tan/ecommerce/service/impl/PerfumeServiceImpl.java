package com.tan.ecommerce.service.impl;

import com.tan.ecommerce.domain.Perfume;
import com.tan.ecommerce.respository.PerfumeRepository;
import com.tan.ecommerce.service.PerfumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PerfumeServiceImpl implements PerfumeService {

    private final PerfumeRepository perfumeRepository;

    @Autowired
    public PerfumeServiceImpl(PerfumeRepository perfumeRepository) {
        this.perfumeRepository = perfumeRepository;
    }


    @Override
    public Perfume findById(Long id) {
        return perfumeRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException(String.format("Not found perfume by id: %s", id)));
    }

    @Override
    public Perfume save(Perfume perfume) {
        return perfumeRepository.save(perfume);
    }

    @Override
    public void saveProductInfoById(Perfume perfume) {
        Optional<Perfume> perfumeOptional = perfumeRepository.findById(perfume.getId());
        if (perfumeOptional.isPresent()) {
            Perfume perfumeDB = perfumeOptional.get();
            perfumeDB.setPerfumeTitle(perfume.getPerfumeTitle());
            perfumeDB.setPerfume(perfume.getPerfume());
            perfumeDB.setYear(perfume.getYear());
            perfumeDB.setCountry(perfume.getCountry());
            perfumeDB.setPerfumeGender(perfume.getPerfumeGender());
            perfumeDB.setFragranceTopNotes(perfume.getFragranceTopNotes());
            perfumeDB.setFragranceMiddleNotes(perfume.getFragranceMiddleNotes());
            perfumeDB.setFragranceBaseNotes(perfume.getFragranceBaseNotes());
            perfumeDB.setDescription(perfume.getDescription());
            perfumeDB.setFilename(perfume.getFilename());
            perfumeDB.setPrice(perfume.getPrice());
            perfumeDB.setVolume(perfume.getVolume());
            perfumeDB.setType(perfume.getType());
            perfumeRepository.save(perfumeDB);
        } else {
            throw new IllegalStateException(String.format("Not found perfume with id: %s", perfume.getId()));
        }
    }

    @Override
    public List<Perfume> getAllProducts() {
        return perfumeRepository.findAll();
    }

    @Override
    public List<Perfume> filter(List<String> perfumers, List<String> genders, List<Integer> prices) {
        List<Perfume> perfumesList;
        if (!prices.isEmpty()) {
            perfumesList = perfumeRepository.findByPriceBetweenOrderByPriceDesc(prices.get(0), prices.get(1));
        } else if (!perfumers.isEmpty() && !genders.isEmpty()) {
            perfumesList = perfumeRepository.findByPerfumeInAndPerfumeGenderInOrderByPriceDesc(perfumers, genders);
        } else if (!perfumers.isEmpty() || !genders.isEmpty()) {
            perfumesList = perfumeRepository.findByPerfumeInOrPerfumeGenderInOrderByPriceDesc(perfumers, genders);
        } else {
            perfumesList = perfumeRepository.findAll();
        }
        return perfumesList;
    }

    @Override
    public List<Perfume> findByPerfumeGenderOrderByPriceDesc(String gender) {
        return perfumeRepository.findByPerfumeGenderOrderByPriceDesc(gender);
    }

    @Override
    public List<Perfume> findByPerfumerOrderByPriceDesc(String perfumer) {
        return perfumeRepository.findByPerfumeOrderByPriceDesc(perfumer);
    }
}
