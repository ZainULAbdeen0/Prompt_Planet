export const dynamic ='forced-dynamic'
import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";


export const GET = async (req) => {
const { id } = await req.json();

  try {
    await connectToDB();

    const prompts = await Prompt.find({}).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Unable to fetch prompts, Internal server error", {
      status: 500,
    });
  }
};

