import { useAuth } from "@/hooks/useAuth";
import React from "react";
import { Navigate } from "react-router-dom";

interface Props{
    children: React.ReactNode;
}

export default function ProtectRoute({children}: Props){
    const {user, loading} = useAuth();

    if(!loading) return null;

    if(!user){
        <Navigate to='/' replace />;
    }
    else{
        return <> {children} </>;
    }
}