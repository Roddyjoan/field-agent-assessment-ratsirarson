import { Link, useNavigate } from "react-router-dom";
import { useContext } from 'react';
import AuthContext from './AuthContext';

function Nav() {
    const [user, setUser] = useContext(AuthContext);
    const navigate = useNavigate();

    function logout() {
        var yesNo = window.confirm("are you sure you wish to logout?")
        console.log(user.user.sub);
        if (yesNo) {
            setUser(null);
            localStorage.removeItem("token");
            navigate("/");
        }
        console.log(user.user.sub)
    }


    function renderLink(){
        const render = user.user.authorities === "ROLE_ADMIN";
        if (render){
           return <><br /> | <Link to="/agents/add"> Add an Agent </Link> | <br /></> 
        }
    }
    return (
        <nav>
            <li>
                <Link to="/">Home</Link>
            </li>



            {user?.user ? (

                <>

                    |
                    <Link to="/agents"> Show All Agents</Link> 
                    |
                    
                    {renderLink()}

                    
                    <button className="logout-button" onClick={logout}> Logout {user.user.sub}</button>



                </>

                //update w real link

            ) : (

                <li>
                    <Link to="/login">Login</Link>
                </li>

            )}



        </nav>
    )
}

export default Nav;



// function Nav() {
//     const [user, setUser] = useContext(AuthContext);

//     return (
//         <nav>
//             <ul>
//                 <li>
//                     <Link to="/"> Home</Link>
//                 </li>

//                 {user?.user ? (
//                     <li>Logout {user.user.sub} </li>
//                     // TODO update with real link later
//                 ) : (
//                     <li>
//                         <Link to="/login"> Login </Link>
//                     </li>
//                 )}

//             </ul>
//         </nav>
//     )
// }

// export default Nav;

/* <Link to="agents">Show All Agents</Link>&nbsp;|&nbsp;
          <Link to="add">Add New Agent</Link> */