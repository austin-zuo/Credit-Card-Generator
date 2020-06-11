package CCG.creditcardgenerator;

import CCG.creditcardgenerator.httprequests.GetRequest;
import CCG.creditcardgenerator.services.CardGenerator;
import CCG.creditcardgenerator.services.CardValidator;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CreditcardgeneratorApplication {

	public static void main(String[] args) {

		SpringApplication.run(CreditcardgeneratorApplication.class, args);
		CardGenerator g = new CardGenerator();
		CardValidator v = new CardValidator();

		for (int i = 0; i < 10; i++) {
			String num = g.genCardNumber("4815");
			System.out.println(num);
			System.out.println(v.validate(num));
		}


	}

}
