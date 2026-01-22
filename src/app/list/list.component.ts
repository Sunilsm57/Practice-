import { Component, ViewChild } from '@angular/core';
import { DoneTodo, ServicesService, Todo } from '../services.service';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { StatusDisplayPipe } from '../pipes/status-display.pipe';
import { DeleteConfirmationDialogComponent } from '../dialogs/delete-confirmation-dialog.component';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [NgFor, MatTableModule, MatButtonModule, MatPaginatorModule, StatusDisplayPipe],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  todos: Todo[] = []
  DoneTodos: DoneTodo[] = []
  title = "Project";
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['slno', 'title', 'status', 'action'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private services: ServicesService,
    private router: Router,
    private dialog: MatDialog
  ) {

  }

  ngOnInit() {
    this.getTodoList()
    this.getCompletedTodoList()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  getTodoList() {
    this.services.getTodos().subscribe(todos => {
      this.todos = todos;
      this.dataSource.data = todos;
      // console.log(this.todos);
    })
  }
  getCompletedTodoList() {
    this.services.getCompletedTodos().subscribe(todos => {
      this.DoneTodos = todos
      // console.log(this.DoneTodos);
    })
  }
  editTask(id: number) {
    this.router.navigate(['/edit', id]).then(nav => {
      console.log('Navigation successful?', nav);
    }, err => {
      console.error('Navigation error:', err);
    });
  }
  deleteTask(id: number) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Todo',
        message: 'Are you sure you want to delete this todo? This action cannot be undone.'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.services.deleteTodo(id).subscribe({
          next: (res) => {
            console.log('Todo deleted successfully');
            this.getTodoList();
          },
          error: (err) => {
            console.error('Error deleting todo:', err);
          }
        });
      }
    });
  }
}



