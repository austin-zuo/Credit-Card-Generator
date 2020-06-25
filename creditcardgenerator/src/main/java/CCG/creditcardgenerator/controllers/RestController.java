package CCG.creditcardgenerator.controllers;

import CCG.creditcardgenerator.services.CardGenerator;
import CCG.creditcardgenerator.services.CardValidator;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@org.springframework.web.bind.annotation.RestController
public class RestController {
    private CardValidator validatorService;
    private CardGenerator generatorService;

    public RestController(CardValidator validatorService, CardGenerator generatorService) {
        this.validatorService = validatorService;
        this.generatorService = generatorService;
    }

    @CrossOrigin
    @RequestMapping(value="/rest/validator/{num}", method = RequestMethod.GET)
    public String validateNum(@PathVariable("num") String num){
        return validatorService.validate(num);
    }

    @CrossOrigin
    @RequestMapping(value="/rest/generator/{bin}/{amount}", method = RequestMethod.GET)
    public List<String> generateCards(@PathVariable("bin") String bin, @PathVariable("amount") int amount) {
        System.out.println("reached");
        List<String> rv = generatorService.genCards(bin, amount);
        System.out.println("after");
        return rv;
    }
}
