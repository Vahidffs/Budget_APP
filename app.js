// View
var UIController = (function(){
    var DOMStrings = {
        inputType:'.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputbtn:'.add__btn'
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
        }
    }
})();
// Model
var budgetController = (function(){

})();
// Controller
var controller = (function(UICtrl,budgetCtrl){
    setupEvenListeners = function() {
        var DOM = UICtrl.getDomStrings();
        document.querySelector(DOM.inputbtn).addEventListener('click', ctrlAddItem);
    document.addEventListener('keypress',function(e){
        if(e.keyCode === 13 || e.which === 13){
            ctrlAddItem();
        }
    });
    }
    
    var ctrlAddItem = function(){
        var input =UICtrl.getInput();
        console.log(input);
    }
    return{
        init: function() {
            setupEvenListeners();
        }
    }
    
})(UIController,budgetController);
controller.init();