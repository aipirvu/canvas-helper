import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CanvasDemoComponent } from './canvas-demo/canvas-demo.component';

@NgModule({
  declarations: [
    AppComponent,
    CanvasDemoComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
