import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    User,
    createUserWithEmailAndPassword,
    deleteUser,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";

const AUTH_STORAGE_KEY = "@eburni_auth_user";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  deleteAccount: () => Promise<void>;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Charger l'utilisateur depuis AsyncStorage au démarrage
  useEffect(() => {
    const loadPersistedUser = async () => {
      try {
        const persistedUser = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
        if (persistedUser) {
          // L'utilisateur est considéré comme connecté localement
          // Firebase vérifiera automatiquement la validité du token
        }
      } catch (error) {
        console.warn("Erreur chargement utilisateur persisté:", error);
      }
    };

    loadPersistedUser();
  }, []);

  // Écouter les changements d'état d'authentification Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        // Sauvegarder l'utilisateur connecté
        try {
          await AsyncStorage.setItem(
            AUTH_STORAGE_KEY,
            JSON.stringify({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
            }),
          );
        } catch (error) {
          console.warn("Erreur sauvegarde utilisateur:", error);
        }
      } else {
        // Supprimer l'utilisateur déconnecté
        try {
          await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
        } catch (error) {
          console.warn("Erreur suppression utilisateur:", error);
        }
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      throw new Error(getAuthErrorMessage(error.code));
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      throw new Error(getAuthErrorMessage(error.code));
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.warn("Erreur déconnexion:", error);
      throw error;
    }
  };

  const deleteAccount = async () => {
    if (!user) {
      throw new Error("Aucun utilisateur connecté");
    }

    try {
      // Supprimer d'abord les données locales
      await AsyncStorage.removeItem(AUTH_STORAGE_KEY);

      // Supprimer le compte Firebase (doit être fait en dernier)
      await deleteUser(user);
    } catch (error: any) {
      console.warn("Erreur suppression compte:", error);
      throw new Error(getAuthErrorMessage(error.code));
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    logout,
    deleteAccount,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Fonction utilitaire pour les messages d'erreur
function getAuthErrorMessage(errorCode: string): string {
  switch (errorCode) {
    case "auth/invalid-email":
      return "Adresse email invalide";
    case "auth/user-disabled":
      return "Ce compte a été désactivé";
    case "auth/user-not-found":
      return "Aucun compte trouvé avec cette adresse email";
    case "auth/wrong-password":
      return "Mot de passe incorrect";
    case "auth/email-already-in-use":
      return "Cette adresse email est déjà utilisée";
    case "auth/weak-password":
      return "Le mot de passe doit contenir au moins 6 caractères";
    case "auth/network-request-failed":
      return "Erreur de connexion réseau";
    default:
      return errorCode
        ? `Erreur Firebase inattendue : ${errorCode}`
        : "Une erreur inattendue s'est produite";
  }
}
