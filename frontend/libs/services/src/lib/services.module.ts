import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth/auth.service';
import { DrinkService } from './drink/drink.service';

@NgModule({
  imports: [CommonModule, HttpClientModule,],
  providers: [AuthService, DrinkService]
})
export class ServicesModule {}
