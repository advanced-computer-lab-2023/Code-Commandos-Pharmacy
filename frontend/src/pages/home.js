import {useEffect, useState} from 'react'
import PharmacistDetails from '../components/pharmacistDetails'

const Home =() =>{
const [pharmacists, setPharmacist]= useState(null)
useEffect(() =>{
   const fetchPharmacist = async () => {
   const response= await fetch('api/pharmacistRoute')
   const json = await response.json()

   if(response.ok){
setPharmacist(json)
   }

   }
   fetchPharmacist()
}, [])

return (
<div className="home">
<div className="Pharmacist Data">
{pharmacists && pharmacists.map((pharmacist) => (
<PharmacistDetails key = {pharmacist._id} pharmacist={pharmacist} />
))}
</div>
</div>
)

}

export default Home