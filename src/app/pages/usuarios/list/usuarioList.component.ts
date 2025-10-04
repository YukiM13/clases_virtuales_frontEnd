import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario_services';

@Component({
    templateUrl: './usuarioList.component.html'
})
export class UsuarioListComponent implements OnInit {
    constructor(private usuarioService: UsuarioService) { }
    usuarios: any[] = [];
    activeTab: string = 'alumnos'; // pestaña activa por defecto
    defaultImage: string = 'https://via.placeholder.com/150/6366f1/ffffff?text=Usuario';
    listarUsuarios() {
        this.usuarioService.listarUsuarios().subscribe({
            next: (response) => {
                console.log('Respuesta completa del servicio:', response);
                console.log('Tipo de respuesta:', typeof response);
                
                if (Array.isArray(response)) {
                    this.usuarios = response;
                    console.log('Respuesta es array directo, usuarios:', this.usuarios);
                } else if (response && response.data && Array.isArray(response.data)) {
                    this.usuarios = response.data;
                    console.log('Respuesta tiene propiedad data, usuarios:', this.usuarios);
                } else {
                    console.warn('La respuesta no es un array válido:', response);
                    this.usuarios = [];
                }
                console.log('Total usuarios asignados:', this.usuarios.length);
            },
            error: (error) => {
                console.error('Error al listar usuarios:', error);
                this.usuarios = [];
            }
        });
    }

    ngOnInit() {
        this.listarUsuarios();
    }

    // Cambiar pestaña activa
    setActiveTab(tab: string) {
        this.activeTab = tab;
    }

    // Filtrar usuarios por tipo
    get usuariosFiltrados() {
        if (this.activeTab === 'docentes') {
            return this.usuarios.filter(usuario => usuario.usua_EsDocente === 1);
        } else {
            return this.usuarios.filter(usuario => usuario.usua_EsDocente === 0);
        }
    }

    // Manejar errores de carga de imagen
    onImageError(event: any) {
        event.target.src = this.defaultImage;
    }

    // Validar si una URL de imagen es válida
    getImageUrl(usuario: any): string {
        if (usuario.usua_ImagenUrl && usuario.usua_ImagenUrl.trim() !== '') {
            return usuario.usua_ImagenUrl;
        }
        return this.defaultImage;
    }

    // Obtener nombre completo
    getNombreCompleto(usuario: any): string {
        const nombre = usuario.pers_Nombres || '';
        const apellido = usuario.pers_Apellidos || '';
        
        if (nombre && apellido) {
            return `${nombre} ${apellido}`;
        } else if (nombre) {
            return nombre;
        } else if (apellido) {
            return apellido;
        } else {
            return 'Sin nombre';
        }
    }
}
