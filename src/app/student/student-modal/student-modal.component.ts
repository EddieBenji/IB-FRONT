import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { slideModal } from '../../utils/bethel.animations';
import { StudentResponse } from '../student-response.model';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-modal',
  templateUrl: './student-modal.component.html',
  styleUrls: [ './student-modal.component.css' ],
  animations: [ slideModal() ]
})
export class StudentModalComponent implements OnInit, OnDestroy {
  @Input()
  public display = 'none';
  @Input()
  public student: StudentResponse;
  @Input()
  public isEditing = false;
  @Output()
  onCloseModal = new EventEmitter();

  constructor(private studentService: StudentService) {
  }

  isStudentNew() {
    return this.student && !this.student.id;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.closeModal();
  }

  closeModal() {
    this.display = 'none';
    this.student = null;
    this.isEditing = false;
    this.onCloseModal.emit();
  }

  isModalOpen() {
    return this.display !== 'none' && this.student;
  }

  updateStudent() {
    this.studentService.addOrUpdateStudent(this.student).subscribe(
      (response) => this.closeModal()
    );
  }
}
