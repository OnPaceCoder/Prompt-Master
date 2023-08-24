import Prompt from "@models/prompt";

import { connectToDB } from "@utils/database";

export const POST = async (request) => {
    const { userId, prompt, tag } = await request.json();
    try {
        await connectToDB();

        const newPrompt = new Prompt({ creator: userId, prompt, tag });

        await newPrompt.save()

        return new Response("Saved", { status: 200 })

    } catch (error) {
        return new Response("Failed to create a new prompt" + error, { status: 500 })
    }

}