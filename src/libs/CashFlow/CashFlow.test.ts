import {ICashFlow, CashFlow} from './index';
describe ('CashFlow Lib Unit Tests',()=>{
    it( 'should Create an Instance of CashFlow', ()=>{
        const cashFlowInstance = new CashFlow();
        expect(cashFlowInstance).toBeDefined();
    } )
    it( 'should Add na new CashFlow Item', ()=>{
        const cashFlowInstance = new CashFlow();
        const cashflowItem : ICashFlow = {
            type: 'INCOME',
            date: new Date(),
            amount: 100,
            descripcion: 'Receipt A101 from SW'
        };
        const index = cashFlowInstance.addCashFlow(cashflowItem);
        expect(index).toBe(0);
    })
});