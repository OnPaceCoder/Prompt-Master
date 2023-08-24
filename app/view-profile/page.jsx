"use client"

import { useState, useEffect } from 'react';

import { useSession } from 'next-auth/react'

import { useRouter } from "next/navigation";

import Profile from '@components/Profile';
import { useSearchParams } from 'next/navigation';

const ViewProfile = () => {
    const router = useRouter();
    const { data: session } = useSession();

    const [posts, setPosts] = useState([]);

    const searchParams = useSearchParams();
    const userId = searchParams.get("id")



    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${userId}/posts`);
            const data = await response.json()
            setPosts(data)

        }

        if (session?.user.id) {
            fetchPosts()
        }
    }, [])


    return (
        <Profile name={posts[0]?.creator?.username}
            desc={`Welcome to profile page of ${posts[0]?.creator?.username}`}

            data={posts}

        />
    )
}

export default ViewProfile