import { NextResponse } from "next/server";
import { cookies } from "next/headers";


export async function POST(request) {
    cookies().delete("user");
    return NextResponse.json({ message: `LogedOut` });

}

