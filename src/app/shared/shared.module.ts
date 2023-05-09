import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRouting } from './shared.routing';

// Modules
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {LoadingModule, ContentLayoutComponent, PasswordInputComponent} from './components';


const modulesToExport = [
  SharedRouting,
  CommonModule,
  ReactiveFormsModule,
  FormsModule,
  MaterialModule,
  DragDropModule,
  ScrollingModule,
  LoadingModule,
];

const componentsToExport = [
  ContentLayoutComponent,
  PasswordInputComponent,
];

export const MY_NATIVE_FORMATS = {
  fullPickerInput: { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false },
  datePickerInput: { day: 'numeric', month: 'numeric', year: 'numeric' },
  timePickerInput: { hour: 'numeric', minute: 'numeric' },
  monthYearLabel: { year: 'numeric', month: 'numeric' },
  dateA11yLabel: { year: 'numeric', month: 'numeric', day: 'numeric' },
  monthYearA11yLabel: { year: 'numeric', month: 'numeric' },
};

@NgModule({
  declarations: [
    // Components
    ...componentsToExport,
    // Directive
    // ...directivesToExport,
    // Pipes
    // ...pipesToExport,
    // NotLoggedDialogComponent,
  ],
  imports: [
    ...modulesToExport,
    // NgxMapboxGLModule.withConfig(
    //   { accessToken: 'pk.eyJ1IjoidGhvbWFzbG9obWFubiIsImEiOiJjanBqdjY2ZHIwMGJ2M3F0NmNqaDloaXJhIn0.iarJxHhGR38eFMZRtCcnbw' }
    // ),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: false,
    }),
  ],
  exports: [
    // Modules
    ...modulesToExport,
    // NgxMapboxGLModule,
    NgxsReduxDevtoolsPluginModule,
    // Components
    ...componentsToExport,
    // Directive
    // ...directivesToExport,
    // Pipes
    // ...pipesToExport,
  ],
  entryComponents: [
    // ...entryComponentsToExport
  ],
  providers: [
    // { provide: OWL_DATE_TIME_FORMATS, useValue: MY_NATIVE_FORMATS },
  ],
})

export class SharedModule { }
