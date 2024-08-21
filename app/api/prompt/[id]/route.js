import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById({ _id: params.id }).populate(
      "creator"
    );
    if (!prompt) {
      return new Response("Prompt doesn't found", { status: 404 });
    }
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Unable to fetch prompts, Internal server error", {
      status: 500,
    });
  }
};

export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();
  try {
    await connectToDB();
    const existedPrompt = await Prompt.findById({ _id: params.id });
    if (!existedPrompt) {
      return new Response("Prompt not found", { status: 404 });
    }
    existedPrompt.prompt = prompt;
    existedPrompt.tag = tag;
    await existedPrompt.save();

    return new Response(JSON.stringify(existedPrompt), { status: 200 });
  } catch {
    return new Response("Unable to update prompt, Internal server error", {
      status: 500,
    });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    console.log("hello");
    await connectToDB();
    await Prompt.findByIdAndDelete({ _id: params.id });
    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to delete prompt", { status: 500 });
  }
};
