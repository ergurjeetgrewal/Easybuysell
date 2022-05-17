import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
const Myaccount = ({ user }) => {
    const router = useRouter();
    useEffect(() => {
        if (!user.login) {
            router.push('/login')
        }
    }, [router, user.login])
    return (
        <div>Myaccount</div>
    )
}

export default Myaccount