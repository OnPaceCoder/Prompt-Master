import Prompt from "@models/prompt";

import { connectToDB } from "@utils/database";

export const POST = async (request) => {
    const { search } = await request.json();


    try {
        await connectToDB();

        const prompts = await Prompt.find({}).populate('creator')



        const regex = new RegExp(search, "i");

        const result = prompts.filter((item) => regex.test(item.creator.username) ||
            regex.test(item.tag) ||
            regex.test(item.prompt)
        )

        return new Response(JSON.stringify(result), { status: 200 })
    } catch (error) {
        return new Response("Failed to create a new prompt" + error, { status: 500 })
    }




    // try {
    //     await connectToDB();

    //     // const newPrompt = new Prompt({ creator: userId, prompt, tag });

    //     // await newPrompt.save()

    //     return new Response("Saved", { status: 200 })

    // } catch (error) {
    //     return new Response("Failed to create a new prompt" + error, { status: 500 })
    // }

}