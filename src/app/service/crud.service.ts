import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../Model/task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  serviceUrl : string;

  constructor(private http : HttpClient) { 
    this.serviceUrl = "http://localhost:3000/tasks";
  }

  addTask(task : Task) : Observable<Task>{
    return this.http.post<Task>(this.serviceUrl, task);
  }
  
  getAllTasks() : Observable<Task[]>{
    return this.http.get<Task[]>(this.serviceUrl);
  }

  deleteTask(task : Task) : Observable<Task>{
    return this.http.delete<Task>(this.serviceUrl + '/' + task.id);
  }

  editTask(task : Task) : Observable<Task>{
    return this.http.put<Task>(this.serviceUrl + '/' + task.id, task);
  }
}
