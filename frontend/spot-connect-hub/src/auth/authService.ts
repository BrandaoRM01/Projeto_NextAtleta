import { error } from "console";

const URL_BASE = "http://127.0.0.1:5000";

export async function GetCurrentUser(){
    const response = await fetch(`${URL_BASE}/auth/me`, {
        method: "GET",
        credentials: "include"
    })

    if (!response.ok){
        throw error ("Não autenticado!")
    }

    return response.json()
}