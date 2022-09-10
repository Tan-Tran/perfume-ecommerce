package com.tan.ecommerce.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.hibernate.validator.constraints.Length;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = {"id", "perfume", "perfumeTitle", "perfumeGender", "price"})
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Builder
public class Perfume {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank(message = "Fill in the input field")
    @Length(max = 255)
    private String perfumeTitle;

//    @NotBlank(message = "Fill in the input field")
//    @Length(max = 255)
//    @Column(name = "perfumer")
    @Nullable
    private String perfume;

    @NotBlank(message = "Fill in the input field")
    private Integer year;

    @NotBlank(message = "Fill in the input field")
    @Length(max = 255)
    private String country;

    @NotBlank(message = "Fill in the input field")
    @Length(max = 255)
    private String perfumeGender;

    @NotBlank(message = "Fill in the input field")
    @Length(max = 255)
    private String fragranceTopNotes;

    @NotBlank(message = "Fill in the input field")
    @Length(max = 255)
    private String fragranceMiddleNotes;

    @NotBlank(message = "Fill in the input field")
    @Length(max = 255)
    private String fragranceBaseNotes;

    private String description;

    private String filename;

    @NotBlank(message = "Fill in the input field")
    private Integer price;

    @NotBlank(message = "Fill in the input field")
    @Length(max = 255)
    private String volume;

    @NotBlank(message = "Fill in the input field")
    @Length(max = 255)
    private String type;

    @OneToMany
    private List<Review> reviews;
}
