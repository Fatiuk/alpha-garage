import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { getDatabase, ref, set, get } from 'firebase/database';
import { createAsyncThunk } from '@reduxjs/toolkit';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// Save User Profile to Realtime Database
export const saveUserProfile = async (userId, userData) => {
  try {
    await set(ref(db, 'users/' + userId), {
      ...userData,
      createdAt: new Date().toISOString(),
    });
    return true;
  } catch (error) {
    console.error('Error saving user profile:', error);
    return false;
  }
};

// Fetch User Profile
export const fetchUserProfile = async userId => {
  try {
    const snapshot = await get(ref(db, 'users/' + userId));
    return snapshot.exists() ? snapshot.val() : null;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};

// Email/Password Registration
export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      const user = userCredential.user;

      // Update Auth profile
      await updateProfile(user, {
        displayName: credentials.name,
      });

      // Save additional info to Realtime Database
      await saveUserProfile(user.uid, {
        name: credentials.name,
        email: credentials.email,
        phone: credentials.phone || '',
        role: credentials.role || 'user',
        photoURL: credentials.phone || '',
      });

      return {
        uid: user.uid,
        email: user.email,
        name: credentials.name,
        token: await user.getIdToken(),
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Email/Password Login
export const logIn = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      const user = userCredential.user;

      return {
        uid: user.uid,
        user: await fetchUserProfile(user.uid),
        token: await user.getIdToken(),
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Logout
export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await signOut(auth);
    return null;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// User Refresh/Persist
export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    try {
      const user = await new Promise((resolve, reject) => {
        onAuthStateChanged(auth, user => {
          if (user) {
            resolve(user);
          } else {
            reject('No user is signed in');
          }
        });
      });
      const userProfile = await fetchUserProfile(user.uid);
      return {
        uid: user.uid,
        ...userProfile,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
