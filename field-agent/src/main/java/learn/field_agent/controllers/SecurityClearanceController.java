package learn.field_agent.controllers;

import learn.field_agent.domain.Result;
import learn.field_agent.domain.SecurityClearanceService;
import learn.field_agent.models.Agent;
import learn.field_agent.models.SecurityClearance;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api/security/clearance")
public class SecurityClearanceController {
    private final SecurityClearanceService service;

    public SecurityClearanceController(SecurityClearanceService service) {
        this.service = service;
    }

    @GetMapping
    public List<SecurityClearance> findAll() {
        return service.findAll();
    }

    @GetMapping("/{securityClearanceId}")
    public ResponseEntity<SecurityClearance> findById(@PathVariable int securityClearanceId) {
        SecurityClearance toFind = service.findById(securityClearanceId);
        if (toFind != null) {
            return ResponseEntity.ok(toFind);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody SecurityClearance securityClearance) {
        Result<SecurityClearance> result = service.add(securityClearance);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PutMapping("/{securityClearanceId}")
    public ResponseEntity<Object> update(@PathVariable int securityClearanceId, @RequestBody SecurityClearance securityClearance) {
        if (securityClearanceId != securityClearance.getSecurityClearanceId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        Result<SecurityClearance> result = service.update(securityClearance);
        if (result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return ErrorResponse.build(result);
    }
    @DeleteMapping("/{securityClearanceId}")
    public ResponseEntity<Void> deleteById(@PathVariable int securityClearanceId) {
        if (service.deleteById(securityClearanceId)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
