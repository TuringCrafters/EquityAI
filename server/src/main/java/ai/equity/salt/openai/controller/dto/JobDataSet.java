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

    public JobDataSet(List<String> rowData) {
        this.id = rowData.get(0);
        this.gender = rowData.get(1);
        this.age = DateConverter.calculateYears(rowData.get(2));
        this.experience = DateConverter.calculateYears(rowData.get(3));
        this.position = rowData.get(4);
        this.salary = Double.parseDouble(rowData.get(5));
        this.currency = rowData.get(10);
        this.geographicLocation = rowData.get(9);
    }
}