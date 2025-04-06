import { Routes } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AuthGuard } from "./auth/auth.guard";
import { CreatePollComponent } from './upsert-poll/create-poll/create-poll.component';
import { PollComponent } from './poll/poll.component';
import { VotingCardsComponent } from './voting-cards/voting-cards.component';
import { EditPollComponent } from './upsert-poll/edit-poll/edit-poll.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'add-poll', component: CreatePollComponent, canActivate: [AuthGuard] },
  { path: 'poll/:id', component: PollComponent, canActivate: [AuthGuard] },
  { path: 'voting-cards', component: VotingCardsComponent, canActivate: [AuthGuard] },
  { path: 'edit-poll/:id', component: EditPollComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];
