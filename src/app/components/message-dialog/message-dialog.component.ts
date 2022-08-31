import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ButtonAction, MessageData } from "src/app/interfaces/message.interface";

@Component({
  selector: "spc-message-dialog",
  templateUrl: "./message-dialog.component.html",
})
export class MessageDialogComponent {
  
  message: string = "¿Estás seguro?";
  
  confirmButton: ButtonAction = {
    text: "Eliminar",
    color: 'warn'
  };

  cancelButton: ButtonAction = {
    text: "Cancelar",
    color: 'basic'
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MessageData,
    private dialogRef: MatDialogRef<MessageDialogComponent>
  ) {
    this.message = data.message || this.message;
    this.confirmButton = this.data.confirmButton || this.confirmButton;
    this.cancelButton = this.data.cancelButton || this.cancelButton;
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
}
