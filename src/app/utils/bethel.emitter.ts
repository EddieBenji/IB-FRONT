/*
 * Copyright (c) 2017 TIBCO Software Inc.
 * All Rights Reserved.
 */

import { ConfirmationModalModel } from './confirmation-modal/confirmation-modal.model';
import { ResponseConfirmationModalModel } from './confirmation-modal/response-confirmation-modal.model';
import { EventEmitter } from '@angular/core';

export class BethelEmitter {
  showConfirmationModal = new EventEmitter<ConfirmationModalModel>();
  closeConfirmationModal = new EventEmitter<ResponseConfirmationModalModel>();

  /**
   * This function is used when you want to open the confirmation modal.
   * @param header
   * @param question
   * @param opId
   */
  handleConfirmationModal(header: string, question: string, opId: any) {
    this.showConfirmationModal.emit(new ConfirmationModalModel(header, question, opId));
  }

  /**
   * This function is used when you want to let a component know the confirmation modal
   * has been closed.
   * @param response
   */
  onConfirmationModalHandled(response: ResponseConfirmationModalModel) {
    this.closeConfirmationModal.emit(response);
  }
}
