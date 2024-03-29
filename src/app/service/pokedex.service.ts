import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from '../pokemon';

declare var require: any

@Injectable({
  providedIn: 'root'
})
export class PokedexService {

  constructor(private http:HttpClient) { }

  url_getPokemons = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=964";


  list_pokemon : Pokemon []= [];
  list_pokemon_name : string[] = [];

  show = 5;

  getAllPokemon(){

    return this.tabfr;

  }

  onGetPokedex(){

    return new Promise((resolve,reject) => {

      this.http.get(this.url_getPokemons, {responseType: 'text'})
    .subscribe(
      async (data)  => {

        //console.log(JSON.parse(data));

        for(var i = 0; i<JSON.parse(data).results.length; i++){

          //console.log("1");

          await this.onSetPokemon(i+1, JSON.parse(data).results[i].url).then((value:any[]) => {

            //console.log("3");

            //console.log("jesuislenumero : ",i, element.name);

            this.list_pokemon.push(new Pokemon(this.list_pokemon.length+1, this.capitalize(JSON.parse(data).results[i].name),value[0], value[1], value[2]));

        });

        //console.log(this.list_pokemon)
        
      }

      console.log("finished")
      resolve(this.list_pokemon);       

    },
      err => {
        console.log("err : " + err.message);
        reject([]);
      }
    )

    });

  }

  onGetPokedexIntermediaire(taille, limite){

    return new Promise((resolve,reject) => {

      if(taille+limite>964){
        if(964-taille<0){
          return;
        } else if(964-taille==0){
          return;
        } else {
          limite = 964-taille;
        }
      }

      var url_getPokemons_intermediaire = "https://pokeapi.co/api/v2/pokemon/?offset="+(taille)+"&limit="+ (limite);
      console.log(url_getPokemons_intermediaire)


      this.http.get(url_getPokemons_intermediaire, {responseType: 'text'})
    .subscribe(
      async (data)  => {


        //console.log(JSON.parse(data));

        for(var i = 0; i<JSON.parse(data).results.length; i++){

          //console.log("1");

          await this.onSetPokemon(this.list_pokemon.length+1, JSON.parse(data).results[i].url).then((value:any[]) => {

            //console.log("3");

            //console.log("jesuislenumero : ",i, element.name);

            //console.log(this.tabfr[this.list_pokemon.length+1]);

            if(this.tabfr[this.list_pokemon.length]==undefined){

              var nomPokemon = this.capitalize(JSON.parse(data).results[i].name);

            } else {

              var nomPokemon = this.tabfr[this.list_pokemon.length];

            }

            this.list_pokemon.push(new Pokemon(this.list_pokemon.length+1,nomPokemon ,value[0], value[1], value[2]));

        });

        //console.log(this.list_pokemon)
        
      }

      //console.log(this.list_pokemon)
      console.log("finished")
      resolve(this.list_pokemon);       

    },
      err => {
        console.log("err : " + err.message);
        reject([]);
      }
    )

    });

  }


  onGetMoves(url){

    return new Promise((resolve,reject) => {

      this.http.get(url, {responseType: 'text'})
    .subscribe(
      (data)  => {


        var datapokemon = JSON.parse(data);
        
        var moves = {name:datapokemon.name, accuracy:datapokemon.accuracy, power:datapokemon.power, pp:datapokemon.pp, type:datapokemon.type.name};

        resolve(moves);
        
      },
      err => {
        console.log("err : " + err.message);
        reject();
      }
    )

    });


  }



  onSetPokemon(id, url){

    return new Promise((resolve,reject) => {

      this.http.get(url, {responseType: 'text'})
    .subscribe(
      (data)  => {

        var types = [];
        var stats = [];
        var moves = [];


        var datapokemon = JSON.parse(data);

        datapokemon.stats.forEach(element => {

          stats.push({name:element.stat.name,percentage:element.base_stat});
          
        });
        
        datapokemon.types.forEach(element => {

          types.push(element.type.name);
          
        });

        datapokemon.moves.forEach(element => {

            moves.push({name:element.move.name,moves_url:element.move.url});
          
        });
        //console.log(moves)

        //console.log("id et type" ,id, types)
        //console.log("2");


        resolve([types,stats,moves]);       
        
      },
      err => {
        console.log("err : " + err.message);
        reject();
      }
    )

    });

  }


  
  onGetOnePokemon(nom){

    console.log("nom",nom)

    var url_getspecificPokemons = "https://pokeapi.co/api/v2/pokemon/" + nom.toString().toLowerCase();

    return new Promise((resolve,reject) => {

      this.http.get(url_getspecificPokemons, {responseType: 'text'})
    .subscribe(
      async (data)  => {

        var stats : any= [];
        var types : any= [];
        var moves : any= [];

        var indice = JSON.parse(data).id;
        var name = this.tabfr[indice-1];

        var datapokemon = JSON.parse(data);

        datapokemon.stats.forEach(element => {

          stats.push({name:element.stat.name,percentage:element.base_stat});
          
        });
        
        datapokemon.types.forEach(element => {

          types.push(element.type.name);
          
        });

        datapokemon.moves.forEach(element => {

          moves.push({name:element.move.name,moves_url:element.move.url});
          
        });

        var exact:Pokemon = new Pokemon(indice, name, types, stats, moves);

        resolve(exact);       
        
      },
      err => {
        console.log("err : " + err.message);
        reject();
      }
    )

    });

  }

