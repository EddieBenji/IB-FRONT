import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GeneralService } from '../utils/general.service';
import { NotificationService } from '../utils/notification/notification.service';
import { RequestType } from '../utils/request-type.enum';
import { SearchStudent } from './student-searcher/search-student.model';
import { StudentResponse } from './student-table/student-response.model';

@Injectable()
export class StudentService extends GeneralService {

  constructor(protected http: HttpClient, protected notificationService: NotificationService) {
    super(http, notificationService);
  }

  searchForStudents(search: SearchStudent) {
    return this.hitBethelApi(RequestType.GET, search, '/students');
  }

  addOrUpdateStudent(student: StudentResponse) {
    if (student.id) {
      return this.hitBethelApi(RequestType.PUT, { student: student }, '/students/' + student.id);
    }
    return this.hitBethelApi(RequestType.POST, { student: student }, '/students');
  }

  deleteStudent(student: StudentResponse) {
    return this.hitBethelApi(RequestType.DELETE, {}, '/students/' + student.id);
  }
}
