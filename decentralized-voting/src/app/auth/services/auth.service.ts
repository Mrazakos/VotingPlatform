import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, setPersistence, browserLocalPersistence, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: any = null;
  constructor(private auth: Auth, private router: Router) {}

  async login(email: string, password: string): Promise<void> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      this.router.navigate(['/dashboard']);
    } catch (error) {
      alert('Login failed. Please check your credentials.');
    }
  }

  async register(email: string, password: string): Promise<void> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      this.router.navigate(['/login']);
    } catch (error) {
      alert('Registration failed. Please try again.');
    }
  }
  logout() {
    return signOut(this.auth)
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(error => {
        console.error('Logout error:', error.message);
      });
  }

  async getUserId(): Promise<string | null> {
    return this.auth.currentUser ? this.auth.currentUser.uid : null;
  }
}
