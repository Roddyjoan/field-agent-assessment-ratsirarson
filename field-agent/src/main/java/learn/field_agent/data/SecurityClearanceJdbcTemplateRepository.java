package learn.field_agent.data;

import learn.field_agent.data.mappers.SecurityClearanceMapper;
import learn.field_agent.models.SecurityClearance;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class SecurityClearanceJdbcTemplateRepository implements SecurityClearanceRepository {

    private final JdbcTemplate jdbcTemplate;

    public SecurityClearanceJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public SecurityClearance findById(int securityClearanceId) {

        final String sql = "select security_clearance_id, name as security_clearance_name "
                + "from security_clearance "
                + "where security_clearance_id = ?;";

        return jdbcTemplate.query(sql, new SecurityClearanceMapper(), securityClearanceId)
                .stream()
                .findFirst().orElse(null);
    }

    @Override
    public List<SecurityClearance> findAll() {
       final String sql = "select security_clearance_id, `name` as security_clearance_name from security_clearance;";

       return jdbcTemplate.query(sql, new SecurityClearanceMapper());
    }

    @Override
    public List<SecurityClearance> findAbleToDelete(){
        final String sql = "select sc.security_clearance_id,sc.`name` as security_clearance_name from security_clearance sc " +
                "left join agency_agent aa on sc.security_clearance_id=aa.security_clearance_id " +
                "left join agent agent on aa.agent_id = agent.agent_id " +
                "left join agency agency on aa.agency_id = agency.agency_id " +
                "where aa.agency_id is null and aa.agent_id is null;";
        return jdbcTemplate.query(sql, new SecurityClearanceMapper());
    }

//    @Transactional
//    public boolean deleteById(int securityClearanceId) {
//        jdbcTemplate.update("delete from agency_agent where security_clearance_id = ?", securityClearanceId);
//        return jdbcTemplate.update("delete from security_clearance where security_clearance_id = ?", securityClearanceId) > 0;
//    }

    @Override
    public SecurityClearance add(SecurityClearance securityClearance) {
        final String sql = "insert into security_clearance(`name`) values (?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, securityClearance.getName());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        securityClearance.setSecurityClearanceId(keyHolder.getKey().intValue());
        return securityClearance;

    }

    @Override
    public boolean update(SecurityClearance securityClearance) {
        final String sql = "update security_clearance set "
                + "`name` = ? "
                + "where security_clearance_id = ?;";

        return jdbcTemplate.update(sql,
                securityClearance.getName(),
                securityClearance.getSecurityClearanceId()) > 0;
    }


    @Override
    public boolean delete(int securityClearanceId) {
        final String sql = "delete from security_clearance " +
                "where security_clearance_id = ?;";

        //
//            select sc.security_clearance_id from security_clearance sc
//            left join agency_agent aa on sc.security_clearance_id=aa.security_clearance_id
//            left join agent agent on aa.agent_id = agent.agent_id
//            left join agency agency on aa.agency_id = agency.agency_id
//            where aa.agency_id is null and aa.agent_id is null
        return jdbcTemplate.update(sql,
                securityClearanceId) > 0;
    }
}
