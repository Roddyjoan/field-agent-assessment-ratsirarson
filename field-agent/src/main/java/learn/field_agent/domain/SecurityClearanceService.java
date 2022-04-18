package learn.field_agent.domain;

import learn.field_agent.data.SecurityClearanceRepository;
import learn.field_agent.models.Agent;
import learn.field_agent.models.SecurityClearance;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SecurityClearanceService {

    private final SecurityClearanceRepository repository;

    public SecurityClearanceService (SecurityClearanceRepository repository){
        this.repository=repository;
    }

    public List<SecurityClearance> findAll(){
        return repository.findAll();
    }

    private Result<SecurityClearance> validate(SecurityClearance securityClearance) {
        List<SecurityClearance> all = findAll();
        Result<SecurityClearance> result = new Result<>();
        if (securityClearance == null) {
            result.addMessage("Security Clearance cannot be null", ResultType.INVALID);
            return result;
        }

        if (securityClearance.getName() == null){
            result.addMessage("Security Clearance Level must have a name", ResultType.INVALID);
        }

        for (SecurityClearance s: all){
            String existing = s.getName().replaceAll("\\s+","");
            String toCheck = securityClearance.getName().replaceAll("\\s+","");
            if (existing.trim().equalsIgnoreCase(toCheck.trim())){
                result.addMessage("Security Clearance Level already Exists", ResultType.INVALID);
            }

        }

        return result;
    }


    public SecurityClearance findById(int securityClearanceId) {
        return repository.findById(securityClearanceId);
    }

    public Result<SecurityClearance> add(SecurityClearance securityClearance){
        Result<SecurityClearance> result = validate(securityClearance);
        if (!result.isSuccess()){
            return result;
        }

        if (securityClearance.getSecurityClearanceId() != 0){
            result.addMessage("Security Clearance ID cannot be set for an `add` operation", ResultType.INVALID);
            return result;
        }

        securityClearance = repository.add(securityClearance);
        result.setPayload(securityClearance);
        return result;
    }

    public Result<SecurityClearance> update(SecurityClearance securityClearance) {
        Result<SecurityClearance> result = validate(securityClearance);
        if (!result.isSuccess()) {
            return result;
        }

        if (securityClearance.getSecurityClearanceId() <= 0) {
            result.addMessage("Security Clearance ID must be set for `update` operation", ResultType.INVALID);
            return result;
        }

        if (!repository.update(securityClearance)) {
            String msg = String.format("Security Clearance ID: %s, not found", securityClearance.getSecurityClearanceId());
            result.addMessage(msg, ResultType.NOT_FOUND);
        }

        return result;
    }

    public boolean deleteById(int agentId) {
        List<SecurityClearance> all = repository.findAbleToDelete();
        for (SecurityClearance sc: all){
            if (sc.getSecurityClearanceId() == agentId){
                return repository.delete(agentId);
            }
        } return false;
    }


}
