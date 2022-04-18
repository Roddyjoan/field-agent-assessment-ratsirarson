import { useParams } from "react-router-dom";

function Example(){
const { id } = useParams();

    return (
        <p> {id} is what the user typed into the search bar</p>
    )

}

export default Example;