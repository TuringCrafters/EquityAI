package ai.equity.salt.openai.file.datapoint;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

class DateConverterTest {
    /**
     * Method under test: {@link DateConverter#calculateYears(String)}
     */
    @Test
    void testCalculateDate() {
        // Arrange, Act and Assert
        assertEquals(28, DateConverter.calculateYears("121LDFLAGS1996"));
        assertEquals(61, DateConverter.calculateYears("Tue Apr 09 00:00:00 CET 1963"));

    }
}
