package ai.equity.salt.openai.controller.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class JobDataSet {

    private String position;
    private double salary;
    private int experience;
    private int age;
    private String locality;

    @Override
    public String toString(){
        return position + "," + salary + "," + experience + "," + age + "," + locality;
    }
}
