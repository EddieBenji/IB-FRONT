import { Injectable } from '@angular/core';
import { GeneralService } from '../utils/general.service';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../utils/notification/notification.service';
import { RequestType } from '../utils/request-type.enum';
import { SearchStudent } from './search-student.model';

@Injectable()
export class StudentService extends GeneralService {

  constructor(protected http: HttpClient, protected notificationService: NotificationService) {
    super(http, notificationService);
  }

  searchForStudents(search: SearchStudent) {
    return this.hitBethelApi(RequestType.GET, search, '/students');
  }
}
