import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioListComponent } from './list/usuarioList.component';
import { ButtonModule } from 'primeng/button';

@NgModule({
	imports: [
		CommonModule,
		UsuarioRoutingModule,
		ButtonModule
	],
	declarations: [UsuarioListComponent]
})
export class UsuarioModule { }
