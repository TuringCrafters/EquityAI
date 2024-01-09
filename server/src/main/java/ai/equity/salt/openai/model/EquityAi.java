package ai.equity.salt.openai.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class EquityAi {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;
    String prompt;
    String response;

    public EquityAi(String prompt, String response) {
        this.prompt = prompt;
        this.response = response;
    }

    public EquityAi() {}
}
