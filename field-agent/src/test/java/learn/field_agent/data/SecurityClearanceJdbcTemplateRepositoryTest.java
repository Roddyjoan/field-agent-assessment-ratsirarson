package learn.field_agent.data;

import learn.field_agent.models.Agent;
import learn.field_agent.models.Location;
import learn.field_agent.models.SecurityClearance;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class SecurityClearanceJdbcTemplateRepositoryTest {

    final static int NEXT_ID = 3;
    @Autowired
    SecurityClearanceJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }


    @Test
    void shouldFindById() {
        SecurityClearance secret = new SecurityClearance(1, "Secret");
        SecurityClearance topSecret = new SecurityClearance(2, "Top Secret");

        SecurityClearance actual = repository.findById(1);
        assertEquals(secret, actual);

        actual = repository.findById(2);
        assertEquals(topSecret, actual);

        actual = repository.findById(100);
        assertEquals(null, actual);
    }

    @Test
    void shouldFindAll() {
        // can't predict order
        // if delete is first, we're down to 1
        // if add is first, we may go as high as 3
        List<SecurityClearance> all = repository.findAll();
        assertTrue(all.size() >= 1 && all.size() <=3);
    }

    @Test
    void shouldAdd() {
        SecurityClearance toAdd = makeClearance();
        SecurityClearance actual = repository.add(toAdd);
        assertNotNull(actual);
        assertEquals(NEXT_ID, actual.getSecurityClearanceId());
    }

    @Test
    void shouldUpdateValidAndNotUpdateNonValid() {
        SecurityClearance securityClearance = makeClearance();
        securityClearance.setSecurityClearanceId(1);
        assertTrue(repository.update(securityClearance));
        securityClearance.setSecurityClearanceId(13);
        assertFalse(repository.update(securityClearance));
    }

    @Test
    void shouldDeleteValidIdAndNotDeleteNonValidId(){
        SecurityClearance toAdd = makeClearance();
        SecurityClearance actual = repository.add(toAdd);
        assertNotNull(actual);
        assertEquals(NEXT_ID+1, actual.getSecurityClearanceId());
        assertTrue(repository.delete(4));
        assertFalse(repository.delete(100));
    }



    SecurityClearance makeClearance(){
        SecurityClearance clearance = new SecurityClearance();
        clearance.setName("TestClearance");
        return clearance;
    }
}