"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import Form from "@components/Form"
import Link from "next/link"

const CreatePrompt = () => {
    const router = useRouter();

    const { data: session } = useSession();



    const [submitting, setIsSubmitting] = useState(false);

    const [post, setPost] = useState({ prompt: "", tag: "" });


    const createPrompt = async (e) => {
        e.preventDefault();

        setIsSubmitting(true);

        try {

            const response = await fetch("/api/prompt/new", {
                method: "POST",
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: session ? session?.user.id : "",
                    tag: post.tag,
                }),
            });



            if (response.ok) {
                router.push("/")
            }

        } catch (error) {
            console.log(error);
        }
        finally {
            setIsSubmitting(false)
        }

    }

    if (!session?.user) {
        return (
            <>
                {router.push("/")}

            </>
        )
    }


    return (


        <Form

            type="Create"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={createPrompt}

        />
    )

}

export default CreatePrompt