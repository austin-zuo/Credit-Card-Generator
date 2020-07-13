package CCG.creditcardgenerator.controllers;

import CCG.creditcardgenerator.services.CardGenerator;
import CCG.creditcardgenerator.services.CardValidator;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@org.springframework.web.bind.annotation.RestController
public class RestController {
    private CardValidator validatorService;
    private CardGenerator generatorService;

    private static final Logger LOG = LogManager.getLogger(RestController.class);
    public RestController(CardValidator validatorService, CardGenerator generatorService) {
        this.validatorService = validatorService;
        this.generatorService = generatorService;
    }

    @CrossOrigin
    @RequestMapping(value="/rest/validator/{num}", method = RequestMethod.GET)
    public String validateNum(@PathVariable("num") String num){
        LOG.info("Sucessfully called validateNum.");
        return validatorService.validate(num);
    }
    

    @CrossOrigin
    @RequestMapping(value="/rest/generator/{bin}/{amount}", method = RequestMethod.GET)
    public List<String> generateCards(@PathVariable("bin") String bin, @PathVariable("amount") int amount) {
        List<String> rv = generatorService.genCards(bin, amount);
        LOG.info("Sucessfully called generateCards to generate " + amount + " number of cards.");
        return rv;
    }

    @RequestMapping(value="/hello")
    public String home() {
        return "Hello from home";
    }
}
