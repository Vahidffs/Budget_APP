// View
var UIController = (function(){
    var DOMStrings = {
        inputType:'.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputbtn:'.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        totalexpense : '.budget__expenses--value',
        totalinc:'.budget__income--value',
        totalpercentage:'.budget__expenses--percentage',
        totalbudget:'.budget__value'
    }
   
    return{
        getInput: function(){
            return{
                type: document.querySelector(DOMStrings.inputType).value,
                description:document.querySelector(DOMStrings.inputDescription).value,
                value: document.querySelector(DOMStrings.inputValue).value
            }
        },
        getDomStrings: function(){
            return DOMStrings;
        },
        addItemToList: function(obj,type) {
            var html,container;
            if(type==='inc'){
                container = DOMStrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">+ %value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div> </div> </div>';
            }else if(type==='exp'){
                container = DOMStrings.expensesContainer;
               html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">- %value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>';
            }
            html = html.replace('%id%',obj.id);
            html = html.replace('%description%',obj.description);
            html = html.replace('%value%',obj.value);
            document.querySelector(container).insertAdjacentHTML("beforeend",html);

        },
        clearFields: function(){
            var fields,arrfields;
            fields = document.querySelectorAll(DOMStrings.inputDescription + ', ' + DOMStrings.inputValue);
            console.log(fields);
            arrfields = Array.prototype.slice.call(fields);
            arrfields.forEach(function(item) {
                item.value = "";
            });
            arrfields[0].focus();
        },
        displayBudget: function(obj){
            document.querySelector(DOMStrings.totalbudget).textContent = obj.budget;
            document.querySelector(DOMStrings.totalexpense).textContent = obj.totalexp;
            if(obj.percentage>0){
                document.querySelector(DOMStrings.totalpercentage).textContent = obj.percentage + ' %';
            } else{
                document.querySelector(DOMStrings.totalpercentage).textContent = '-----';
            }
            document.querySelector(DOMStrings.totalinc).textContent = obj.totalinc;
        }
    }
})();
// Model
var budgetController = (function(){
    var Expense = function(id,description,value){
        this.id = id;
        this.description = description;
        this.value = value;
    }
    var Income = function(id,description,value){
        this.id = id;
        this.description = description;
        this.value = value;
    }
    var calculatetotals = function(type){
        var sum = 0;
        data.allitems[type].forEach(function(item){
            sum += item.value;
        });
        console.log(data.allitems[type]);
        data.totals[type] = sum;
    }
    data = {
        allitems: {
            exp: [],
            inc: []
        },
        totals : {
            exp: 0,
            inc: 0
        },
        budget:0,
        percentage: -1
    }
    return {
        addItem: function(type,desc,val){
            var newItem,ID
            if(data.allitems[type].length === 0){
                ID = 0;
            } else{
                ID = data.allitems[type][data.allitems[type].length-1].id +1 ;
            }


            if(type==='inc'){
                newItem = new Income(ID,desc,val);
            }
            if(type==='exp'){
                newItem = new Expense(ID,desc,val);
            }
            data.allitems[type].push(newItem);
            return newItem;
        },
        testing: function(){
            console.log(data);
        },
        calculateBudget: function(){
            calculatetotals('inc');
            calculatetotals('exp');
            data.budget= data.totals.inc - data.totals.exp;
            if(data.total.inc>0){
            data.percentage = Math.round(data.totals.exp/data.totals.inc*100);
            }
            return {
                totalinc:data.totals.inc,
                totalexp:data.totals.exp,
                budget:data.budget,
                percentage:data.percentage
            }

        }
    }
})();
// Controller
var controller = (function(UICtrl,budgetCtrl){
    setupEventListeners = function() {
        var DOM = UICtrl.getDomStrings();
        document.querySelector(DOM.inputbtn).addEventListener('click', ctrlAddItem);
        document.addEventListener('keypress',function(e){
        if(e.keyCode === 13 || e.which === 13){
            ctrlAddItem();
        }
    });
    }
    var updateBudget = function(){
        var calcbudget = budgetCtrl.calculateBudget();
        UICtrl.displayBudget(calcbudget);
    }
    var ctrlAddItem = function(){
        var input,newItem;
        input =UICtrl.getInput();
        if(input.description !== "" && !isNaN(input.value) && input.value > 0){
        newItem = budgetCtrl.addItem(input.type,input.description,parseInt(input.value));
        budgetCtrl.testing();
        UICtrl.addItemToList(newItem,input.type);
        UICtrl.clearFields();
        updateBudget();
        
        }
    }
    return{
        init: function() {
            setupEventListeners();
            UICtrl.displayBudget({
                
                totalinc:0,
                totalexp:0,
                budget:0,
                percentage:0
            });
        }
    }
    
})(UIController,budgetController);
controller.init();