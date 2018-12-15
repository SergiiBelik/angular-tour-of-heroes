import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Location } from '@angular/common'

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail-modal',
  templateUrl: './hero-detail-modal.component.html',
  styleUrls: ['./hero-detail-modal.component.css']
})
export class HeroDetailModalComponent implements OnInit {

  hero: Hero

  constructor(
    private heroService: HeroService,
    private location: Location,
    private dialogRef: MatDialogRef<HeroDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data

  ) { }

  ngOnInit() {
    this.getHero()
  }

  getHero(): void{
    const id = +this.data.id
    // console.log(id)
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero)
  }

  save(): void{
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack())
  }

  goBack(): void{
    this.location.back()
  }

}
 