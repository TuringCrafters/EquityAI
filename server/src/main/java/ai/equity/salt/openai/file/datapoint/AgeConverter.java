package ai.equity.salt.openai.file.datapoint;

import lombok.extern.slf4j.Slf4j;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;

@Slf4j
public class AgeConverter {

    private AgeConverter() {
    }

    public static int calculateAge(String dateOfBirth) {
        int currentYear = LocalDate.now().getYear();
        List<Integer> fourConsecutiveNumbers = new ArrayList<>();
        int stringLength = dateOfBirth.length();

        for (int i = 0; i <= stringLength - 4; i++) {
            String maybeDob = dateOfBirth.substring(i, i + 4);
            try {
                int year = Integer.parseInt(maybeDob);
                fourConsecutiveNumbers.add(year);
            } catch (NumberFormatException e) {
                log.error("Unable to parse this string into int: " + maybeDob);
            }
        }

        int dobYear = fourConsecutiveNumbers.stream().filter(getReasonableDob()).toList().getFirst();

        return currentYear - dobYear;
    }

    private static Predicate<Integer> getReasonableDob() {
        return year -> year > 1900 && year < 2024;
    }

}