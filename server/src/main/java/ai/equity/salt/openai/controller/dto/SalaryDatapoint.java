package ai.equity.salt.openai.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class SalaryDatapoint<T>{
    private T dataValue;
    private SalaryRangeDatapoint salary;
}