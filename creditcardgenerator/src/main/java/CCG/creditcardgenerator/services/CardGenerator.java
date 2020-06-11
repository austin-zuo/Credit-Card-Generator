package CCG.creditcardgenerator.services;

import org.springframework.stereotype.Service;

import java.util.concurrent.ThreadLocalRandom;

@Service
public class CardGenerator {
    public String genCardNumber(String BIN) {
        String rv = BIN;
        int num = 16 - BIN.length();
        for (int i = 0; i < num ; i++) {
            rv += Integer.toString(ThreadLocalRandom.current().nextInt(0, 10));
        }
        return rv;
    }
}
