import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

type Forms = {
  title: string;
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = signal<string>('simple-form');
  forms = signal<Forms[]>([]);
  http = inject(HttpClient);

  async ngOnInit(): Promise<void> {
    const res = await firstValueFrom(this.http.get<{ results: Forms[] }>('http://localhost:8787/api/forms'));
    this.forms.set(res.results);
  }
}
