import { useContext } from 'react';
import AuthContext from './AuthContext';

import Agents from './Agents';

function ShowAgents() {
    const [user, setUser] = useContext(AuthContext);

    return (

        //ONLY IF USER IS AUTHENTICATED
        <>
            <nav>

                {user?.user ? (
                    <><Agents />
                        </>
                ) : (
                    <p>^^^ Go click that log in button ^^^</p>

                )}



            </nav>

        </>
    )

}

export default ShowAgents;