const Order = require("./assignment1Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    TYPE: Symbol("type"),
    SIZE:   Symbol("size"),
    TOPPINGS:   Symbol("toppings"),
    DRINKS:  Symbol("drinks")
});

module.exports = class DakshinOrder extends Order{
    constructor(){
        super();
        this.stateCur = OrderState.WELCOMING;
        this.typeOfDosa = "";
        this.sSize = "";        
        this.sToppings = "";
        this.sDrinks = "";
        this.price=0;        
    }
    handleInput(sInput){
        let aReturn = [];
        
        switch(this.stateCur){
            case OrderState.WELCOMING:
                this.stateCur = OrderState.SIZE;
                aReturn.push("Welcome to Dakshin Dosa.");
                aReturn.push("What Dosa size would you like?");
                break;
                
            case OrderState.SIZE:
                this.stateCur = OrderState.TYPE
                this.sSize = sInput;
                aReturn.push("MENU");                
                aReturn.push("GunPowderDosa");
                aReturn.push("PavBhajiDosa");
                aReturn.push("ChilliPaneerDosa");                                
                aReturn.push("What type of dosa would you like?");                                
                
                if(this.sSize == "small")
                {
                    this.price += 4;
                }
                else if(this.sSize == "medium")
                {
                    this.price += 6;
                }
                else if(this.sSize == "large"){
                    this.price += 8;
                }
                break;
            case OrderState.TYPE:
                this.stateCur = OrderState.TOPPINGS;
                this.typeOfDosa = sInput;
                aReturn.push("What topping you would like to add?");                
                if(this.typeOfDosa == "GunPowderDosa")
                {
                    this.price += 5;
                }
                else if(this.typeOfDosa == "PavBhajiDosa")
                {
                    this.price += 8;
                }
                else if(this.typeOfDosa == "ChilliPaneerDosa"){
                    this.price += 6;
                }
                break;
            case OrderState.TOPPINGS:
                this.stateCur = OrderState.DRINKS
                this.sToppings = sInput;
                aReturn.push("Would you like any drinks with that?");
                if(this.sToppings)
                {
                   this.price += 1;
                }
                break;
            case OrderState.DRINKS:
                this.isDone(true);
                if(sInput.toLowerCase() != "no"){
                    this.sDrinks = sInput;  
                }
                aReturn.push("Thank-you for your order of");
                aReturn.push(`${this.typeOfDosa} ${this.sSize} with ${this.sToppings}`);
                if(this.sDrinks){
                    this.price += 2 
                    aReturn.push(this.sDrinks);                                  
                }

                this.price = (this.price * 1.13).toFixed(2);                 
                aReturn.push("Your total payment is");
                aReturn.push(`$${this.price}`);
                let d = new Date(); 
                d.setMinutes(d.getMinutes() + 20);
                aReturn.push(`Please pick it up at ${d.toTimeString()}`);
                break;
        }
        return aReturn;
    }
}