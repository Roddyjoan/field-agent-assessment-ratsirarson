package learn.field_agent.domain;


import learn.field_agent.data.AliasRepository;
import learn.field_agent.models.Alias;
import learn.field_agent.models.SecurityClearance;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
public class AliasServiceTest {

    @Autowired
    AliasService service;

    @MockBean
    AliasRepository repository;

    Alias makeAlias() {
        Alias alias = new Alias();
        alias.setAgentId(1);
        alias.setName("007");
        return alias;
    }

    @Test
    void shouldAdd() {
        Alias toAdd = makeAlias();
        Alias ToCheck = makeAlias();
        ToCheck.setAliasId(1);
        when(repository.add(toAdd)).thenReturn(ToCheck);
        Result<Alias> actual = service.add(toAdd);
        assertEquals(ResultType.SUCCESS, actual.getType());
        assertEquals(ToCheck, actual.getPayload());
    }


    @Test
    void shouldReturnInvalid() {
        Alias shouldNotAdd = null;
        Result<Alias> actual = service.add(shouldNotAdd);
        assertEquals(ResultType.INVALID, actual.getType());

    }

    @Test
    void shouldNotAddDuplicateNameIfEmptyPersona() {
        List<Alias> all = new ArrayList<>();
        when(repository.findAll()).thenReturn(all);
        Alias toAdd = makeAlias();
        when(repository.add(toAdd)).thenReturn(toAdd);
        Result<Alias> actual = service.add(toAdd);
        assertEquals(ResultType.SUCCESS, actual.getType());
        Alias toFail = makeAlias();
        all.add(toAdd);
        when(repository.add(toFail)).thenReturn(toFail);
        Result<Alias> fails = service.add(toFail);
        assertEquals(ResultType.INVALID, fails.getType());

    }
    @Test
    void shouldUpdate() {
        Alias toUpdate = makeAlias();
        toUpdate.setAliasId(1);
        when(repository.update(toUpdate)).thenReturn(true);
        Result<Alias> actual = service.update(toUpdate);
        assertEquals(ResultType.SUCCESS, actual.getType());
    }
    @Test
    void shouldNotUpdateNonExisting() {
        Alias nonExisting = makeAlias();
        nonExisting.setAliasId(Integer.MAX_VALUE);
        when(repository.update(nonExisting)).thenReturn(false);
        Result<Alias> actual = service.update(nonExisting);
        assertEquals(ResultType.NOT_FOUND, actual.getType());
    }

    @Test
    void shouldDelete(){
        List<Alias> all = new ArrayList<>();
        when(repository.findAll()).thenReturn(all);
        Alias toAdd = makeAlias();
        when(repository.add(toAdd)).thenReturn(toAdd);
        Result<Alias> actual = service.add(toAdd);
        assertEquals(ResultType.SUCCESS, actual.getType());
        when(repository.deleteById(1)).thenReturn(true);
        assertTrue(service.deleteById(1));

    }

}
