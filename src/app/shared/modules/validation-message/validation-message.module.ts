import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UsernamePossessionValidatorDirective } from 'src/app/modules/authentication/directives/username-possession-validator.directive';
import { ValidationMessageComponent } from './components/validation-message.component';
import { ValidationMessageContainerDirective } from './directives/validation-message-container.directive';
import { ValidationMessageDirective } from './directives/validation-message.directive';
import { ValidationMessageService } from './services/validation-message.service';

@NgModule({
  declarations: [
    ValidationMessageComponent,
    ValidationMessageDirective,
    UsernamePossessionValidatorDirective,
    ValidationMessageContainerDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ValidationMessageComponent,
    ValidationMessageDirective,
    UsernamePossessionValidatorDirective,
    ValidationMessageContainerDirective,
  ],
  providers: [
    ValidationMessageService,
    UsernamePossessionValidatorDirective
  ]
  
})
export class ValidationMessageModule { }
