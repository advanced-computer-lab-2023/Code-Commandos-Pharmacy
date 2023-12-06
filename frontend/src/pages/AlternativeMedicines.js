import {useParams} from "react-router-dom";

const AlternativeMedicines = () => {

    const {medicineName} = useParams()


    return(
        <body>
        <h2 className="left-part">Alternatives for {medicineName} </h2>
        </body>
    )
}
export default AlternativeMedicines