package CCG.creditcardgenerator.httprequests;

import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.sql.SQLOutput;
import java.util.concurrent.ThreadLocalRandom;

// https://api.bincodes.com/cc-gen/json/9fc53b3db09ca830488d19546a4fc2a1/'BIN#'/
@Component
public class GetRequest {
    private HttpURLConnection con;
    private String cardNum;

    public String genCard(String BIN) throws IOException {

        var url = "https://api.bincodes.com/cc-gen/json/9fc53b3db09ca830488d19546a4fc2a1/" + BIN + "/";
        try {
            var myurl = new URL(url);
            con = (HttpURLConnection) myurl.openConnection();

            con.setRequestMethod("GET");

            StringBuilder content;

            try (BufferedReader in = new BufferedReader(
                    new InputStreamReader(con.getInputStream()))) {
                String line;
                content = new StringBuilder();

                while ((line = in.readLine()) != null) {
                    content.append(line);
                    content.append(System.lineSeparator());
                }
            }
            System.out.println(content.toString());
        } finally {
            con.disconnect();
        }
        return null;
    }


}
