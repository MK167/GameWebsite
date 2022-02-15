import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Game } from 'src/app/Models/game.model';
import { HttpService } from '../../Services/http.service';
import { APIResponse } from '../../Models/game.model';
import { Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public sort!: string;
  public games!: Array<Game>;
  private routeSub!: Subscription;
  private gameSub!: Subscription;


  constructor(private HttpService: HttpService, private ActivatedRout: ActivatedRoute, private Router: Router) { }

  ngOnInit(): void {
    this.routeSub = this.ActivatedRout.params.subscribe((parms: Params)=> {
      if (parms['game-search']){
        this.searchGames('metacrit', parms['game-search']);
      } else{
        this.searchGames('metacrit');
      }
    })
  }


  searchGames(sort: string, search?: string): void{
    this.gameSub = this.HttpService.getGamelist(sort, search).subscribe((
        gameList:APIResponse<Game>) =>{
          this.games = gameList.results;
          console.log(gameList);});
  }



  openGameDetails(id :string) : void {
    this.Router.navigate(['details' , id ]);
  }

  ngOnDestroy(): void {
    if(this.gameSub){
      this.gameSub.unsubscribe();
  }
    if(this.routeSub){
      this.routeSub.unsubscribe();
  }
}


}
