import { Component, Input, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'

import { Team } from 'src/app/classes/team'
import { TeamService } from 'src/app/services/team.service'
import { TaskAddingComponent } from '../../task/task-adding/task-adding.component'
import { TeamSettingsComponent } from '../team-settings/team-settings.component'
import { ConfirmationData, ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component'
import { Router } from '@angular/router'


@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.scss'],
})
export class TeamCardComponent implements OnInit {
  @Input() public team!: Team
  @Input() public leaderView = false
  @Input() public context!: 'TeamContainer' | 'Team'

  public constructor(
    private readonly dialog: MatDialog,
    private readonly router: Router,
    private readonly snackbarService: MatSnackBar,
    private readonly teamService: TeamService) { }

  public ngOnInit(): void { }

  public teamSettings(): void {
    this.dialog.closeAll()
    this.dialog.open(TeamSettingsComponent, { data: this.team })
  }

  public copyToClipboard(): void {
    navigator.clipboard.writeText(this.team.id)
    this.snackbarService
      .open('Skopiowano do schowka!', undefined, { duration: 2000 })
  }

  public newTaskDialog(): void {
    this.dialog.open(TaskAddingComponent, { width: '500px' })
  }

  public openDeleteDialog(): void {
    this.handleActionDialog(() => this.removeTeam(), {
      message: 'Czy na pewno usunąć?',
      buttonText: { ok: 'Usuń', cancel: 'Nie' }
    })
  }

  private leaveTeam(): void  {
    this.teamService.leaveTeam(this.team)
    this.router.navigate(['/workspace'])
  }

  public openLeaveDialog(): void {
    this.handleActionDialog(() => this.leaveTeam(), {
      message: 'Czy na pewno opuścić zespół?',
      buttonText: { ok: 'Opuść', cancel: 'Nie' }
    })
  }

  private removeTeam(): void {
    this.teamService.remove(this.team)
    this.router.navigate(['/workspace'])
  }

  private handleActionDialog(action: () => void, data: ConfirmationData): void {
    this.dialog
      .open(ConfirmationDialogComponent, { data })
      .afterClosed()
      .subscribe(confirmed => confirmed ? action() : null)
  }
}