  translatePokemon(trad, id){

    // console.log(id)

    if(trad=="en"){

      // console.log("translate",this.tabfr.indexOf(id.toString()))
      // console.log("translate 2 : ",this.taben[this.taben.indexOf(id)])

      return this.taben[this.tabfr.indexOf(id)];

    } else {

      return this.tabfr[this.tabfr.indexOf(id)];

    }
  }


  capitalize = (s) => {
    if (typeof s !== 'string') return '';
    //console.log(s.charAt(0).toUpperCase() + s.slice(1));
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  tabfr : string[] = [
    "Bulbizarre",
    "Herbizarre",
    "Florizarre",
    "Salamèche",
    "Reptincel",
    "Dracaufeu",
    "Carapuce",
    "Carabaffe",
    "Tortank",
    "Chenipan",
    "Chrysacier",
    "Papilusion",
    "Aspicot",
    "Coconfort",
    "Dardargnan",
    "Roucool",
    "Roucoups",
    "Roucarnage",
    "Rattata",
    "Rattatac",
    "Piafabec",
    "Rapasdepic",
    "Abo",
    "Arbok",
    "Pikachu",
    "Raichu",
    "Sabelette",
    "Sablaireau",
    "Nidoran♀",
    "Nidorina",
    "Nidoqueen",
    "Nidoran♂",
    "Nidorino",
    "Nidoking",
    "Mélofée",
    "Mélodelfe",
    "Goupix",
    "Feunard",
    "Rondoudou",
    "Grodoudou",
    "Nosferapti",
    "Nosferalto",
    "Mystherbe",
    "Ortide",
    "Rafflesia",
    "Paras",
    "Parasect",
    "Mimitoss",
    "Aéromite",
    "Taupiqueur",
    "Triopikeur",
    "Miaouss",
    "Persian",
    "Psykokwak",
    "Akwakwak",
    "Férosinge",
    "Colossinge",
    "Caninos",
    "Arcanin",
    "Ptitard",
    "Têtarte",
    "Tartard",
    "Abra",
    "Kadabra",
    "Alakazam",
    "Machoc",
    "Machopeur",
    "Mackogneur",
    "Chétiflor",
    "Boustiflor",
    "Empiflor",
    "Tentacool",
    "Tentacruel",
    "Racaillou",
    "Gravalanch",
    "Grolem",
    "Ponyta",
    "Galopa",
    "Ramoloss",
    "Flagadoss",
    "Magnéti",
    "Magnéton",
    "Canarticho",
    "Doduo",
    "Dodrio",
    "Otaria",
    "Lamantine",
    "Tadmorv",
    "Grotadmorv",
    "Kokiyas",
    "Crustabri",
    "Fantominus",
    "Spectrum",
    "Ectoplasma",
    "Onix",
    "Soporifik",
    "Hypnomade",
    "Krabby",
    "Krabboss",
    "Voltorbe",
    "Électrode",
    "Nœunœuf",
    "Noadkoko",
    "Osselait",
    "Ossatueur",
    "Kicklee",
    "Tygnon",
    "Excelangue",
    "Smogo",
    "Smogogo",
    "Rhinocorne",
    "Rhinoféros",
    "Leveinard",
    "Saquedeneu",
    "Kangourex",
    "Hypotrempe",
    "Hypocéan",
    "Poissirène",
    "Poissoroy",
    "Stari",
    "Staross",
    "Mime",
    "Insécateur",
    "Lippoutou",
    "Élektek",
    "Magmar",
    "Scarabrute",
    "Tauros",
    "Magicarpe",
    "Léviator",
    "Lokhlass",
    "Métamorph",
    "Évoli",
    "Aquali",
    "Voltali",
    "Pyroli",
    "Porygon",
    "Amonita",
    "Amonistar",
    "Kabuto",
    "Kabutops",
    "Ptéra",
    "Ronflex",
    "Artikodin",
    "Électhor",
    "Sulfura",
    "Minidraco",
    "Draco",
    "Dracolosse",
    "Mewtwo",
    "Mew",
    "Germignon",
    "Macronium",
    "Méganium",
    "Héricendre",
    "Feurisson",
    "Typhlosion",
    "Kaiminus",
    "Crocrodil",
    "Aligatueur",
    "Fouinette",
    "Fouinar",
    "Hoothoot",
    "Noarfang",
    "Coxy",
    "Coxyclaque",
    "Mimigal",
    "Migalos",
    "Nostenfer",
    "Loupio",
    "Lanturn",
    "Pichu",
    "Mélo",
    "Toudoudou",
    "Togepi",
    "Togetic",
    "Natu",
    "Xatu",
    "Wattouat",
    "Lainergie",
    "Pharamp",
    "Joliflor",
    "Marill",
    "Azumarill",
    "Simularbre",
    "Tarpaud",
    "Granivol",
    "Floravol",
    "Cotovol",
    "Capumain",
    "Tournegrin",
    "Héliatronc",
    "Yanma",
    "Axoloto",
    "Maraiste",
    "Mentali",
    "Noctali",
    "Cornèbre",
    "Roigada",
    "Feuforêve",
    "Zarbi",
    "Qulbutoké",
    "Girafarig",
    "Pomdepic",
    "Foretress",
    "Insolourdo",
    "Scorplane",
    "Steelix",
    "Snubbull",
    "Granbull",
    "Qwilfish",
    "Cizayox",
    "Caratroc",
    "Scarhino",
    "Farfuret",
    "Teddiursa",
    "Ursaring",
    "Limagma",
    "Volcaropod",
    "Marcacrin",
    "Cochignon",
    "Corayon",
    "Rémoraid",
    "Octillery",
    "Cadoizo",
    "Démanta",
    "Airmure",
    "Malosse",
    "Démolosse",
    "Hyporoi",
    "Phanpy",
    "Donphan",
    "Porygon2",
    "Cerfrousse",
    "Queulorior",
    "Debugant",
    "Kapoera",
    "Lippouti",
    "Élekid",
    "Magby",
    "Écrémeuh",
    "Leuphorie",
    "Raikou",
    "Entei",
    "Suicune",
    "Embrylex",
    "Ymphect",
    "Tyranocif",
    "Lugia",
    "Ho-Oh",
    "Celebi",
    "Arcko",
    "Massko",
    "Jungko",
    "Poussifeu",
    "Galifeu",
    "Braségali",
    "Gobou",
    "Flobio",
    "Laggron",
    "Medhyèna",
    "Grahyèna",
    "Zigzaton",
    "Linéon",
    "Chenipotte",
    "Armulys",
    "Charmillon",
    "Blindalys",
    "Papinox",
    "Nénupiot",
    "Lombre",
    "Ludicolo",
    "Grainipiot",
    "Pifeuil",
    "Tengalice",
    "Nirondelle",
    "Hélédelle",
    "Goélise",
    "Bekipan",
    "Tarsal",
    "Kirlia",
    "Gardevoir",
    "Arakdo",
    "Maskadra",
    "Balignon",
    "Chapignon",
    "Parecool",
    "Vigoroth",
    "Monaflèmit",
    "Ningale",
    "Ninjask",
    "Munja",
    "Chuchmur",
    "Ramboum",
    "Brouhabam",
    "Makuhita",
    "Hariyama",
    "Azurill",
    "Tarinor",
    "Skitty",
    "Delcatty",
    "Ténéfix",
    "Mysdibule",
    "Galekid",
    "Galegon",
    "Galeking",
    "Méditikka",
    "Charmina",
    "Dynavolt",
    "Élecsprint",
    "Posipi",
    "Négapi",
    "Muciole",
    "Lumivole",
    "Rosélia",
    "Gloupti",
    "Avaltout",
    "Carvanha",
    "Sharpedo",
    "Wailmer",
    "Wailord",
    "Chamallot",
    "Camérupt",
    "Chartor",
    "Spoink",
    "Groret",
    "Spinda",
    "Kraknoix",
    "Vibraninf",
    "Libégon",
    "Cacnea",
    "Cacturne",
    "Tylton",
    "Altaria",
    "Mangriff",
    "Séviper",
    "Séléroc",
    "Solaroc",
    "Barloche",
    "Barbicha",
    "Écrapince",
    "Colhomard",
    "Balbuto",
    "Kaorine",
    "Lilia",
    "Vacilys",
    "Anorith",
    "Armaldo",
    "Barpau",
    "Milobellus",
    "Morphéo",
    "Kecleon",
    "Polichombr",
    "Branette",
    "Skelénox",
    "Téraclope",
    "Tropius",
    "Éoko",
    "Absol",
    "Okéoké",
    "Stalgamin",
    "Oniglali",
    "Obalie",
    "Phogleur",
    "Kaimorse",
    "Coquiperl",
    "Serpang",
    "Rosabyss",
    "Relicanth",
    "Lovdisc",
    "Draby",
    "Drackhaus",
    "Drattak",
    "Terhal",
    "Métang",
    "Métalosse",
    "Regirock",
    "Regice",
    "Registeel",
    "Latias",
    "Latios",
    "Kyogre",
    "Groudon",
    "Rayquaza",
    "Jirachi",
    "Deoxys",
    "Tortipouss",
    "Boskara",
    "Torterra",
    "Ouisticram",
    "Chimpenfeu",
    "Simiabraz",
    "Tiplouf",
    "Prinplouf",
    "Pingoléon",
    "Étourmi",
    "Étourvol",
    "Étouraptor",
    "Keunotor",
    "Castorno",
    "Crikzik",
    "Mélokrik",
    "Lixy",
    "Luxio",
    "Luxray",
    "Rozbouton",
    "Roserade",
    "Kranidos",
    "Charkos",
    "Dinoclier",
    "Bastiodon",
    "Cheniti",
    "Cheniselle",
    "Papilord",
    "Apitrini",
    "Apireine",
    "Pachirisu",
    "Mustébouée",
    "Mustéflott",
    "Ceribou",
    "Ceriflor",
    "Sancoki",
    "Tritosor",
    "Capidextre",
    "Baudrive",
    "Grodrive",
    "Laporeille",
    "Lockpin",
    "Magirêve",
    "Corboss",
    "Chaglam",
    "Chaffreux",
    "Korillon",
    "Moufouette",
    "Moufflair",
    "Archéomire",
    "Archéodong",
    "Manzaï",
    "Jr",
    "Ptiravi",
    "Pijako",
    "Spiritomb",
    "Griknot",
    "Carmache",
    "Carchacrok",
    "Goinfrex",
    "Riolu",
    "Lucario",
    "Hippopotas",
    "Hippodocus",
    "Rapion",
    "Drascore",
    "Cradopaud",
    "Coatox",
    "Vortente",
    "Écayon",
    "Luminéon",
    "Babimanta",
    "Blizzi",
    "Blizzaroi",
    "Dimoret",
    "Magnézone",
    "Coudlangue",
    "Rhinastoc",
    "Bouldeneu",
    "Élekable",
    "Maganon",
    "Togekiss",
    "Yanméga",
    "Phyllali",
    "Givrali",
    "Scorvol",
    "Mammochon",
    "Z",
    "Gallame",
    "Tarinorme",
    "Noctunoir",
    "Momartik",
    "Motisma",
    "Créhelf",
    "Créfollet",
    "Créfadet",
    "Dialga",
    "Palkia",
    "Heatran",
    "Regigigas",
    "Giratina",
    "Cresselia",
    "Phione",
    "Manaphy",
    "Darkrai",
    "Shaymin",
    "Arceus",
    "Victini",
    "Vipélierre",
    "Lianaja",
    "Majaspic",
    "Gruikui",
    "Grotichon",
    "Roitiflam",
    "Moustillon",
    "Mateloutre",
    "Clamiral",
    "Ratentif",
    "Miradar",
    "Ponchiot",
    "Ponchien",
    "Mastouffe",
    "Chacripan",
    "Léopardus",
    "Feuillajou",
    "Feuiloutan",
    "Flamajou",
    "Flamoutan",
    "Flotajou",
    "Flotoutan",
    "Munna",
    "Mushana",
    "Poichigeon",
    "Colombeau",
    "Déflaisan",
    "Zébribon",
    "Zéblitz",
    "Nodulithe",
    "Géolithe",
    "Gigalithe",
    "Chovsourir",
    "Rhinolove",
    "Rototaupe",
    "Minotaupe",
    "Nanméouïe",
    "Charpenti",
    "Ouvrifier",
    "Bétochef",
    "Tritonde",
    "Batracné",
    "Crapustule",
    "Judokrak",
    "Karaclée",
    "Larveyette",
    "Couverdure",
    "Manternel",
    "Venipatte",
    "Scobolide",
    "Brutapode",
    "Doudouvet",
    "Farfaduvet",
    "Chlorobule",
    "Fragilady",
    "Bargantua",
    "Mascaïman",
    "Escroco",
    "Crocorible",
    "Darumarond",
    "Darumacho",
    "Maracachi",
    "Crabicoque",
    "Crabaraque",
    "Baggiguane",
    "Baggaïd",
    "Cryptéro",
    "Tutafeh",
    "Tutankafer",
    "Carapagos",
    "Mégapagos",
    "Arkéapti",
    "Aéroptéryx",
    "Miamiasme",
    "Miasmax",
    "Zorua",
    "Zoroark",
    "Chinchidou",
    "Pashmilla",
    "Scrutella",
    "Mesmérella",
    "Sidérella",
    "Nucléos",
    "Méios",
    "Symbios",
    "Couaneton",
    "Lakmécygne",
    "Sorbébé",
    "Sorboul",
    "Sorbouboul",
    "Vivaldaim",
    "Haydaim",
    "Emolga",
    "Carabing",
    "Lançargot",
    "Trompignon",
    "Gaulet",
    "Viskuse",
    "Moyade",
    "Mamanbo",
    "Statitik",
    "Mygavolt",
    "Grindur",
    "Noacier",
    "Tic",
    "Clic",
    "Cliticlic",
    "Anchwatt",
    "Lampéroie",
    "Ohmassacre",
    "Lewsor",
    "Neitram",
    "Funécire",
    "Mélancolux",
    "Lugulabre",
    "Coupenotte",
    "Incisache",
    "Tranchodon",
    "Polarhume",
    "Polagriffe",
    "Hexagel",
    "Escargaume",
    "Limaspeed",
    "Limonde",
    "Kungfouine",
    "Shaofouine",
    "Drakkarmin",
    "Gringolem",
    "Golemastoc",
    "Scalpion",
    "Scalproie",
    "Frison",
    "Furaiglon",
    "Gueriaigle",
    "Vostourno",
    "Vaututrice",
    "Aflamanoir",
    "Fermite",
    "Solochi",
    "Diamat",
    "Trioxhydre",
    "Pyronille",
    "Pyrax",
    "Cobaltium",
    "Terrakium",
    "Viridium",
    "Boréas",
    "Fulguris",
    "Reshiram",
    "Zekrom",
    "Démétéros",
    "Kyurem",
    "Keldeo",
    "Meloetta",
    "Genesect",
    "Marisson",
    "Boguérisse",
    "Blindépique",
    "Feunnec",
    "Roussil",
    "Goupelin",
    "Grenousse",
    "Croâporal",
    "Amphinobi",
    "Sapereau",
    "Excavarenne",
    "Passerouge",
    "Braisillon",
    "Flambusard",
    "Lépidonille",
    "Pérégrain",
    "Prismillon",
    "Hélionceau",
    "Némélios",
    "Flabébé",
    "Floette",
    "Florges",
    "Cabriolaine",
    "Chevroum",
    "Pandespiègle",
    "Pandarbare",
    "Couafarel",
    "Psystigri",
    "Mistigrix",
    "Monorpale",
    "Dimoclès",
    "Exagide",
    "Fluvetin",
    "Cocotine",
    "Sucroquin",
    "Cupcanaille",
    "Sepiatop",
    "Sepiatroce",
    "Opermine",
    "Golgopathe",
    "Venalgue",
    "Kravarech",
    "Flingouste",
    "Gamblast",
    "Galvaran",
    "Iguolta",
    "Ptyranidur",
    "Rexillius",
    "Amagara",
    "Dragmara",
    "Nymphali",
    "Brutalibré",
    "Dedenne",
    "Strassie",
    "Mucuscule",
    "Colimucus",
    "Muplodocus",
    "Trousselin",
    "Brocélôme",
    "Desséliande",
    "Pitrouille",
    "Banshitrouye",
    "Grelaçon",
    "Séracrawl",
    "Sonistrelle",
    "Bruyverne",
    "Xerneas",
    "Yveltal",
    "Zygarde",
    "Diancie",
    "Hoopa",
    "Volcanion",
    "Brindibou",
    "Efflèche",
    "Archéduc",
    "Flamiaou‎‎",
    "Matoufeu",
    "Félinferno",
    "Otaquin",
    "Otarlette",
    "Oratoria",
    "Picassaut",
    "Piclairon",
    "Bazoucan",
    "Manglouton",
    "Argouste",
    "Larvibule",
    "Chrysapile",
    "Lucanon",
    "Crabagarre",
    "Crabominable",
    "Plumeline",
    "Bombydou",
    "Rubombelle",
    "Rocabot",
    "Lougaroc",
    "Froussardine",
    "Vorastérie",
    "Prédastérie",
    "Tiboudet",
    "Bourrinos",
    "Araqua",
    "Tarenbulle",
    "Mimantis",
    "Floramantis",
    "Spododo",
    "Lampignon",
    "Tritox",
    "Malamandre",
    "Nounourson",
    "Chelours",
    "Croquine",
    "Candine",
    "Sucreine",
    "Guérilande",
    "Gouroutan",
    "Quartermac",
    "Sovkipou",
    "Sarmuraï",
    "Bacabouh",
    "Trépassable",
    "Concombaffe",
    "Type:0",
    "Silvallié",
    "Météno",
    "Dodoala",
    "Boumata",
    "Togedemaru",
    "Mimiqui",
    "Denticrisse",
    "Draïeul",
    "Sinistrail",
    "Bébécaille",
    "Écaïd",
    "Ékaïser",
    "Tokorico",
    "Tokopiyon",
    "Tokotoro",
    "Tokopisco",
    "Cosmog",
    "Cosmovum",
    "Solgaleo",
    "Lunala",
    "Zéroïd",
    "Mouscoto",
    "Cancrelove",
    "Câblifère",
    "Bamboiselle",
    "Katagami",
    "Engloutyran",
    "Necrozma",
    "Magearna",
    "Marshadow",
    "Vémini",
    "Mandrillon",
    "Ama-Ama",
    "Pierroteknik",
    "Zeraora",
    "Meltan",
    "Melmetal"
  ]
  
  taben : string[] = [
    "Bulbasaur",
    "Ivysaur",
    "Venusaur",
    "Charmander",
    "Charmeleon",
    "Charizard",
    "Squirtle",
    "Wartortle",
    "Blastoise",
    "Caterpie",
    "Metapod",
    "Butterfree",
    "Weedle",
    "Kakuna",
    "Beedrill",
    "Pidgey",
    "Pidgeotto",
    "Pidgeot",
    "Rattata",
    "Raticate",
    "Spearow",
    "Fearow",
    "Ekans",
    "Arbok",
    "Pikachu",
    "Raichu",
    "Sandshrew",
    "Sandslash",
    "Nidoran♀",
    "Nidorina",
    "Nidoqueen",
    "Nidoran♂",
    "Nidorino",
    "Nidoking",
    "Clefairy",
    "Clefable",
    "Vulpix",
    "Ninetales",
    "Jigglypuff",
    "Wigglytuff",
    "Zubat",
    "Golbat",
    "Oddish",
    "Gloom",
    "Vileplume",
    "Paras",
    "Parasect",
    "Venonat",
    "Venomoth",
    "Diglett",
    "Dugtrio",
    "Meowth",
    "Persian",
    "Psyduck",
    "Golduck",
    "Mankey",
    "Primeape",
    "Growlithe",
    "Arcanine",
    "Poliwag",
    "Poliwhirl",
    "Poliwrath",
    "Abra",
    "Kadabra",
    "Alakazam",
    "Machop",
    "Machoke",
    "Machamp",
    "Bellsprout",
    "Weepinbell",
    "Victreebel",
    "Tentacool",
    "Tentacruel",
    "Geodude",
    "Graveler",
    "Golem",
    "Ponyta",
    "Rapidash",
    "Slowpoke",
    "Slowbro",
    "Magnemite",
    "Magneton",
    "Farfetch’d",
    "Doduo",
    "Dodrio",
    "Seel",
    "Dewgong",
    "Grimer",
    "Muk",
    "Shellder",
    "Cloyster",
    "Gastly",
    "Haunter",
    "Gengar",
    "Onix",
    "Drowzee",
    "Hypno",
    "Krabby",
    "Kingler",
    "Voltorb",
    "Electrode",
    "Exeggcute",
    "Exeggutor",
    "Cubone",
    "Marowak",
    "Hitmonlee",
    "Hitmonchan",
    "Lickitung",
    "Koffing",
    "Weezing",
    "Rhyhorn",
    "Rhydon",
    "Chansey",
    "Tangela",
    "Kangaskhan",
    "Horsea",
    "Seadra",
    "Goldeen",
    "Seaking",
    "Staryu",
    "Starmie",
    "Mr. Mime",
    "Scyther",
    "Jynx",
    "Electabuzz",
    "Magmar",
    "Pinsir",
    "Tauros",
    "Magikarp",
    "Gyarados",
    "Lapras",
    "Ditto",
    "Eevee",
    "Vaporeon",
    "Jolteon",
    "Flareon",
    "Porygon",
    "Omanyte",
    "Omastar",
    "Kabuto",
    "Kabutops",
    "Aerodactyl",
    "Snorlax",
    "Articuno",
    "Zapdos",
    "Moltres",
    "Dratini",
    "Dragonair",
    "Dragonite",
    "Mewtwo",
    "Mew",
    "Chikorita",
    "Bayleef",
    "Meganium",
    "Cyndaquil",
    "Quilava",
    "Typhlosion",
    "Totodile",
    "Croconaw",
    "Feraligatr",
    "Sentret",
    "Furret",
    "Hoothoot",
    "Noctowl",
    "Ledyba",
    "Ledian",
    "Spinarak",
    "Ariados",
    "Crobat",
    "Chinchou",
    "Lanturn",
    "Pichu",
    "Cleffa",
    "Igglybuff",
    "Togepi",
    "Togetic",
    "Natu",
    "Xatu",
    "Mareep",
    "Flaaffy",
    "Ampharos",
    "Bellossom",
    "Marill",
    "Azumarill",
    "Sudowoodo",
    "Politoed",
    "Hoppip",
    "Skiploom",
    "Jumpluff",
    "Aipom",
    "Sunkern",
    "Sunflora",
    "Yanma",
    "Wooper",
    "Quagsire",
    "Espeon",
    "Umbreon",
    "Murkrow",
    "Slowking",
    "Misdreavus",
    "Unown",
    "Wobbuffet",
    "Girafarig",
    "Pineco",
    "Forretress",
    "Dunsparce",
    "Gligar",
    "Steelix",
    "Snubbull",
    "Granbull",
    "Qwilfish",
    "Scizor",
    "Shuckle",
    "Heracross",
    "Sneasel",
    "Teddiursa",
    "Ursaring",
    "Slugma",
    "Magcargo",
    "Swinub",
    "Piloswine",
    "Corsola",
    "Remoraid",
    "Octillery",
    "Delibird",
    "Mantine",
    "Skarmory",
    "Houndour",
    "Houndoom",
    "Kingdra",
    "Phanpy",
    "Donphan",
    "Porygon2",
    "Stantler",
    "Smeargle",
    "Tyrogue",
    "Hitmontop",
    "Smoochum",
    "Elekid",
    "Magby",
    "Miltank",
    "Blissey",
    "Raikou",
    "Entei",
    "Suicune",
    "Larvitar",
    "Pupitar",
    "Tyranitar",
    "Lugia",
    "Ho-Oh",
    "Celebi",
    "Treecko",
    "Grovyle",
    "Sceptile",
    "Torchic",
    "Combusken",
    "Blaziken",
    "Mudkip",
    "Marshtomp",
    "Swampert",
    "Poochyena",
    "Mightyena",
    "Zigzagoon",
    "Linoone",
    "Wurmple",
    "Silcoon",
    "Beautifly",
    "Cascoon",
    "Dustox",
    "Lotad",
    "Lombre",
    "Ludicolo",
    "Seedot",
    "Nuzleaf",
    "Shiftry",
    "Taillow",
    "Swellow",
    "Wingull",
    "Pelipper",
    "Ralts",
    "Kirlia",
    "Gardevoir",
    "Surskit",
    "Masquerain",
    "Shroomish",
    "Breloom",
    "Slakoth",
    "Vigoroth",
    "Slaking",
    "Nincada",
    "Ninjask",
    "Shedinja",
    "Whismur",
    "Loudred",
    "Exploud",
    "Makuhita",
    "Hariyama",
    "Azurill",
    "Nosepass",
    "Skitty",
    "Delcatty",
    "Sableye",
    "Mawile",
    "Aron",
    "Lairon",
    "Aggron",
    "Meditite",
    "Medicham",
    "Electrike",
    "Manectric",
    "Plusle",
    "Minun",
    "Volbeat",
    "Illumise",
    "Roselia",
    "Gulpin",
    "Swalot",
    "Carvanha",
    "Sharpedo",
    "Wailmer",
    "Wailord",
    "Numel",
    "Camerupt",
    "Torkoal",
    "Spoink",
    "Grumpig",
    "Spinda",
    "Trapinch",
    "Vibrava",
    "Flygon",
    "Cacnea",
    "Cacturne",
    "Swablu",
    "Altaria",
    "Zangoose",
    "Seviper",
    "Lunatone",
    "Solrock",
    "Barboach",
    "Whiscash",
    "Corphish",
    "Crawdaunt",
    "Baltoy",
    "Claydol",
    "Lileep",
    "Cradily",
    "Anorith",
    "Armaldo",
    "Feebas",
    "Milotic",
    "Castform",
    "Kecleon",
    "Shuppet",
    "Banette",
    "Duskull",
    "Dusclops",
    "Tropius",
    "Chimecho",
    "Absol",
    "Wynaut",
    "Snorunt",
    "Glalie",
    "Spheal",
    "Sealeo",
    "Walrein",
    "Clamperl",
    "Huntail",
    "Gorebyss",
    "Relicanth",
    "Luvdisc",
    "Bagon",
    "Shelgon",
    "Salamence",
    "Beldum",
    "Metang",
    "Metagross",
    "Regirock",
    "Regice",
    "Registeel",
    "Latias",
    "Latios",
    "Kyogre",
    "Groudon",
    "Rayquaza",
    "Jirachi",
    "Deoxys",
    "Turtwig",
    "Grotle",
    "Torterra",
    "Chimchar",
    "Monferno",
    "Infernape",
    "Piplup",
    "Prinplup",
    "Empoleon",
    "Starly",
    "Staravia",
    "Staraptor",
    "Bidoof",
    "Bibarel",
    "Kricketot",
    "Kricketune",
    "Shinx",
    "Luxio",
    "Luxray",
    "Budew",
    "Roserade",
    "Cranidos",
    "Rampardos",
    "Shieldon",
    "Bastiodon",
    "Burmy",
    "Wormadam",
    "Mothim",
    "Combee",
    "Vespiquen",
    "Pachirisu",
    "Buizel",
    "Floatzel",
    "Cherubi",
    "Cherrim",
    "Shellos",
    "Gastrodon",
    "Ambipom",
    "Drifloon",
    "Drifblim",
    "Buneary",
    "Lopunny",
    "Mismagius",
    "Honchkrow",
    "Glameow",
    "Purugly",
    "Chingling",
    "Stunky",
    "Skuntank",
    "Bronzor",
    "Bronzong",
    "Bonsly",
    "Mime Jr.",
    "Happiny",
    "Chatot",
    "Spiritomb",
    "Gible",
    "Gabite",
    "Garchomp",
    "Munchlax",
    "Riolu",
    "Lucario",
    "Hippopotas",
    "Hippowdon",
    "Skorupi",
    "Drapion",
    "Croagunk",
    "Toxicroak",
    "Carnivine",
    "Finneon",
    "Lumineon",
    "Mantyke",
    "Snover",
    "Abomasnow",
    "Weavile",
    "Magnezone",
    "Lickilicky",
    "Rhyperior",
    "Tangrowth",
    "Electivire",
    "Magmortar",
    "Togekiss",
    "Yanmega",
    "Leafeon",
    "Glaceon",
    "Gliscor",
    "Mamoswine",
    "Porygon-Z",
    "Gallade",
    "Probopass",
    "Dusknoir",
    "Froslass",
    "Rotom",
    "Uxie",
    "Mesprit",
    "Azelf",
    "Dialga",
    "Palkia",
    "Heatran",
    "Regigigas",
    "Giratina",
    "Cresselia",
    "Phione",
    "Manaphy",
    "Darkrai",
    "Shaymin",
    "Arceus",
    "Victini",
    "Snivy",
    "Servine",
    "Serperior",
    "Tepig",
    "Pignite",
    "Emboar",
    "Oshawott",
    "Dewott",
    "Samurott",
    "Patrat",
    "Watchog",
    "Lillipup",
    "Herdier",
    "Stoutland",
    "Purrloin",
    "Liepard",
    "Pansage",
    "Simisage",
    "Pansear",
    "Simisear",
    "Panpour",
    "Simipour",
    "Munna",
    "Musharna",
    "Pidove",
    "Tranquill",
    "Unfezant",
    "Blitzle",
    "Zebstrika",
    "Roggenrola",
    "Boldore",
    "Gigalith",
    "Woobat",
    "Swoobat",
    "Drilbur",
    "Excadrill",
    "Audino",
    "Timburr",
    "Gurdurr",
    "Conkeldurr",
    "Tympole",
    "Palpitoad",
    "Seismitoad",
    "Throh",
    "Sawk",
    "Sewaddle",
    "Swadloon",
    "Leavanny",
    "Venipede",
    "Whirlipede",
    "Scolipede",
    "Cottonee",
    "Whimsicott",
    "Petilil",
    "Lilligant",
    "Basculin",
    "Sandile",
    "Krokorok",
    "Krookodile",
    "Darumaka",
    "Darmanitan",
    "Maractus",
    "Dwebble",
    "Crustle",
    "Scraggy",
    "Scrafty",
    "Sigilyph",
    "Yamask",
    "Cofagrigus",
    "Tirtouga",
    "Carracosta",
    "Archen",
    "Archeops",
    "Trubbish",
    "Garbodor",
    "Zorua",
    "Zoroark",
    "Minccino",
    "Cinccino",
    "Gothita",
    "Gothorita",
    "Gothitelle",
    "Solosis",
    "Duosion",
    "Reuniclus",
    "Ducklett",
    "Swanna",
    "Vanillite",
    "Vanillish",
    "Vanilluxe",
    "Deerling",
    "Sawsbuck",
    "Emolga",
    "Karrablast",
    "Escavalier",
    "Foongus",
    "Amoonguss",
    "Frillish",
    "Jellicent",
    "Alomomola",
    "Joltik",
    "Galvantula",
    "Ferroseed",
    "Ferrothorn",
    "Klink",
    "Klang",
    "Klinklang",
    "Tynamo",
    "Eelektrik",
    "Eelektross",
    "Elgyem",
    "Beheeyem",
    "Litwick",
    "Lampent",
    "Chandelure",
    "Axew",
    "Fraxure",
    "Haxorus",
    "Cubchoo",
    "Beartic",
    "Cryogonal",
    "Shelmet",
    "Accelgor",
    "Stunfisk",
    "Mienfoo",
    "Mienshao",
    "Druddigon",
    "Golett",
    "Golurk",
    "Pawniard",
    "Bisharp",
    "Bouffalant",
    "Rufflet",
    "Braviary",
    "Vullaby",
    "Mandibuzz",
    "Heatmor",
    "Durant",
    "Deino",
    "Zweilous",
    "Hydreigon",
    "Larvesta",
    "Volcarona",
    "Cobalion",
    "Terrakion",
    "Virizion",
    "Tornadus",
    "Thundurus",
    "Reshiram",
    "Zekrom",
    "Landorus",
    "Kyurem",
    "Keldeo",
    "Meloetta",
    "Genesect",
    "Chespin",
    "Quilladin",
    "Chesnaught",
    "Fennekin",
    "Braixen",
    "Delphox",
    "Froakie",
    "Frogadier",
    "Greninja",
    "Bunnelby",
    "Diggersby",
    "Fletchling",
    "Fletchinder",
    "Talonflame",
    "Scatterbug",
    "Spewpa",
    "Vivillon",
    "Litleo",
    "Pyroar",
    "Flabebe",
    "Floette",
    "Florges",
    "Skiddo",
    "Gogoat",
    "Pancham",
    "Pangoro",
    "Furfrou",
    "Espurr",
    "Meowstic",
    "Honedge",
    "Doublade",
    "Aegislash",
    "Spritzee",
    "Aromatisse",
    "Swirlix",
    "Slurpuff",
    "Inkay",
    "Malamar",
    "Binacle",
    "Barbaracle",
    "Skrelp",
    "Dragalge",
    "Clauncher",
    "Clawitzer",
    "Helioptile",
    "Heliolisk",
    "Tyrunt",
    "Tyrantrum",
    "Amaura",
    "Aurorus",
    "Sylveon",
    "Hawlucha",
    "Dedenne",
    "Carbink",
    "Goomy",
    "Sliggoo",
    "Goodra",
    "Klefki",
    "Phantump",
    "Trevenant",
    "Pumpkaboo",
    "Gourgeist",
    "Bergmite",
    "Avalugg",
    "Noibat",
    "Noivern",
    "Xerneas",
    "Yveltal",
    "Zygarde",
    "Diancie",
    "Hoopa",
    "Volcanion",
    "Rowlet",
    "Dartrix",
    "Decidueye",
    "Litten",
    "Torracat",
    "Incineroar",
    "Popplio",
    "Brionne",
    "Primarina",
    "Pikipek",
    "Trumbeak",
    "Toucannon",
    "Yungoos",
    "Gumshoos",
    "Grubbin",
    "Charjabug",
    "Vikavolt",
    "Crabrawler",
    "Crabominable",
    "Oricorio",
    "Cutiefly",
    "Ribombee",
    "Rockruff",
    "Lycanroc",
    "Wishiwashi",
    "Mareanie",
    "Toxapex",
    "Mudbray",
    "Mudsdale",
    "Dewpider",
    "Araquanid",
    "Fomantis",
    "Lurantis",
    "Morelull",
    "Shiinotic",
    "Salandit",
    "Salazzle",
    "Stufful",
    "Bewear",
    "Bounsweet",
    "Steenee",
    "Tsareena",
    "Comfey",
    "Oranguru",
    "Passimian",
    "Wimpod",
    "Golisopod",
    "Sandygast",
    "Palossand",
    "Pyukumuku",
    "Type: Null",
    "Silvally",
    "Minior",
    "Komala",
    "Turtonator",
    "Togedemaru",
    "Mimikyu",
    "Bruxish",
    "Drampa",
    "Dhelmise",
    "Jangmo-o",
    "Hakamo-o",
    "Kommo-o",
    "Tapu Koko",
    "Tapu Lele",
    "Tapu Bulu",
    "Tapu Fini",
    "Cosmog",
    "Cosmoem",
    "Solgaleo",
    "Lunala",
    "Nihilego",
    "Buzzwole",
    "Pheromosa",
    "Xurkitree",
    "Celesteela",
    "Kartana",
    "Guzzlord",
    "Necrozma",
    "Magearna",
    "Marshadow",
    "Poipole",
    "Naganadel",
    "Stakataka",
    "Blacephalon",
    "Zeraora",
    "Meltan",
    "Melmetal"
  ]
  


}

