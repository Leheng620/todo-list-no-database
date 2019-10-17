'use strict'
export class jTPS_Transaction{
    /**
     * This method is called by jTPS when a transaction is executed.
     */
    doTransaction(){}
    
    /**
     * This method is called by jTPS when a transaction is undone.
     */
    undoTransaction(){}
}

export default jTPS_Transaction;