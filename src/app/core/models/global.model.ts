export interface Toast {
  titulo: string;
  mensaje: string;
  tipo: string;
}
export interface Items {
  name: string;
  route: string | null;
}
export interface Project {
  _id: number;
  name: string;
  description: string;
  image: string;
}
export interface Pole {
  _id: number;
  serial: string;
  fabricante: string;
  modelo: string;
  estado: string;
}
export interface Event {
  _id: number;
  fecha: string;
  serial: string;
  tipo_evento: string;
  estado_evento: string;
  tipo_notificacion: string;
}
