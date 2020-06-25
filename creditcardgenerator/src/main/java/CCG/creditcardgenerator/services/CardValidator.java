package CCG.creditcardgenerator.services;

import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class CardValidator {
    // Returns a string that says whether cardNum is a valid credit card number and if valid
    // gives the brand. Currently can identify as VISA, Mastercard, Amex, Discover, or other.
    // Uses data from https://www.chargebackgurus.com/blog/bank-identification-number
    // Tested using this data from this link https://formvalidation.io/guide/validators/credit-card/
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
            return "Invalid credit card number";
        } else {
            if (cardNum.charAt(0) == '0') {
                return "Valid credit card number of a small issuer";
            } else if (cardNum.charAt(0) == '4') {
                return "Valid Visa card";
            } else if (cardNum.substring(0,2).equals("34") || cardNum.substring(0,2).equals("37")) {
                return "Valid American Express card";
            } else {
                Long firstSixDigits = Long.parseLong(cardNum);
                while (firstSixDigits > 999999) {
                    firstSixDigits /= 10;
                }
                Long firstFourDigits = Long.parseLong(cardNum);
                while (firstFourDigits > 9999) {
                    firstFourDigits /= 10;
                }
                if ((firstSixDigits >= 622126 && firstSixDigits <= 622925)
                        || (firstSixDigits >= 624000 && firstSixDigits <= 626999)
                        || (firstSixDigits >= 628200 && firstSixDigits <= 628899)
                        || cardNum.substring(0,4).equals("6011")
                        || cardNum.substring(0,2).equals("64")
                        || cardNum.substring(0,2).equals("65")) {
                    return "Valid Discover card";
                } else if ((firstFourDigits >= 2221 && firstFourDigits <= 2720)
                        || cardNum.substring(0,2).equals("51")
                        || cardNum.substring(0,2).equals("52")
                        || cardNum.substring(0,2).equals("53")
                        || cardNum.substring(0,2).equals("54")
                        || cardNum.substring(0,2).equals("55")) {
                    return "Valid Mastercard card";
                } else {
                    return "Valid credit card number of small issuer";
                }
            }
        }
    }
}
