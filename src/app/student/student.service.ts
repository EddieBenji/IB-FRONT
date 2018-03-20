import { Injectable } from '@angular/core';

import { GeneralService } from '../utils/general.service';
import { RequestType } from '../utils/request-type.enum';
import { SearchStudent } from './student-searcher/search-student.model';
import { StudentResponse } from './student-table/student-response.model';

@Injectable()
export class StudentService {

  constructor(private generalService: GeneralService) {
  }

  searchForStudents(search: SearchStudent) {
    return this.generalService.hitBethelApi(RequestType.GET, search, '/students');
  }

  addOrUpdateStudent(student: StudentResponse) {
    if (student.id) {
      return this.generalService.hitBethelApi(RequestType.PUT, { student: student }, '/students/' + student.id);
    }
    return this.generalService.hitBethelApi(RequestType.POST, { student: student }, '/students');
  }

  deleteStudent(student: StudentResponse) {
    return this.generalService.hitBethelApi(RequestType.DELETE, {}, '/students/' + student.id);
  }
}
