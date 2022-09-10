package com.tan.ecommerce.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "orders")
@EqualsAndHashCode(of = {"id", "user", "perfumeList"})
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank(message = "Fill in the input field")
    private Double totalPrice;

    private LocalDate date;

    @NotBlank(message = "Fill in the input field")
    private String firstName;

    @NotBlank(message = "Fill in the input field")
    private String lastName;

    @NotBlank(message = "Fill in the input field")
    private String city;

    @NotBlank(message = "Fill in the input field")
    private String address;

    @Email(message = "Incorrect email")
    @NotBlank(message = "Email cannot be empty")
    private String email;

    @NotBlank(message = "Phone number cannot be empty")
    private String phoneNumber;

    @NotNull(message = "Post index cannot be empty")
    @Min(value = 5, message = "Post index must contain 5 digits")
    private Integer postIndex;

    @OrderColumn
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            inverseJoinColumns = @JoinColumn(name = "perfume_list_id")

    )
    private List<Perfume> perfumeList;

    @ManyToOne
    private AppUser user;

    public Order(AppUser user){
        this.date = LocalDate.now();
        this.user = user;
        this.perfumeList = new ArrayList<>();
    }


}
