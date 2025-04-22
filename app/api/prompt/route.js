export const dynamic ='force-dynamic'
import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";


// export const GET = async (req) => {


//   try {
//     await connectToDB();

//     const prompts = await Prompt.find({}).populate("creator");
//     return new Response(JSON.stringify(prompts), { status: 200 });
//   } catch (error) {
//     console.log(error);
//     return new Response("Unable to fetch prompts, Internal server error", {
//       status: 500,
//     });
//   }
// };

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const limit = parseInt(searchParams.get('limit')) || 6;
  const page = parseInt(searchParams.get('page')) || 1;
  const skip = (page - 1) * limit;

  try {
    await connectToDB();

    const prompts = await Prompt.find({})
      .populate("creator")
      .skip(skip)
      .limit(limit)
      .lean();

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Unable to fetch prompts, Internal server error", {
      status: 500,
    });
  }
};