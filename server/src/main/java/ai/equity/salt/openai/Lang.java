package ai.equity.salt.openai;

public class Lang {
    LanguageModel model = OpenAiLanguageModel.builder()
            .apiKey(System.getenv("OPENAI_API_KEY"))
            .organizationId(System.getenv("OPENAI_ORGANIZATION_ID"))
            .logRequests(true)
            .logResponses(true)
            .build();
}