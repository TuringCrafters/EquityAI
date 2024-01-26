package ai.equity.salt.openai.controller.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@NoArgsConstructor
@ToString
public class JobDataSet {
    private String id;
    private String gender;
    private int age;
    private String position;
    private double salary;
    private String currency;
    private int experience;
    private String geographicLocation;
}