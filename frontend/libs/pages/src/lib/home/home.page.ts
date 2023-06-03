import { Component, OnInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { HomeFacade } from './+state/home.facade';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'frontend-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css'],
})
export class HomePage implements OnInit {

  cupOptions: AnimationOptions = {
    path: '/assets/lottie/water.json',
    autoplay: false
  };

  loaderOptions: AnimationOptions = {
    path: '/assets/lottie/splash-water.json',
    autoplay: true,
    loop: true,
  };

  private animationItem!: AnimationItem;

  isDrinking$: Observable<boolean>;
  drinkCount$: Observable<number>;
  loaded$: Observable<boolean>;
  username$: Observable<string | null | undefined>;
  errors$: Observable<any>;

  looping = false;

  constructor(private homeFacade: HomeFacade, private alertController: AlertController) {
    this.isDrinking$ = homeFacade.isDrinking$
    this.drinkCount$ = homeFacade.count$
    this.loaded$ = homeFacade.loaded$
    this.username$ = homeFacade.username$;
    this.errors$ = homeFacade.errors$;
  }

  ngOnInit() {
    this.homeFacade.init();
  }

  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;
  }

  drink() {
    if (this.looping) {
      return
    }
    this.homeFacade.drink()
    this.animationItem.play()
    this.looping = true
  }

  loopComplete() {
    this.looping = false;
    this.animationItem.goToAndStop(this.animationItem.firstFrame)
  }

  async slowDown() {
    const alert = await this.alertController.create({
      header: 'Slow down there!',
      message: 'Drinking a bit too fast now are we? You in a rush?',
      buttons: ['OK'],
    });

    await alert.present();
  }
}
