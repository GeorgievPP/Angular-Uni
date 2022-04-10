import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomValidatorDirective } from './custom-validator.directive';
import { ShortenPipe } from './pipes/shorten.pipe';
import { TimeDiffPipe } from './pipes/time-diff.pipe';



@NgModule({
  declarations: [

    CustomValidatorDirective,
     ShortenPipe,
     TimeDiffPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CustomValidatorDirective,
    ShortenPipe,
    TimeDiffPipe
  ]

})
export class SharedModule { }
