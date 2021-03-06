import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AccountViewComponent } from './components/account/account-view/account-view.component'
import { TeamViewComponent } from './components/team/team-view/team-view.component'
import { WorkspaceComponent } from './components/workspace/workspace.component'
import { TaskViewComponent } from './components/task/task-view/task-view.component'
import { SimpleCardEditorComponent } from './components/task/editor/simple-card-editor/simple-card-editor.component'
import { StartViewComponent } from './components/start-view/start-view.component'
import { LoginComponent } from './components/login/login.component'
import { AuthorizedGuard, UnauthorizedGuard } from './guards/authorization.guard'
import { RegisterComponent } from './components/register/register.component'
import { ChoiceTestComponent } from './components/task/choice-test/choice-test.component'

const routes: Routes = [
  {
    path: 'team/:teamId',
    canActivate: [AuthorizedGuard],
    component: TeamViewComponent
  },
  {
    path: 'team/:teamId/task/new',
    canActivate: [AuthorizedGuard],
    component: SimpleCardEditorComponent
  },
  {
    path: 'team/:teamId/task/:taskId/edit',
    canActivate: [AuthorizedGuard],
    component: SimpleCardEditorComponent
  },
  {
    path: 'team/:teamId/task/:taskId',
    canActivate: [AuthorizedGuard],
    component: TaskViewComponent
  },
  {
    path: 'workspace',
    canActivate: [AuthorizedGuard],
    component: WorkspaceComponent
  },
  {
    path: 'account',
    canActivate: [AuthorizedGuard],
    component: AccountViewComponent
  },
  {
    path: 'start',
    component: StartViewComponent
  },
  {
    path: 'login',
    canActivate: [UnauthorizedGuard],
    component: LoginComponent
  },
  {
    path: 'register',
    canActivate: [UnauthorizedGuard],
    component: RegisterComponent
  },
  {
    path: 'choicetest',
    component: ChoiceTestComponent
  },
  { path: '', redirectTo: 'start', pathMatch: 'full' },
  // Will add error page later
  { path: '**', redirectTo: 'start' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
