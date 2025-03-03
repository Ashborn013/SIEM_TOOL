"use server"
import { authClient  } from "@/lib/auth-client";

export async function signUpEmail(email: string, password: string, name: string, profilepic: string) {

    const response = await authClient.signUp.email({
        email: email,
        password: password,
        name: name,
        image: profilepic || "",
    });

    if (response.error) {
        console.error(response.error);
    } else {
        console.log(response.data);
    }
}