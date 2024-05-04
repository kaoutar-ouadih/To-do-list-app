import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CrudService } from './service/crud.service';
import { Task } from './Model/task';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { error } from 'console';
import { FilterPipe } from './Pipes/filter.pipe';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule, FormsModule, FilterPipe],
  providers: [CrudService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'to-do-app';
  task : Task = new Task();
  tasks : Task[] = [];
  taskTitle : string;
  taskStatus : string;
  numberOfTasksLeft : number;
  currentTheme : string = "light";
  isCompleted : boolean = false;
  statusFilter : string = '';

  constructor(private crudService : CrudService){
  }

  ngOnInit(): void {
    this.getAllTasks();
  }
 
  
  getAllTasks(){
    this.statusFilter = '';
    this.crudService.getAllTasks().subscribe(
      res =>{
        this.tasks = res;
        this.numberOfTasksLeft = this.tasks.length - this.tasks.filter((item)=>{
          return item.isCompleted;
        }).length;
      },
      error=>{
        console.log(error);
      }
    );
  }

  addTask(){
    this.task.title = this.taskTitle;
    this.task.isCompleted = false;
    this.crudService.addTask(this.task).subscribe(
      res =>{
        this.getAllTasks();
        this.taskTitle = '';
      },
      error =>{
        console.log(error);
      }
    )
  }

  deleteTask(task : Task){
    this.crudService.deleteTask(task).subscribe(
      res =>{
            this.getAllTasks();
      },
      error =>{
        console.log(error);
      }
    )
  }

  themeSwitch(){
    this.currentTheme = (this.currentTheme == "light")? 'dark': 'light';
    document.documentElement.setAttribute("data-theme", this.currentTheme);
    console.log(this.currentTheme);
   
  }
  
  markItAsCompleted(task : Task, checkbox){
    if(checkbox.checked){
      task.isCompleted = true;
      this.crudService.editTask(task).subscribe(
        res=>{
            console.log(res);
            this.numberOfTasksLeft--;
        },
        error=>{
          console.log("error");
        }
    ) 
    }else{
      task.isCompleted = false;
      console.log("no I'm here");
      this.crudService.editTask(task).subscribe(
        res=>{
            console.log(res);
            this.numberOfTasksLeft++;
        },
        error=>{
          console.log("error");
        }
    ) 
    }
  }

  showCompletedTasks(){
      this.statusFilter = "completed";
      this.numberOfTasksLeft = 0;
  }

  showNotCompletedTasks(){
    this.statusFilter = "not completed";
    this.numberOfTasksLeft = this.tasks.length - this.tasks.filter((item)=>{
      return item.isCompleted;
    }).length;
  }
 
}
