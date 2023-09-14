/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import axios from 'axios';
import { Dispatch, ReactNode, SetStateAction, createContext, useState, } from 'react';

export type User = {
    name: string;
    email: string;
};

export interface UserInterface {
    user: User;
    setUser: Dispatch<SetStateAction<User>>
    loading: boolean;
}

export type UserContextProps = {
    children: ReactNode;
};

export const UserContext = createContext<Partial<UserInterface>>({});

export default function UserContextProvider({ children }: UserContextProps) {
    const [user, setUser] = useState<User>({
        name: '',
        email: '',
    });
    const [loading, setLoading] = useState(false);


    if (!user || !user.name || !user.email) {
        axios.get('/profile').then(({ data }) => {
            setUser(data);
            setLoading(true);
        });
    }


    return (
        <UserContext.Provider value={{ user, setUser, loading }}>
            {children}
        </UserContext.Provider>
    );
}
