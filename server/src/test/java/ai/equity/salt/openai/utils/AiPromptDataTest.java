package ai.equity.salt.openai.utils;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;

import org.junit.jupiter.api.Test;

class AiPromptDataTest {

    /**
     * Method under test: {@link AiPromptData#datapointFields()}
     */
    @Test
    void testDatapointFields() {
        // Arrange and Act
        List<String> actualDatapointFieldsResult = AiPromptData.datapointFields();

        // Assert
        assertEquals("id", actualDatapointFieldsResult.get(0));
        assertEquals("gender", actualDatapointFieldsResult.get(1));
        assertEquals("age", actualDatapointFieldsResult.get(2));
        assertEquals("position", actualDatapointFieldsResult.get(3));
        assertEquals("salary", actualDatapointFieldsResult.get(4));
        assertEquals("currency", actualDatapointFieldsResult.get(5));
        assertEquals("experience", actualDatapointFieldsResult.get(6));
        assertEquals("geographicLocation", actualDatapointFieldsResult.get(7));
        assertEquals(8, actualDatapointFieldsResult.size());
    }
}
