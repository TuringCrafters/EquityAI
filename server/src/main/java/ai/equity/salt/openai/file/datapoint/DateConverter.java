package ai.equity.salt.openai.file.datapoint;

import lombok.extern.slf4j.Slf4j;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;

@Slf4j
public class DateConverter {

    private DateConverter() {
    }

    public static int calculateYears(String givenDate) {
        int currentYear = LocalDate.now().getYear();
        List<Integer> fourConsecutiveNumbers = new ArrayList<>();
        int stringLength = givenDate.length();

        for (int i = 0; i <= stringLength - 4; i++) {
            String potentialYear = givenDate.substring(i, i + 4);
            try {
                int year = Integer.parseInt(potentialYear);
                fourConsecutiveNumbers.add(year);
            } catch (NumberFormatException e) {
                log.error("Unable to parse this string into int: " + potentialYear);
            }
        }

        int originYear = fourConsecutiveNumbers.stream().filter(getReasonableYear()).toList().getFirst();

        return currentYear - originYear;
    }

    private static Predicate<Integer> getReasonableDob() {
        return year -> year > 1900 && year < 2024;
    }

}