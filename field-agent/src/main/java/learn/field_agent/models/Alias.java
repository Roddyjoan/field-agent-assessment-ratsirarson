package learn.field_agent.models;

public class Alias {
    private int aliasId;
    private String name;
    private String persona;
    private int agentId;

    public int getAliasId() {
        return aliasId;
    }

    public void setAliasId(int aliasId) {
        this.aliasId = aliasId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPersona() {
        return persona;
    }

    public void setPersona(String persona) {
        this.persona = persona;
    }

    public int getAgentId() {
        return agentId;
    }

    public void setAgentId(int agentId) {
        this.agentId = agentId;
    }
    //    alias_id int primary key auto_increment,
//    `name` varchar(125) not null,
//    persona varchar(2048) null,
//    agent_id int not null,
}
