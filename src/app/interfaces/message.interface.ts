export interface MessageData {
    message: string;
    confirmButton?: ButtonAction;
    cancelButton?: ButtonAction;
}

export interface ButtonAction {
    text: string;
    color: string; 
}