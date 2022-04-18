package learn.field_agent.domain;

import learn.field_agent.data.SecurityClearanceRepository;
import learn.field_agent.models.Agent;
import learn.field_agent.models.SecurityClearance;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

import java.beans.Transient;
import java.util.ArrayList;
import java.util.List;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
public class SecurityClearanceServiceTest {

    @Autowired
    SecurityClearanceService service;

    @MockBean
    SecurityClearanceRepository repository;


    //make secret clearance
    SecurityClearance makeClearance(){
        SecurityClearance clearance = new SecurityClearance();
        clearance.setSecurityClearanceId(1);
        clearance.setName("Area51TopSecret");
        return clearance;
    }

    @Test
    void shouldFindArea51TopSecret(){
        SecurityClearance expected = makeClearance();
        when(repository.findById(1)).thenReturn(expected);
        SecurityClearance actual = service.findById(1);
        assertEquals(expected, actual);
    }

    @Test
    void shouldAdd(){
        SecurityClearance clearance = new SecurityClearance();
        clearance.setName("Area52TopSecret");
        Result<SecurityClearance> result = service.add(clearance);
        assertEquals(ResultType.SUCCESS, result.getType());
    }
    @Test
    void shouldNotAddWhenInvalid() {
        SecurityClearance securityClearance = makeClearance();
        Result<SecurityClearance> result = service.add(securityClearance);
        assertEquals(ResultType.INVALID, result.getType());

        securityClearance.setSecurityClearanceId(0);
        securityClearance.setName(null);
        result = service.add(securityClearance);
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldNotAddWhenValidIfSettingId() {
        SecurityClearance expected = makeClearance();
        SecurityClearance arg = makeClearance();
        arg.setSecurityClearanceId(0);

        when(repository.add(arg)).thenReturn(expected);
        Result<SecurityClearance> result = service.add(arg);
        assertEquals(ResultType.SUCCESS, result.getType());

        assertEquals(expected, result.getPayload());
    }

    @Test
    void shouldUpdate() {
        SecurityClearance toUpdate = makeClearance();
        toUpdate.setSecurityClearanceId(1);
        when(repository.update(toUpdate)).thenReturn(true);
        Result<SecurityClearance> actual = service.update(toUpdate);
        assertEquals(ResultType.SUCCESS, actual.getType());
        assertEquals(toUpdate.getName(), "Area51TopSecret");
    }
    @Test
    void shouldNotUpdateNonExisting() {
        SecurityClearance toUpdate = makeClearance();
        toUpdate.setSecurityClearanceId(1000);
        when(repository.update(toUpdate)).thenReturn(false);
        Result<SecurityClearance> actual = service.update(toUpdate);
        assertEquals(ResultType.NOT_FOUND, actual.getType());
    }

    @Test
    void shouldDeleteValidIdAndNotDeleteNonValidId() {
        List<SecurityClearance> all = new ArrayList<>();
        SecurityClearance clearance = new SecurityClearance();
        clearance.setSecurityClearanceId(4);
        clearance.setName("Area52TopSecret");
        all.add(clearance);
        when(repository.findAbleToDelete()).thenReturn(all);
        when(repository.delete(4)).thenReturn(true);
        assertTrue(service.deleteById(4));
        assertFalse(service.deleteById(10));
    }



}
