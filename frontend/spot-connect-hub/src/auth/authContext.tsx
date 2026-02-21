import React, {Children, createContext, useEffect, useState} from "react";
import { GetCurrentUser } from "./authService";

interface User {
    id: number;
    nome: string;
    tipo: string;
    url_foto: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    refreshUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    refreshUser: async () => {}
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        try{
            const data = await GetCurrentUser();
            setUser(data);
        } catch{
            setUser(null);
        }finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, refreshUser: fetchUser }}>
            {children}
        </AuthContext.Provider>
    );
};