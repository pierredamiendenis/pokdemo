import { Component, OnInit, Input } from '@angular/core';
import { Pokemon } from '../pokemon';
import { identifierModuleUrl } from '@angular/compiler';
import { PokedexService } from '../service/pokedex.service';

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.css']
})
export class MyComponentComponent implements OnInit {

  photos = [];
  indice : number = 0;

  @Input() id: number;
  @Input() name: string;
  @Input() type: string[];
  @Input() stats: string[];
  @Input() moves: any[];

  infoMoves = [];




  url_photo : string;

  id_text = String(this.id);

  zero : string;


  value: number;
  test : string;

  constructor(private servicePokedex: PokedexService) { }

  ngOnInit() {

    this.onZero();

    this.photos = [{valeur : this.onGetImage(), type:"Normal"},
    {valeur:this.onGetImageShiny(), type:"Shiny"}];

  this.url_photo = this.photos[0].valeur;
  this.indice=0;


  }

  playAudio() { 
    let audio = new Audio();
    audio.src = "./../../assets/cries/" + this.id +".ogg";
    audio.load();
    audio.play();
  } 
  

  onGetAudio(){
    console.log("./../../assets/cries/" + this.id +".ogg")

    return "./../../assets/cries/" + this.id +".ogg";
  }


  onTestId(){
    console.log(this.id)
  }

  onTestName(){
    console.log(this.name)
  }

  onZero(){

    if(this.id.toString().length==1){

      this.zero = "00";

    } else if (this.id.toString().length==2){

      this.zero = "0";

    } else {

      this.zero = "";
      
    }

  }

  test1(){
    console.log(this.getBackgroundColor());
    console.log(this.id, this.name, this.type)
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

  getBackgroundColor(){
    
    if(this.type.length==0){

    } else if (this.type.length==1) {

      var thetype = this.type[0];
    
    } else {

      var thetype = this.type[1];

    }



      switch (thetype) {
        case 'normal':
          return {'background-color':"#E8E8E8"}
        case 'fighting':
          return {'background-color':"#C03028"}
        case 'flying':
          return {'background-color':"#A890F0"}
        case 'poison':
          return {'background-color':"#A040A0"}
        case 'ground':
          return {'background-color':"#E0C068"}
        case 'rock':
          return {'background-color':"#B8A038"}
        case 'bug':
          return {'background-color':"#A8B820"}
        case 'ghost':
          return {'background-color':"#705898"}
        case 'steel':
          return {'background-color':"#B8B8D0"}
        case 'fire':
          return {'background-color':"#F08030"}
        case 'water':
          return {'background-color':"#6890F0"}
        case 'grass':
          return {'background-color':"#78C850"}
        case 'electric':
          return {'background-color':"#F8D030"}
        case 'psychic':
          return {'background-color':"#F85888"}
        case 'ice':
          return {'background-color':"#98D8D8"}
        case 'dragon':
          return {'background-color':"#7038F8"}
        case 'dark':
          return {'background-color':"#705848"}
        case 'fairy':
          return {'background-color':"#F0B6BC"}
        case 'shadow':
          return {'background-color':"#705898"}
        case 'unknown':
          return {'background-color':"#6AA596"}
        default:
          console.log('Sorry, we are out of ' + thetype + '.');
  }

    
  }


  display: boolean = false;

  showDialog() {
    this.onGetAllMoves();


      this.display = true;

  }



  onGetImage(){

    var url = "https://www.pokemontrash.com/pokedex/images/sprites5g2/"+ this.zero + this.id +".gif";
    return url;
  }

  onGetImageBack(){

    var urlback = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/" + this.id + ".png";
    return urlback;
  }

 onGetImageShiny(){

  var urlshiny = "https://www.pokemontrash.com/pokedex/images/sprites5g2/shinies/"+ this.zero + this.id +".gif";
  return urlshiny;
 }

 onGetImageShinyBack(){

  var urlshiny = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/" + this.id + ".png"
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


onGetAllMoves(){

  this.moves.forEach(async (element) => {

    await this.servicePokedex.onGetMoves(element.moves_url).then((value:any)=>{

      this.infoMoves.push(value);

    })

  })

}



}
