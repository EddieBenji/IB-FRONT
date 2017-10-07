/*
 * Copyright (c) 2017 TIBCO Software Inc.
 * All Rights Reserved.
 */
export class StudentResponse {
  constructor(public id?: number, public first_name = '', public last_name = '',
              public email = '', public age = 0, public shift = '', public gender = '',
              public updated_at = '', public created_at = '') {

  }
}
