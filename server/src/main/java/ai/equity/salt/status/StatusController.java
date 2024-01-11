package ai.equity.salt.status;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.HttpStatus.OK;
import static org.springframework.web.bind.annotation.RequestMethod.HEAD;

@RestController
@RequestMapping("api/v1/status")
public class StatusController {

    @RequestMapping(method = {HEAD})
    @ResponseStatus(OK)
    public void status(){
    /*
    Only returns the status code 200
     */
    }
}
