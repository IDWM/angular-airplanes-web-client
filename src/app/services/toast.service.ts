import { Injectable, signal } from '@angular/core';
import { Toast } from '../interfaces/toast';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toasts = signal<Toast[]>([]);

  // Método para obtener los toasts actuales
  getToasts() {
    return this.toasts;
  }

  // Método para mostrar un toast
  show(message: string, type: Toast['type'], duration: number = 3000) {
    const id = crypto.randomUUID();
    const toast: Toast = {
      id,
      message,
      type,
      duration,
    };

    this.toasts.update((currentToasts) => [...currentToasts, toast]);

    // Eliminar el toast después de la duración especificada
    setTimeout(() => {
      this.remove(id);
    }, duration);
  }

  // Métodos de conveniencia
  success(message: string, duration?: number) {
    this.show(message, 'success', duration);
  }

  error(message: string, duration?: number) {
    this.show(message, 'error', duration);
  }

  warning(message: string, duration?: number) {
    this.show(message, 'warning', duration);
  }

  info(message: string, duration?: number) {
    this.show(message, 'info', duration);
  }

  // Método para eliminar un toast específico
  private remove(id: string) {
    this.toasts.update((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id)
    );
  }
}
