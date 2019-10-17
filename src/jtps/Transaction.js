import jTPS_Transaction from './jTPS_Transaction'

export class Transaction extends jTPS_Transaction{

    constructor(oldList, newList, current){
        super();
        this.oldList = oldList;
        this.newList = newList;
        this.current = current;        
    }

    doTransaction(){
        this.current = this.newList;
    }

    undoTransaction(){
        this.current = this.oldList;
    }
}

export default Transaction;