package CCG.creditcardgenerator.services;

import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class CardValidator {

    public String validate(String cardNum) {
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
        if ((sum + lastDigit) != 10) {
            return "This is not a valid card number.";
        } else {
            return "This is a valid card number";
        }
    }
}
