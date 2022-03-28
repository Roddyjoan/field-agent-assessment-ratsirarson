package learn.field_agent.data;

import learn.field_agent.data.mappers.AliasMapper;
import learn.field_agent.models.Alias;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class AliasJdbcTemplateRepository implements AliasRepository{

    private final JdbcTemplate template;

    public AliasJdbcTemplateRepository(JdbcTemplate template){
        this.template=template;
    }

    @Override
    public List<Alias> findAll() {
        //ONLY TO BE USED TO SATISFY DOMAIN RULES OF CHANGING PERSONA IF NAME IS THE SAME
        final String sql = "select * from alias;";
        return template.query(sql, new AliasMapper());
    }

    @Override
    public Alias add(Alias alias) {
        final String sql = "insert into alias(`name`,persona,agent_id) values (?,?,?);";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = template.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, alias.getName());
            ps.setString(2, alias.getPersona());
            ps.setInt(3,alias.getAgentId());
            return ps;
        }, keyHolder);

        if (rowsAffected<= 0){
            return null;
        }

        alias.setAliasId(keyHolder.getKey().intValue());
        return alias;
    }

    @Override
    public boolean update(Alias alias) {

        final String sql = "update alias set "
                + "`name` = ?, "
                + "persona = ? "
                + "where agent_id = ?;";

        return template.update(sql,
                alias.getName(),
                alias.getPersona(),
                alias.getAgentId()) > 0;
    }

    @Override
    public boolean deleteById(int aliasId) {
        final String sql = "delete from alias where alias_id = ? ;";
        return template.update(sql,aliasId)>0;
    }
}
