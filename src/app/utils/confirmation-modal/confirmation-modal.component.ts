import { Component, OnDestroy, OnInit } from '@angular/core';
import { slideModal } from '../bethel.animations';
import { ConfirmationModalModel } from './confirmation-modal.model';
import { BethelEmitter } from '../bethel.emitter';
import { ResponseConfirmationModalModel } from './response-confirmation-modal.model';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: [ './confirmation-modal.component.css' ],
  animations: [ slideModal() ]
})
export class ConfirmationModalComponent implements OnInit, OnDestroy {
  public infoToDisplay: ConfirmationModalModel;
  public display = 'none';

  constructor(private _bethelEmitter: BethelEmitter) {
    // Empty
  }

  closeConfirmationModal(): void {
    this.display = 'none';
    this.infoToDisplay = null;
  }

  isConfirmationModalOpen(): boolean {
    return this.infoToDisplay != null;
  }

  ngOnInit(): void {
    // start listening if this modal should be open:
    this._bethelEmitter.showConfirmationModal.subscribe(
      (infoToDisplay: ConfirmationModalModel) => {
        this.infoToDisplay = infoToDisplay;
        this.display = 'block';
      }
    );
  }

  ngOnDestroy(): void {
    this.closeConfirmationModal();
  }

  /**
   * Will send an observable with true or false, depending whether the user selected the positive of the falsy answer
   * @param answer
   */
  answerTheQuestion(answer: string) {
    const helper = new ResponseConfirmationModalModel(
      answer === this.infoToDisplay.getPositiveAnswer(), this.infoToDisplay.opId
    );
    this._bethelEmitter.onConfirmationModalHandled(helper);
    this.closeConfirmationModal();
  }

}
