import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SearchStudent } from '../search-student.model';

@Component({
  selector: 'app-student-searcher',
  templateUrl: './student-searcher.component.html',
  styleUrls: [ './student-searcher.component.css' ]
})
export class StudentSearcherComponent implements OnInit {
  @Input() public searcher: SearchStudent;
  @Output() public searchStudents = new EventEmitter<void>();
  @Output() public onAddStudent = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit() {
  }

  public onSearchStudents() {
    this.searchStudents.emit();
  }

  public addStudent() {
    this.onAddStudent.emit();
  }

}
