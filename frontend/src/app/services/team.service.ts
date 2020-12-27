import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http'

import { lexicaURL } from 'src/app/lexica.properties'
import { Team } from 'src/app/classes/team'
import { UserService } from './user.service'

export interface TeamForm {
  readonly name: string
  readonly description: string
  readonly image?: string
}

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  public  readonly emptyTeam = new Team('', '', this.userService.emptyUser)
  private loggedUser = this.userService.emptyUser
  private readonly teamListSource = new BehaviorSubject<Team[]>([])
  private teamSource = new BehaviorSubject<Team>(this.emptyTeam)

  public constructor(
      private readonly userService: UserService,
      private readonly http: HttpClient) {
    this.userService.user.subscribe(user => this.loggedUser = user)
  }

  public getTeams(): Observable<Team[]> {
    this.refreshTeamListSource()
    return this.teamListSource.asObservable()
  }

  private refreshTeamListSource(): void {
    if (this.loggedUser.id) {
      this.http.get<Team[]>(`${lexicaURL}/user/${this.loggedUser.id}/team`)
        .subscribe(teams => this.teamListSource.next(teams))
    }
  }

  private refreshTeamSource(id: string): void {
    this.http.get<Team>(`${lexicaURL}/team/${id}`)
      .pipe(map(Team.deserialize))
      .subscribe(
        team => this.teamSource.next(team),
        err => {
          this.teamSource.error(err) // Reset teamSource after error
          this.teamSource = new BehaviorSubject<Team>(this.emptyTeam)
        })
  }

  public getTeam(id: string | null): Observable<Team> {
    if (id) { this.refreshTeamSource(id) }
    return this.teamSource.asObservable()
  }

  public createTeam(form: TeamForm): void {
    this.http.post(`${lexicaURL}/team`, { ...form, leader: this.loggedUser.asUUID() })
      .subscribe(() => this.refreshTeamListSource())
  }

  public updateTeam(id: string, form: TeamForm): void {
    this.http.put(`${lexicaURL}/team/${id}`, form)
      .subscribe(() => {
        this.refreshTeamListSource()
        this.refreshTeamSource(id)
      })
  }

  public joinTeam(id: string): void {
    this.http.post(`${lexicaURL}/team/${id}/user`, this.loggedUser.asUUID())
      .subscribe(() => this.refreshTeamListSource())
  }

  public remove(team: Team): void {
    this.http.delete(`${lexicaURL}/team/${team.id}/user/${this.loggedUser.id}`)
      .subscribe(() => this.refreshTeamListSource())
  }
}
