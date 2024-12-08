import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="bg-white mt-4">
      <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <span
          class="block text-sm text-gray-500 text-center dark:text-gray-400"
        >
          © 2024 Mi App™. Todos los derechos reservados.
        </span>
      </div>
    </footer>
  `,
})
export class FooterComponent {}
