package CCG.creditcardgenerator.services;

import java.util.ArrayList;

public class CardValidator {
    public Boolean validate(String cardNum) {
        Long num = Long.parseLong(cardNum);
        Long lastDigit = num % 10;
        num = num / 10;
        ArrayList<Long> digits = new ArrayList<>();
        //includes edge case where card starts with a 0
        while (num != 0) {
            digits.add(num % 10);
            num = num / 10;
        }
        for (int i = 0; i < digits.size() ; i++) {
            if (i % 2 == 0) {
                digits.set(i, digits.get(i) * 2);
            }
            if (digits.get(i) > 9) {
                digits.set(i, digits.get(i) - 9);
            }
        }
        Long sum = 0L;
        for (Long digit: digits) {
            sum += digit;
        }
        sum = sum % 10;
        return (sum + lastDigit) == 10;
    }
}
