import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackbar: MatSnackBar) { }
  config: MatSnackBarConfig = {
    duration: 5000,
  }

  showSuccess(message: string): MatSnackBarRef<TextOnlySnackBar> { 
    return this.snackbar.open(message, '', {...this.config, panelClass: 'mat-snack-bar-container--success'});
  }

  showError(message: string): MatSnackBarRef<TextOnlySnackBar> { 
    return this.snackbar.open(message, '', {...this.config, panelClass: 'mat-snack-bar-container--error'});
  }

  showWarning(message: string): MatSnackBarRef<TextOnlySnackBar> { 
    return this.snackbar.open(message, '', {...this.config, panelClass: 'mat-snack-bar-container--warnin'});
  }
  
  showInfo(message: string): MatSnackBarRef<TextOnlySnackBar> { 
    return this.snackbar.open(message, '', {...this.config, panelClass: 'mat-snack-bar-container--info'});
  }
}
