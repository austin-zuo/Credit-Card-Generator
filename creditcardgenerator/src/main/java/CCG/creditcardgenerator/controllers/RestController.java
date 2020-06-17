package CCG.creditcardgenerator.controllers;

import CCG.creditcardgenerator.services.CardGenerator;
import CCG.creditcardgenerator.services.CardValidator;
import org.springframework.web.bind.annotation.*;

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
        String isValid = validatorService.validate(num);
        return isValid;
    }
}
