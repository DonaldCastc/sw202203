import { getConnection} from '@models/sqlite/SqliteConn';
import { CashFlowDao } from '@server/dao/models/sqlite/CashFlowDao';

interface ICashFlow {
    type: 'INCOME' | 'EXPENSE';
    date: Date;
    amount: number;
    descripcion: String;
}

class CashFlow {
    private dao: CashFlowDao;
    public constructor(){
        getConnection()
            .then(conn=>{
                this.dao = new CashFlowDao(conn);
            })
            .catch(ex=>console.error(ex));
    }

    private cashflowItems : ICashFlow[] = [];
    //Consultas
    public getAllCashFlow() {
        return this.dao.getClashFlows();// select * from cashflow
    }

    public getCashFlowByIndex( index:number) {
        return this.dao.getClashFlowById({_id:index});
    }

    public addCashFlow( cashFlow:ICashFlow){
        return this.dao.insertNewCashFlow(cashFlow);
    }

    public updateCashFlow(index:number, cashFlow:ICashFlow): boolean {
        if( index >= 0 && index < this.cashflowItems.length){
            this.cashflowItems[index] = cashFlow;
            return true;
        }
        return false;
    }

    public deleteCashFlow( index:number) {
        return this.dao.deleteCashFlow({_id:index});
    }
}

export {ICashFlow, CashFlow};