package learn.field_agent.domain;

public class InvalidUserException extends Exception {

    public InvalidUserException( String message ){
        super( message );
    }

    public InvalidUserException( String message, Throwable innerException ){
        super( message, innerException );
    }
}
