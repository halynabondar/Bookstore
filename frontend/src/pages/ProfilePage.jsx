import {Navigate} from 'react-router-dom'

import {useUser} from '../hooks'

export default function ProfilePage() {
    const {user} = useUser()

    if (!user) return <Navigate to="/signin" replace/>

    return (
        <section className="mx-auto max-w-xl px-4 py-8">
            <h1 className="mb-4 text-3xl font-semibold text-dark-700">My Profile</h1>
            <div className="rounded-xl bg-dark-100 p-6 shadow">
                <p className="mb-2">
                    <span className="font-medium">ID:</span> {user.id}
                </p>
                <p className="mb-2">
                    <span className="font-medium">Email:</span> {user.email}
                </p>
                <p className="mb-2">
                    <span className="font-medium">First name:</span> {user.first_name}
                </p>
                <p className="mb-2">
                    <span className="font-medium">Last name:</span> {user.last_name}
                </p>
            </div>
        </section>
    )
}
