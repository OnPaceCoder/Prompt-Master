"use client"
import { useState, useEffect } from "react"

import PromptCard from "./PromptCard"
import { fetchData } from "next-auth/client/_utils"
import { set } from "mongoose"


const PromptCardList = ({ data, handleTagClick }) => {
    return (
        <div className="mt-16 prompt_layout">

            {
                data.map((post) => (
                    <PromptCard
                        key={post._id}
                        post={post}
                        handleTagClick={handleTagClick}

                    />
                ))
            }

        </div>
    )
}




const Feed = () => {

    const [searchText, setSearchText] = useState("")
    const [posts, setPosts] = useState([])


    const handleTagClick = (tag) => {
        setSearchText(tag)
    }


    const handleSearchChange = async (e) => {
        e.preventDefault();

        if (searchText === "") {
            fetchPosts()
        }

        const response = await fetch('/api/prompt/search', {
            method: 'POST',
            body: JSON.stringify({
                search: searchText
            }),
        })
        const data = await response.json()


        setPosts(data)

        setSearchText("")


    }

    const fetchPosts = async () => {
        const response = await fetch('/api/prompt');
        const data = await response.json()
        setPosts(data)

    }

    useEffect(() => {

        fetchPosts()
    }, [])


    return (
        <section className="feed">
            <form action="" className="relative w-full flex-center" onSubmit={handleSearchChange}>

                <input
                    type="text"
                    placeholder="Search for a tag or a username"
                    name="search"
                    className="search_input peer"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}

                />
                <button type="submit" className="px-4 mx-2 py-2 bg-orange-500 rounded-lg">
                    Search
                </button>

            </form>


            <PromptCardList data={posts} handleTagClick={handleTagClick}
            />



        </section>
    )
}

export default Feed