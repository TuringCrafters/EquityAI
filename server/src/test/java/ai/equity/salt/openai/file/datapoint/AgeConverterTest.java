package ai.equity.salt.openai.file.datapoint;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

class AgeConverterTest {
    /**
     * Method under test: {@link AgeConverter#calculateAge(String)}
     */
    @Test
    void testCalculateAge() {
        // Arrange, Act and Assert
        assertEquals(28, AgeConverter.calculateAge("121LDFLAGS1996"));
        assertEquals(61, AgeConverter.calculateAge("Tue Apr 09 00:00:00 CET 1963"));

    }
}
