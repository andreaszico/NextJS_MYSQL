import { NextPageContext } from "next";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import { VehiclePerson } from "../../../api/VehiclePerson";

export interface PersonProps { 
    ownersList?: VehiclePerson[];
}


function Person({ ownersList }: PersonProps) {

    const router = useRouter();
    const [owners, setOwners] = useState(ownersList);

    useEffect(() => {

        async function loadData(){
            const response = await fetch('http://localhost:4001/vehicles?ownerName=' + router.query.person + '&vehicle=' + router.query.vehicle);
            const ownersList: VehiclePerson[] | undefined = await response.json();
            setOwners(ownersList);
        };

        if(ownersList?.length == 0){
            loadData();
        }

    }, [])

    return owners?.length == 0 ? (
        <i>Loading...</i>
    ) : (
        <pre>
            {JSON.stringify(owners, null, 4)}
        </pre>
    )
}

export default Person;

interface MyNextPageContext extends NextPageContext {
    query: {
        person: string;
        vehicle: string; 
    }
}


Person.getInitialProps = async ({query, req}: NextPageContext) => {

    if (!req) {
        return { ownersList: [] }
    }

    const response = await fetch('http://localhost:4001/vehicles?ownerName=' + query.person + '&vehicle=' + query.vehicle);
    const ownersList: VehiclePerson[] | undefined = await response.json();
    return { ownersList: ownersList }
}









