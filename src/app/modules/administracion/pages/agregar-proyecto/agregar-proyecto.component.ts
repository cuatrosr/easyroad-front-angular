import { BreadcrumbComponent } from 'src/app/modules/layout/components/breadcrumb/breadcrumb.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BreadcrumbService } from 'src/app/modules/layout/services/breadcrumb.service';
import { LogoComponent } from 'src/app/shared/components/logo/logo.component';
import { AdministracionService } from '../../services/administracion.service';
import { Component, inject, OnInit } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadModule } from 'primeng/fileupload';
import { CommonModule, NgIf } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administracion-agregar-proyecto',
  standalone: true,
  templateUrl: './agregar-proyecto.component.html',
  styleUrl: './agregar-proyecto.component.scss',
  imports: [
    NgIf,
    ToastModule,
    FormsModule,
    ButtonModule,
    CommonModule,
    LogoComponent,
    SkeletonModule,
    FileUploadModule,
    ReactiveFormsModule,
    BreadcrumbComponent,
    AngularSvgIconModule,
  ],
  providers: [MessageService, AdministracionService, HttpClientModule],
})
export class AgregarProyectosComponent implements OnInit {
  administracionService = inject(AdministracionService);
  messageService = inject(MessageService);
  router = inject(Router);
  uploadedFiles: any[] = [];
  form!: FormGroup;
  submitted = false;
  selectedImage: string | null = null;
  name: string = '';
  file: any = null;
  description: string = '';

  constructor(private formBuilder: FormBuilder, private breadcrumbService: BreadcrumbService) {}

  ngOnInit(): void {
    this.breadcrumbService.setHomeBreadcrumb({
      icon: 'pi pi-cog',
      routerLink: '/administracion/gestion-proyectos',
    });
    this.breadcrumbService.setBreadcrumbs([
      { label: 'Gestion de Proyectos', icon: 'pi pi-chart-line', routerLink: '/administracion/gestion-proyectos' },
      {
        label: 'Agregar Proyecto',
        icon: 'pi pi-plus',
        routerLink: '/administracion/gestion-proyectos/agregar_proyecto',
      },
    ]);
    this.initForm();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  handleImageChange(event: any): void {
    this.file = event.files[0];
  }

  handleSubmit(): void {
    this.submitted = true;
    if (this.form.value.name && this.form.value.description && this.file) {
      const formData = new FormData();
      formData.append('name', this.form.value.name);
      formData.append('description', this.form.value.description);
      formData.append('image', this.file);

      this.administracionService.addProject(formData).subscribe({
        next: (_response: any) => {
          this.handleSuccess('Proyecto creado con éxito');
          setTimeout(() => {
            this.router.navigate(['/paginas/proyectos']);
          }, 2000);
        },
        error: (error) => {
          this.handleError(error);
        },
      });
    } else {
      this.handleWarn('Por favor, suba una imagen y complete todos los campos');
    }
  }

  handleSuccess(message: string): void {
    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: message });
  }

  handleInfo(message: string): void {
    this.messageService.add({ severity: 'info', summary: 'Info', detail: message });
  }

  handleWarn(message: string): void {
    this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: message });
  }

  handleError(error: { message: string }) {
    const errorMessage = error?.message || 'Error desconocido';
    this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage });
  }
}
