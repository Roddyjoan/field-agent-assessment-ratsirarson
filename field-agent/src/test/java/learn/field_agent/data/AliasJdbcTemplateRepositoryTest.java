package learn.field_agent.data;

import learn.field_agent.models.Agent;
import learn.field_agent.models.Alias;
import learn.field_agent.models.SecurityClearance;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
public class AliasJdbcTemplateRepositoryTest {
    final static int NEXT_ID = 1;
    @Autowired
    AliasJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindAll(){ List<Alias> all = repository.findAll();
        assertTrue(all.size() >= 1 && all.size() <=4);
    }

    @Test
    void shouldAdd(){
        Alias alias = makeAlias();
        Alias actual = repository.add(alias);
        assertNotNull(actual);
        assertEquals(NEXT_ID, actual.getAgentId());


    }

    @Test
    void shouldUpdate(){
        Alias alias = makeAlias();
        alias.setAgentId(1);
        assertTrue(repository.update(alias));
        alias.setAgentId(13);
        assertFalse(repository.update(alias));
    }

    @Test
    void shouldDelete(){
        assertTrue(repository.deleteById(1));
        assertFalse(repository.deleteById(1));
    }

    Alias makeAlias() {
        Alias alias = new Alias();
        alias.setAgentId(1);
        alias.setName("007");
        alias.setPersona("James Bond");
        return alias;
    }
}
