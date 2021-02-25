import Link from 'next/link';
import { useEffect, useState } from 'react';
import { VehiclePerson } from '../../api/VehiclePerson';

export interface ListProps{
    ownersList: VehiclePerson[] | undefined;
}

export default function List({ ownersList }: ListProps) {
    
    return (
        <div>
            {ownersList?.map((e, index) => (
                <div key={index}>
                    <Link as={`/${e.email}/${e.name}`} href="/[vehicle]/[person]">
                        <a>
                            {e.email}'s | {e.name}
                        </a>
                    </Link>
                </div>
            ))}

        </div>
    );
}



List.getInitialProps = async () => {
    const response = await fetch('http://localhost:5000/customers');
    const ownersList: VehiclePerson[] | undefined = await response.json();
    return { ownersList: ownersList }
}   