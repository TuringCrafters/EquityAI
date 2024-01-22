package ai.equity.salt.openai.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;

import java.util.List;

import static org.hibernate.type.SqlTypes.LONG32VARCHAR;

@Getter
@Setter
@Entity
public class EquityAi {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;
    @Lob
    @JdbcTypeCode(LONG32VARCHAR)
    private List<String> userData;
    @Lob
    @JdbcTypeCode(LONG32VARCHAR)
    private String response;
    @Lob
    @JdbcTypeCode(LONG32VARCHAR)
    private String recommendation;

    public EquityAi(List<String> userData, String response, String recommendation) {
        this.userData = userData;
        this.response = response;
        this.recommendation = recommendation;
    }

    public EquityAi() {}
}
