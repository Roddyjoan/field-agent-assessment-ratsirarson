package learn.field_agent.domain;

import learn.field_agent.data.AliasRepository;
import learn.field_agent.models.Agent;
import learn.field_agent.models.Alias;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AliasService {

    private final AliasRepository repository;

    public AliasService(AliasRepository repository){
        this.repository=repository;
    }

    public List<Alias> findAll() {
        return repository.findAll();
    }

    public Result<Alias> add (Alias alias){
        Result<Alias> result = validate(alias);

        if (!result.isSuccess()){
            return result;
        }

        if(alias.getAliasId() != 0){
            result.addMessage("Alias ID cannot be set for an `add` operation", ResultType.INVALID);
        }

        alias = repository.add(alias);
        result.setPayload(alias);
        return result;
    }

    private Result<Alias> validate(Alias alias) {
        List<Alias> all = repository.findAll();

        Result<Alias> result = new Result<>();

        if (alias == null){
            result.addMessage("Alias cannot be null", ResultType.INVALID);
            return result;
        }

        if (alias.getName() == null){
            result.addMessage("Alias name cannot be null", ResultType.INVALID);
        }



        for (Alias a: all){
            String existing = a.getName().replaceAll("\\s+","");
            String toCheck = alias.getName().replaceAll("\\s+","");
            if (a.getAgentId() == alias.getAgentId()
                    && existing.equalsIgnoreCase(toCheck)){
                if(alias.getPersona() == null)
                {
                    result.addMessage("Duplicate Alias, Persona must not be null", ResultType.INVALID);
                    return result;
                }
            }

        }
        return result;
    }

    public Result<Alias> update(Alias alias){
        Result<Alias> result = validate(alias);
        if (!result.isSuccess()){
            return result;
        }

        if (alias.getAliasId() <= 0){
            result.addMessage("Alias ID must be set for `update` operation", ResultType.INVALID);
            return result;
        }

        if(!repository.update(alias)){
            String error = String.format("Alias ID %s not found", alias.getAliasId());
            result.addMessage(error, ResultType.NOT_FOUND);
        }

        return result;
    }

    public boolean deleteById(int aliasId){
        return repository.deleteById(aliasId);
    }
}
