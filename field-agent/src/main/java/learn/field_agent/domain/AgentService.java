package learn.field_agent.domain;

import learn.field_agent.data.AgentRepository;
import learn.field_agent.data.AppUserRepository;
import learn.field_agent.models.Agent;
import learn.field_agent.models.AppUser;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.time.LocalDate;
import java.util.List;

@Service
public class AgentService {


    private final AgentRepository aRepository;

    AppUserRepository uRepo;

    public AgentService(AgentRepository aRepository) {
        this.aRepository = aRepository;
    }

    public List<Agent> findAll() {
        return aRepository.findAll();
    }

    public Agent findById(int agentId) {
        return aRepository.findById(agentId);
    }

    public Result<Agent> add(Agent agent) {
        Result<Agent> result = validate(agent);
        if (!result.isSuccess()) {
            return result;
        }

        if (agent.getAgentId() != 0) {
            result.addMessage("agentId cannot be set for `add` operation", ResultType.INVALID);
            return result;
        }

        agent = aRepository.add(agent);
        result.setPayload(agent);
        return result;
    }

    public Result<Agent> update(Agent agent) {
        Result<Agent> result = validate(agent);
        if (!result.isSuccess()) {
            return result;
        }

        if (agent.getAgentId() <= 0) {
            result.addMessage("agentId must be set for `update` operation", ResultType.INVALID);
            return result;
        }

        if (!aRepository.update(agent)) {
            String msg = String.format("agentId: %s, not found", agent.getAgentId());
            result.addMessage(msg, ResultType.NOT_FOUND);
        }

        return result;
    }

    public boolean deleteById(int agentId) {
        return aRepository.deleteById(agentId);
    }

    private Result<Agent> validate(Agent agent) {
        Result<Agent> result = new Result<>();
        if (agent == null) {
            result.addMessage("agent cannot be null", ResultType.INVALID);
            return result;
        }

        if (Validations.isNullOrBlank(agent.getFirstName())) {
            result.addMessage("firstName is required", ResultType.INVALID);
        }

        if (Validations.isNullOrBlank(agent.getLastName())) {
            result.addMessage("lastName is required", ResultType.INVALID);
        }

        if (agent.getDob() != null && agent.getDob().isAfter(LocalDate.now().minusYears(12))) {
            result.addMessage("agents younger than 12 are not allowed", ResultType.INVALID);
        }

        if (agent.getHeightInInches() < 36 || agent.getHeightInInches() > 96) {
            result.addMessage("height must be between 36 and 96 inches", ResultType.INVALID);
        }

        return result;
    }

    public void edit(Agent edited) {

    }

//    public void edit(Agent edited, Principal user) {
//        if( edited == null ){ throw new IllegalArgumentException( "agent is null" );}
//
//        Agent oldData = aRepository.findById(edited.getAgentId());
//
//        if (oldData == null) { throw new IllegalArgumentException( "invalid agent id" );}
//
//        if (edited.getFirstName() == null) { throw new IllegalArgumentException( "first name cannot be null" );}
//        if (edited.getLastName() == null){ throw new IllegalArgumentException( "last name cannot be null" );}
//
//        AppUser matchingUser = uRepo.findById (edited.getUserId());
//    }
}
