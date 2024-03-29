import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrl: './photo-list.component.css'
})
export class PhotoListComponent implements OnInit {

  photos: Photo[] = [];
  filter: string = '';
  hasMore: boolean = true;
  currentPage: number = 1;
  userName: string = '';

  constructor(private activatedRoute: ActivatedRoute,
    private photoService: PhotoService) { }

  // Extrai o nome de usuário da rota e carrega as fotos iniciais.
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.userName = params['userName'],
      this.photos = this.activatedRoute.snapshot.data['photos'];
    });
  }

  // O método é chamado para carregar mais fotos quando clica no botão 'Load more'.
  // Usa subscrição para obter fotos paginadas do serviço e as concatena na lista existente.
  load() {
    this.photoService.listFromUserPaginated(this.userName, ++this.currentPage)
      .subscribe(photos => {
        this.filter = '';
        this.photos = this.photos.concat(photos);
        if (!photos.length) this.hasMore = false
      });
  }
}
