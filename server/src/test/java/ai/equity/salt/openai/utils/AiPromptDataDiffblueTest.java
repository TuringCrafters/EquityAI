package ai.equity.salt.openai.utils;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;

import org.junit.jupiter.api.Test;

class AiPromptDataDiffblueTest {

    /**
     * Method under test: {@link AiPromptData#datapointFields()}
     */
    @Test
    void testDatapointFields() {
        // Arrange and Act
        List<String> actualDatapointFieldsResult = AiPromptData.datapointFields();

        // Assert
        assertEquals(8, actualDatapointFieldsResult.size());
        assertEquals("age", actualDatapointFieldsResult.get(2));
        assertEquals("currency", actualDatapointFieldsResult.get(5));
        assertEquals("experience", actualDatapointFieldsResult.get(6));
        assertEquals("gender", actualDatapointFieldsResult.get(1));
        assertEquals("geographicLocation", actualDatapointFieldsResult.get(7));
        assertEquals("id", actualDatapointFieldsResult.get(0));
        assertEquals("position", actualDatapointFieldsResult.get(3));
        assertEquals("salary", actualDatapointFieldsResult.get(4));
    }
}
