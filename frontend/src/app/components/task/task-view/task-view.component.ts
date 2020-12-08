import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'


import { SimpleCard, Task, Example } from 'src/app/classes/task'
import { Team } from 'src/app/classes/team'
import { UserService } from 'src/app/services/user.service'
import { TaskService } from 'src/app/services/task.service'
import { User } from 'src/app/classes/user'
import { TaskSummaryComponent } from '../task-summary/task-summary.component'
import { MatDialog } from '@angular/material/dialog'

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {
  public team!: Team
  public user!: User
  public task!: Task<SimpleCard>

  public counter = 1
  public progress = 0

  public constructor(
    private router: Router,
    private route: ActivatedRoute,
    private taskService: TaskService,
    private userService: UserService,
    private readonly dialog: MatDialog) { }

  public ngOnInit(): void {
    this.userService.user.subscribe(user => this.user = user)

    const taskid = this.route.snapshot.paramMap.get('taskid')

    this.taskService
      .getTask(taskid)
      .then(task => this.task = task)
      .catch(err => this.router.navigate(['/']))
  }


  public nextCard(): void {
    // Go to another card, count progress
    // this.simpleCard.foreignWord = 'Next word' + this.counter

    console.log('progres' + this.progress)
    if (this.counter < this.task.examples.length) {
      this.counter++
    }
    else
    if (this.counter === this.task.examples.length) {
    const dialogRef = this.dialog.open(TaskSummaryComponent, { width: '500px' })
    const instance = dialogRef.componentInstance
    instance.progres = this.task.examples.length - this.progress
    }
  }
}