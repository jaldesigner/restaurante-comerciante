import React, {createContext, useState} from 'react';

export const AuthContext = createContext({});

export default function AuthProvider({children}) {
    const [user, setUser] = useState(null);

    async function cadastrarUsuario(email, senha, nome, nivel){
      
    }

  return (
    <AuthContext.Provider value={{ logado: !!user , user}}>
        {children}
    </AuthContext.Provider>
  )
}