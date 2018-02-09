import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { slideModal } from '../../utils/bethel.animations';
import { StudentResponse } from '../student-table/student-response.model';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-modal',
  templateUrl: './student-modal.component.html',
  styleUrls: ['./student-modal.component.css'],
  animations: [slideModal()]
})
export class StudentModalComponent implements OnInit, OnDestroy {
  @Input() public display = 'none';
  @Input() public student: StudentResponse;
  @Input() public isEditing = false;
  @Output() onCloseModal = new EventEmitter<boolean>();

  constructor(private studentService: StudentService) {}

  isStudentNew() {
    return this.student && !this.student.id;
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.closeModal(false);
  }

  closeModal(reload: boolean) {
    this.display = 'none';
    this.student = null;
    this.isEditing = false;
    this.onCloseModal.emit(reload);
  }

  isModalOpen() {
    return this.display !== 'none' && this.student;
  }

  updateStudent() {
    this.studentService
      .addOrUpdateStudent(this.student)
      .subscribe(response => this.closeModal(true));
  }
}
