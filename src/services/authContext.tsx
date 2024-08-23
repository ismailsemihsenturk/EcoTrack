import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../../firebase.config'; // Firebase config dosyanızın yolunu doğru şekilde belirtin

// AuthContextType interface'ini tanımlayalım
interface AuthContextType {
  user: User | null;
  loading: boolean;
}

// AuthContext'i oluşturalım
const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

// Custom hook for using the auth context
export function useAuth(): AuthContextType {
  return useContext(AuthContext);
}

// AuthProvider props interface'i
interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider component'i
export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [authState, setAuthState] = useState<AuthContextType>({ user: null, loading: true });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setAuthState({ user: currentUser, loading: false });
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={authState}>
      {children}
    </AuthContext.Provider>
  );
}