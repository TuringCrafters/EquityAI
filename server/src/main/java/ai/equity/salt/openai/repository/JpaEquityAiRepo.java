package ai.equity.salt.openai.repository;

import ai.equity.salt.openai.model.EquityAi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JpaEquityAiRepo extends JpaRepository<EquityAi, Long> {
}
