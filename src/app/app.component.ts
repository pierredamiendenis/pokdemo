import { Component, ElementRef } from '@angular/core';
import { Pokemon } from './pokemon';
import { HttpClient } from '@angular/common/http';
import { PokedexService } from './service/pokedex.service';

import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  cars: any[];

  constructor(private servicePokedex: PokedexService, private elementRef: ElementRef){

  }

  //images = [1, 2, 3, 4].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);


  list_pokemon : any= [];
  regularDistribution = 100 / 3;
  list_pokemon_name : any = [];

  PokemonInst : Pokemon;
  PokId;
  PokTypes;
  PokStats;
  PokUrl;
  booleanPok = false;
  Pokmoves;

  infoMoves = [];

  isGo : boolean = false;

  indice : number = 0;
  zero : string;

  photos = [];

  url_photo : string;


  
  display: boolean = false;

  showDialog() {
      this.display = true;
  }


  ngOnInit(){

    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#B1B1B1';

    var list_temp = this.servicePokedex.getAllPokemon();

    var indice = 0;

    list_temp.forEach(element => {

          this.list_pokemon_name.push({label:element,value:element,index:indice});

          indice++;

          
    });


    this.servicePokedex.onGetPokedexIntermediaire(0,27).then((value) => {

      this.list_pokemon = value;

    });

  }


  title = 'Pokedex';

  ndp;


  onTest(){

    console.log(this.list_pokemon.length)

    this.servicePokedex.onGetPokedexIntermediaire(this.list_pokemon.length,27).then((value) => {

      this.list_pokemon = value;

    });

  }

  onSearchPokemon(s){

    //console.log("test",this.servicePokedex.translatePokemon("en",s))

    this.servicePokedex.onGetOnePokemon(this.servicePokedex.translatePokemon("en",s)).then((value:Pokemon) => {

      //console.log(JSON.stringify(value))

      this.PokemonInst = value;
      this.PokId = this.PokemonInst.id;
      this.PokStats = this.PokemonInst.stats;
      console.log(this.PokStats)
      this.PokTypes = this.PokemonInst.type;
      this.PokUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + this.PokemonInst.id + ".png";
      
      this.Pokmoves = this.PokemonInst.moves;

      this.onGetAllMoves();


      this.onZero();

      this.photos = [{valeur : this.onGetImage(), type:"Normal Front"},
      {valeur:this.onGetImageShiny(), type:"Shiny Front"}];

      console.log(this.photos)

      //console.log(this.PokemonInst.id);
      this.url_photo = this.photos[0].valeur;



      this.isGo = true;
      this.display = true;


    });


  }





  onZero(){

    if(this.PokId.toString().length==1){

      this.zero = "00";

    } else if (this.PokId.toString().length==2){

      this.zero = "0";

    } else {

      this.zero = "";
      
    }

  }

  onGetImage(){

    var url = "https://www.pokemontrash.com/pokedex/images/sprites5g2/"+ this.zero + this.PokId +".gif";
    console.log(url)

    return url;
  }

  onGetImageBack(){

    var urlback = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/" + this.PokId + ".png";
    return urlback;
  }

 onGetImageShiny(){

  var urlshiny = "https://www.pokemontrash.com/pokedex/images/sprites5g2/shinies/"+ this.zero + this.PokId +".gif";
  return urlshiny;
 }

 onGetImageShinyBack(){

  var urlshiny = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/" + this.PokId + ".png"
  return urlshiny;
 }

 onChangeImagePlus(){
   if(this.indice==this.photos.length-1){
     this.indice = 0;
   } else {

    this.indice ++;

   }
   this.url_photo = this.photos[this.indice].valeur;

 }

 onChangeImageMoins(){
  
  if(this.indice == 0){
    this.indice = this.photos.length-1;
  } else {
    this.indice --;
  }

  this.url_photo = this.photos[this.indice].valeur;

}



getImageType(t){

    
  switch (t) {
    case 'normal':
      var tid = 9
      return "https://www.pokebip.com/pokedex/images/gen6_types/"+ tid + ".png"
    case 'fighting':
      var tid = 2
      return "https://www.pokebip.com/pokedex/images/gen6_types/"+ tid + ".png"
    case 'flying':
      var tid = 17
      return "https://www.pokebip.com/pokedex/images/gen6_types/"+ tid + ".png"
    case 'poison':
      var tid = 11
      return "https://www.pokebip.com/pokedex/images/gen6_types/"+ tid + ".png"
    case 'ground':
      var tid = 14
      return "https://www.pokebip.com/pokedex/images/gen6_types/"+ tid + ".png"
    case 'rock':
      var tid = 13
      return "https://www.pokebip.com/pokedex/images/gen6_types/"+ tid + ".png"
    case 'bug':
      var tid = 8
      return "https://www.pokebip.com/pokedex/images/gen6_types/"+ tid + ".png"
    case 'ghost':
      var tid = 15
      return "https://www.pokebip.com/pokedex/images/gen6_types/"+ tid + ".png"
    case 'steel':
      var tid = 1
      return "https://www.pokebip.com/pokedex/images/gen6_types/"+ tid + ".png"
    case 'fire':
      var tid = 6
      return "https://www.pokebip.com/pokedex/images/gen6_types/"+ tid + ".png"
    case 'water':
      var tid = 4
      return "https://www.pokebip.com/pokedex/images/gen6_types/"+ tid + ".png"
    case 'grass':
      var tid = 10
      return "https://www.pokebip.com/pokedex/images/gen6_types/"+ tid + ".png"
    case 'electric':
      var tid = 5
      return "https://www.pokebip.com/pokedex/images/gen6_types/"+ tid + ".png"
    case 'psychic':
      var tid = 12
      return "https://www.pokebip.com/pokedex/images/gen6_types/"+ tid + ".png"
    case 'ice':
      var tid = 7
      return "https://www.pokebip.com/pokedex/images/gen6_types/"+ tid + ".png"
    case 'dragon':
      var tid = 3
      return "https://www.pokebip.com/pokedex/images/gen6_types/"+ tid + ".png"
    case 'dark':
      var tid = 16
      return "https://www.pokebip.com/pokedex/images/gen6_types/"+ tid + ".png"
    case 'fairy':
      var tid = 18
      return "https://www.pokebip.com/pokedex/images/gen6_types/"+ tid + ".png"
    case 'shadow':
      var tid = 100
      return "https://www.pokebip.com/pokedex/images/gen6_types/"+ tid + ".png"
    case 'unknown':
      var tid = 100
      return "https://www.pokebip.com/pokedex/images/gen6_types/"+ tid + ".png"
    default:
      console.log('Sorry, we are out of ' + t + '.');
}


}

playAudio() { 
  let audio = new Audio();
  audio.src = "./../../assets/cries/" + this.PokId +".ogg";
  audio.load();
  audio.play();
} 

onGetAllMoves(){

  console.log(this.onGetAllMoves);

  this.Pokmoves.forEach(async (element) => {

    await this.servicePokedex.onGetMoves(element.moves_url).then((value:any)=>{

      this.infoMoves.push(value);

    })

  })

}



}
