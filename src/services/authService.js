import { auth, db } from '../firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as fbSignOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { TABLES } from '../constants/constants';

export async function signUp(email, password, displayName) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await updateProfile(user, { displayName });

    await setDoc(doc(db, TABLES.USERS, user.uid), {
      id: user.uid,
      email,
      display_name: displayName,
      created_at: new Date().toISOString(),
    });

    return { user, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
}

export async function signIn(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { session: { user: userCredential.user }, error: null };
  } catch (error) {
    return { session: null, error: error.message };
  }
}

export async function signOut() {
  try {
    await fbSignOut(auth);
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
}

export async function getSession() {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user ? { user } : null);
    });
  });
}

export function onAuthStateChange(callback) {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    callback('AUTH_EVENT', user ? { user } : null);
  });
  return unsubscribe;
}
