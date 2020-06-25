package CCG.creditcardgenerator.services;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class CardGenerator {
    public List<String> genCards(String BIN, int amountOfCards) {
        List<String> rv = new ArrayList<>();
        for(int i = 0 ; i < amountOfCards; i++) {
            String card = BIN;
            if (BIN.equals("Visa")) {
                card = "4";
            } else if (BIN.equals("Mastercard")) {
                card = "5" + (int)(Math.random() * 5 + 1);
            } else if (BIN.equals("Discover")) {
                if (Math.random() > 0.5) {
                    card = "64";
                } else {
                    card = "65";
                }
            } else if (BIN.equals("American Express")) {
                if (Math.random() > 0.5) {
                    card = "34";
                } else {
                    card = "37";
                }
            }

            int num = 16 - card.length();
            for (int j = 0; j < num; j++) {
                card += Integer.toString(ThreadLocalRandom.current().nextInt(0, 10));
            }
            rv.add(card);
        }
        return rv;
    }
}
