import { Link } from "react-router-dom";

function Nav() {
    return (
        <div className="nav">
            <Link to="/">Home</Link>&nbsp;|&nbsp;
            <Link to="agents">Show All Agents</Link>&nbsp;|&nbsp;
            <Link to="add">Add New Agent</Link>
        </div>
    )
}

export default Nav;