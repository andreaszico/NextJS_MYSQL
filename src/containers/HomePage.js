import Link from 'next/link'
import React from 'react'

function HomePage() {
    return (
        <div>
            <h1>HELLO Every One</h1>

            <Link href="/People">
                <a>People</a>
            </Link>
            <hr/>
            <Link href="/Vehicle">
                <a>Vehicles</a>
            </Link>
            <hr/>
            <Link href="/MicroPhone">
                <a>MicroPhone</a>
            </Link>
        </div>
    )
}

export default HomePage
