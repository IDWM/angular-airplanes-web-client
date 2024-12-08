import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Airplane } from '../../interfaces/airplane';

@Component({
  selector: 'app-airplanes',
  standalone: true,
  templateUrl: './airplane-list.component.html',
})
export class AirplaneListComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);

  protected airplanes: Airplane[] = [];

  protected readonly tableHeaders = [
    { key: 'id', label: 'ID' },
    { key: 'model', label: 'Modelo' },
    { key: 'capacity', label: 'Capacidad' },
  ];

  ngOnInit(): void {
    this.route.data.subscribe({
      next: (data) => {
        this.airplanes = data['airplanes'] as Airplane[];
      },
      error: (error) => {
        console.error('Error loading airplanes:', error);
      },
    });
  }
}
