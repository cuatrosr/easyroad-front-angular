import { BreadcrumbComponent } from 'src/app/modules/layout/components/breadcrumb/breadcrumb.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BreadcrumbService } from 'src/app/modules/layout/services/breadcrumb.service';
import { LogoComponent } from 'src/app/shared/components/logo/logo.component';
import { AdministracionService } from '../../services/administracion.service';
import { Project } from 'src/app/core/models/global.model';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadModule } from 'primeng/fileupload';
import { CommonModule, NgIf } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-administracion-agregar-poste',
  standalone: true,
  templateUrl: './agregar-poste.component.html',
  styleUrl: './agregar-poste.component.scss',
  imports: [
    AngularSvgIconModule,
    BreadcrumbComponent,
    ReactiveFormsModule,
    FileUploadModule,
    SkeletonModule,
    LogoComponent,
    CommonModule,
    ButtonModule,
    FormsModule,
    ToastModule,
    NgIf,
  ],
  providers: [MessageService, AdministracionService, HttpClientModule],
})
export class AgregarPosteComponent implements OnInit {
  administracionService = inject(AdministracionService);
  messageService = inject(MessageService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  form!: FormGroup;
  submitted = false;
  name!: string;
  serial!: string;
  fabricante!: string;
  modelo!: string;
  projectId: string = '';
  project: Project = { name: '' } as Project;
  loading = false;

  constructor(private formBuilder: FormBuilder, private breadcrumbService: BreadcrumbService) {}

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id')!;
    this.getProject();
    this.initForm();
    this.breadcrumbService.setHomeBreadcrumb({
      icon: 'pi pi-cog',
      routerLink: '/administracion/proyectos',
    });
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      serial: ['', [Validators.required]],
      fabricante: ['', Validators.required],
      modelo: ['', Validators.required],
    });
  }

  getProject() {
    this.loading = true;
    this.administracionService.getProjectById(this.projectId).subscribe({
      next: (data: Project) => {
        this.project = data;
        this.loading = false;
        this.breadcrumbService.setBreadcrumbs([
          { label: 'Gestion de Proyectos', icon: 'pi pi-chart-line', routerLink: '/administracion/proyectos' },
          {
            label: this.project.name,
            icon: 'pi pi-file-check',
            routerLink: `/administracion/ver_proyecto/${this.projectId}`,
          },
          {
            label: 'Agregar Poste',
            icon: 'pi pi-plus',
            routerLink: `/administracion/ver_proyecto/${this.projectId}/agregar_poste`,
          },
        ]);
      },
      error: (error: any) => {
        this.handleError(error);
        this.loading = false;
      },
    });
  }

  get f() {
    return this.form.controls;
  }

  handleSubmit(): void {
    this.submitted = true;
    if (this.form.valid) {
      this.administracionService.addPole({ ...this.form.value, project: this.projectId }).subscribe({
        next: (_response: any) => {
          this.router.navigate([`/administracion/ver_proyecto/${this.projectId}`]);
        },
        error: (error) => {
          this.handleError(error);
        },
      });
    } else {
      this.handleInfo('Por favor complete todos los campos');
    }
  }

  handleSuccess(message: string): void {
    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: message });
  }

  handleInfo(message: string): void {
    this.messageService.add({ severity: 'info', summary: 'Info', detail: message });
  }

  handleError(error: { message: string }) {
    const errorMessage = error?.message || 'Error desconocido';
    this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage });
  }
}
