package ai.equity.salt.openai.controller.dto;

import ai.equity.salt.openai.file.datapoint.DateConverter;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

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