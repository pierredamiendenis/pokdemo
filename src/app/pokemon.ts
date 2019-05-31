export class Pokemon {

    constructor(
        public id:number,
        public name:string,
        public type:[],
        public stats:[],
        public moves:[]) { }

    getId(){
        return this.id;
    }

    getName(){
        return this.name;
    }

    getType(){
        return this.type;
    }

    getStats(){
        return this.stats;
    }

    getMoves(){
        return this.moves;
    }
}
