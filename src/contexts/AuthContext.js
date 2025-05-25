// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from '../firebase/config';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);

  // Sign up with email and password
  const signup = async (email, password, profileData = {}) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update user profile with display name
      if (profileData.name) {
        await updateProfile(user, {
          displayName: profileData.name
        });
      }

      // Create user profile in Firestore
      const userDoc = {
        uid: user.uid,
        email: user.email,
        name: profileData.name || '',
        profilePicture: profileData.profilePicture || '',
        department: profileData.department || '',
        year: profileData.year || '',
        skills: profileData.skills || '',
        interests: profileData.interests || '',
        projectAreas: profileData.projectAreas || '',
        bio: profileData.bio || '',
        collegeId: profileData.collegeId || '',
        createdAt: new Date().toISOString(),
        connections: [],
        hackathonTeams: [],
        sentRequests: [],
        profileComplete: false
      };

      await setDoc(doc(db, 'users', user.uid), userDoc);
      setUserProfile(userDoc);
      return userCredential;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  // Login with email and password
  const login = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // Login with Google
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Check if user profile exists, create if not
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        const newUserProfile = {
          uid: user.uid,
          email: user.email,
          name: user.displayName || '',
          profilePicture: user.photoURL || '',
          department: '',
          year: '',
          skills: '',
          interests: '',
          projectAreas: '',
          bio: '',
          collegeId: '',
          createdAt: new Date().toISOString(),
          connections: [],
          hackathonTeams: [],
          sentRequests: [],
          profileComplete: false
        };
        await setDoc(userDocRef, newUserProfile);
        setUserProfile(newUserProfile);
      } else {
        setUserProfile(userDoc.data());
      }

      return result;
    } catch (error) {
      console.error('Google login error:', error);
      throw error;
    }
  };

  // Logout
  const logout = async () => {
    try {
      setUserProfile(null);
      setCurrentUser(null);
      return await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  // Reset password
  const resetPassword = async (email) => {
    try {
      return await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error('Password reset error:', error);
      throw error;
    }
  };

  // Fetch user profile from Firestore
  const fetchUserProfile = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUserProfile(userData);
        return userData;
      }
      return null;
    } catch (error) {
      console.error('Fetch profile error:', error);
      return null;
    }
  };

  // Update user profile
  const updateUserProfile = async (profileData) => {
    try {
      if (!currentUser) throw new Error('No user logged in');

      const userDocRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userDocRef, {
        ...profileData,
        updatedAt: new Date().toISOString(),
        profileComplete: true // Mark profile as complete when updated
      });

      // Update local state
      const updatedProfile = { ...userProfile, ...profileData, profileComplete: true };
      setUserProfile(updatedProfile);

      return updatedProfile;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  };

  // Add connection to user's network
  const addConnection = async (connectionId) => {
    try {
      if (!currentUser) throw new Error('No user logged in');

      const userDocRef = doc(db, 'users', currentUser.uid);
      const currentConnections = userProfile?.connections || [];

      if (!currentConnections.includes(connectionId)) {
        const updatedConnections = [...currentConnections, connectionId];
        await updateDoc(userDocRef, {
          connections: updatedConnections,
          updatedAt: new Date().toISOString()
        });

        setUserProfile(prev => ({
          ...prev,
          connections: updatedConnections
        }));
      }
    } catch (error) {
      console.error('Add connection error:', error);
      throw error;
    }
  };

  // Monitor auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        setCurrentUser(user);
        if (user) {
          await fetchUserProfile(user.uid);
        } else {
          setUserProfile(null);
        }
      } catch (error) {
        console.error('Auth state change error:', error);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userProfile,
    loading,
    signup,
    login,
    loginWithGoogle,
    logout,
    resetPassword,
    fetchUserProfile,
    updateUserProfile,
    addConnection
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
