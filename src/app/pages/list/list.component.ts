import {
  Component,
  OnInit,
  WritableSignal,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { DataService } from '../../services/data.service';
import { Place } from '../../interfaces/place';
import { CategoryType } from '../../interfaces/CategoryType';
import { Category } from '../../interfaces/category';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit {
  
  constructor(private _dataService: DataService) {
    effect(() => {
      localStorage.setItem('places', JSON.stringify(this.places()));
    });
  }

  public places: WritableSignal<Place[]> = signal<Place[]>(
    this._dataService.getPlaces()
  );

  public categorySignal: WritableSignal<CategoryType> = signal<CategoryType>('all');

  public categories: Category[] = [
    {
      name: 'Todas',
      type: 'all',
    },
    {
      name: 'Favoritas',
      type: 'favorites',
    },
  ];

  public placesFiltered = computed(() => {
    if (this.categorySignal() === 'favorites') {
      return this.places().filter((place) => place.favorite);
    }
    return this.places();
  });

  ngOnInit(): void {
    const storage = localStorage.getItem('places');
    if (storage) {
      this.places.set(JSON.parse(storage));
    }
  }

  changeCategory(categoryType: CategoryType) {
    this.categorySignal.set(categoryType);
  }

  addFavorite(placeId: number) {
    this.places.update((prev_places) =>
      prev_places.map((place) =>
        place.id === placeId ? { ...place, favorite: !place.favorite } : place
      )
    );
  }
}
