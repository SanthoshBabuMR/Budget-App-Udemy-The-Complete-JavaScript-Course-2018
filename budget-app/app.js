// BUDGET CONTROLLER

var budgetController = (function () {

  var Expense = function ( id, description, value ) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  };

  Expense.prototype.calcPercentage = function ( totalIncome  ) {
    if ( totalIncome > 0 ) {
      this.percentage = Math.round( (this.value / totalIncome) * 100 );
    } else {
      this.percentage = -1;
    }
  };

  Expense.prototype.getPercentage = function () {
    return this.percentage;
  }

  var Income = function ( id, description, value ) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var calculateTotal = function ( type ) {
    var sum = 0;
    data.allItems[ type ].forEach(function ( item ) {
      sum += item.value;
    });
    data.totals[ type ] = sum;
  };

  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    },
    budget: 0,
    percentage: -1
  };

  return {
    getNextID: function ( type ) {
      var nextID = 0;
      var items = data.allItems[ type ];
      var lastItemIndex = items.length - 1;
      var lastItem = items[ lastItemIndex ];
      if ( lastItem && lastItem.id !== undefined ) {
        nextID = lastItem.id + 1
      };
      return nextID;
    },

    addItem: function ( type, des, val ) {
      var newItem, ID = this.getNextID( type );
      
      // Create new item based on 'inc' or 'exp' type
      if ( type === 'exp' ) {
        newItem = new Expense( ID, des, val );
      } else if ( type === 'inc' ) {
        newItem = new Income( ID, des, val );
      }

      // Push it into our data structure
      data.allItems[ type ].push( newItem );

      // Return the new element
      return newItem;
    },

    deleteItem: function ( type, id ) {

      var ids, index;
      
      ids = data.allItems[type].map(function ( item ) {
        return item.id;
      });

      index = ids.indexOf( id );

      if ( index !== -1 ){
        data.allItems[type].splice( index, 1 );
      }

    },

    calculateBudget: function () {

      // calculate total income and expenses
      calculateTotal('exp');
      calculateTotal('inc');

      // calculate budget: income - expenses
      data.budget = data.totals.inc - data.totals.exp;

      // calculate the percentage of income that we spent
      if ( data.totals.inc > 0 ) {
        data.percentage = Math.round( ( data.totals.exp / data.totals.inc ) * 100 );
      } else {
        data.percentage = -1;
      }
    },

    calculatePercentages: function () {
      /*
        a = 20 - 20%
        b = 10 - 10%
        c = 40 - 40%
        inc = 100 
      */

      data.allItems.exp.forEach(function ( expense ) {
        expense.calcPercentage( data.totals.inc );
      });
    },

    getBudget: function () {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage
      }
    },

    getPercentages: function () {
      return data.allItems.exp.map(function ( expense ) {
          return expense.getPercentage();
      });
    },

    testing: function () {
      console.log( data );
    }

  };

})();

// UI CONTROLLER
var UIController = (function () {
  var DOMStrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expenseContainer: '.expenses__list',
    budgetLabel: '.budget__value',
    incomeLabel: '.budget__income--value',
    expenseLabel: '.budget__expenses--value',
    percentageLabel: '.budget__expenses--percentage',
    container: '.container',
    expensesPercLabel: '.item__percentage',
    dateLabel: '.budget__title--month'
  };

  var formatNumber = function ( num, type ) {
    /*
      + or - before number
      exactly 2 decimal points
      comma separating the thousands

      2310.4567 -> +2,310.46
      2000      -> +2,000.00
    */
    var numSplit, int, dec; 
    var sign = {
      'exp': '- ',
      'inc': '+ '
    };
    num = Math.abs( num );
    num = num.toFixed( 2 );

    numSplit = num.split('.');

    int = numSplit[0];
    dec = numSplit[1];

    if ( int.length > 3 ) {
      num = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3);
    } else {
      num = int;
    }

    num = sign[ type ] + num + '.' + dec;
    return num;
  };

  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMStrings.inputType).value,
        description: document.querySelector(DOMStrings.inputDescription).value,
        value: window.parseFloat( document.querySelector(DOMStrings.inputValue).value, 10 )
      }
    },

    deleteListItem: function ( selectorId ) {
      document.querySelector( selectorId ).remove();
    },

    clearFields: function () {
      var fields = document.querySelectorAll( DOMStrings.inputDescription + ', ' + DOMStrings.inputValue );
      var fieldsArr;

      fieldsArr = Array.prototype.slice.call( fields );
      fieldsArr.forEach(function ( field, index, arr ) {
        field.value = "";
      });
      fieldsArr[0].focus();
    },

    addListItem: function ( obj, type ) {
      var html, newHtml, element;

      // Create HTML string with placeholder text
      if ( type === 'inc' ) {
        element = DOMStrings.incomeContainer;
        html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
      } else if ( type === 'exp' ) {
        element = DOMStrings.expenseContainer;
        html = '<div class="item clearfix" id="exp-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
      }

      // Replace placeholder text with some actual data
      newHtml = html.replace('%id%', obj.id)
                  .replace('%description%', obj.description)
                  .replace('%value%', formatNumber( obj.value, type ) );

      // Insert the HTML into the DOM
      document.querySelector(element)
        .insertAdjacentHTML('afterbegin', newHtml);
    },

    getItemId: function ( ele ) {
      return ele.parentNode.parentNode.parentNode.parentNode.id;
    },


    displayBudget: function ( obj ) {
      var type = obj.budget > 0 ? 'inc' : 'exp';
      document.querySelector( DOMStrings.budgetLabel ).textContent = formatNumber( obj.budget, type);
      document.querySelector( DOMStrings.incomeLabel ).textContent = formatNumber( obj.totalInc, 'inc' );
      document.querySelector( DOMStrings.expenseLabel ).textContent = formatNumber( obj.totalExp, 'exp' );
      if ( obj.percentage > 0 ) {
        document.querySelector( DOMStrings.percentageLabel ).textContent = obj.percentage + '%';
      } else {
        document.querySelector( DOMStrings.percentageLabel ).textContent = '---';
      }
    },

    displayPercentages: function ( percentages ) {
      var expensesPercLabel = document.querySelectorAll( DOMStrings.expensesPercLabel );
      percentages.reverse().forEach( function ( percentage, index ) {
        if ( percentage > 0 ) {
          expensesPercLabel[ index ].textContent = percentage + '%';  
        } else {
          expensesPercLabel[ index ].textContent = '---';  
        }
        
      });
    },

    displayMonth: function () {
      var now, year, month, months;
      now = new Date();

      months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      month = now.getMonth();
      year = now.getFullYear();
      document.querySelector( DOMStrings.dateLabel ).textContent = months[month] + ' ' + year;

    },

    changedType: function () {
      var inputs = document.querySelectorAll( DOMStrings.inputType + ', ' + DOMStrings.inputDescription + ', ' + DOMStrings.inputValue );
      var btn = document.querySelector( DOMStrings.inputBtn );
      for ( var i = 0; i < inputs.length; i++ ) {
        inputs[i].classList.toggle('red-focus');  
      }
      btn.classList.toggle('red');
    },

    getDOMStrings: function () {
      return DOMStrings;
    }
  };
  
})();

// GLOBAL APP CONTROLLER
var controller = (function ( budgetCtrl, UICtrl ) {

  var setupEventListeners = function () {
    var DOM = UICtrl.getDOMStrings();

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function ( event ) {
      if ( event.keyCode === 13 || event.which === 13 ) {
        ctrlAddItem();
      }
    });

    document.querySelector( DOM.container ).addEventListener( 'click', ctrlDeleteItem );

    document.querySelector( DOM.inputType ).addEventListener( 'change', UICtrl.changedType );
  };

  var updateBudget = function () {

    // 1. Calculate the budget
    budgetController.calculateBudget();

    // 2. return the budget
    var budget = budgetController.getBudget();

    // 3. Display the budget on the UI
    UICtrl.displayBudget( budget );

  };

  var updatePercentages = function () {

    var percentages;

    // 1. Compute the percentage for expense over income
    budgetController.calculatePercentages();

    // 2. Read percentages from the budget controller
    percentages = budgetController.getPercentages()

    // 3. Update the user interface with the new percentages
    UICtrl.displayPercentages( percentages );

  };
  
  var ctrlAddItem = function () {

    var input, newItem;

    // 1. get the field input data
    input = UICtrl.getInput();

    if ( input.description !== "" && !isNaN(input.value) && input.value > 0 ) {
      // 2. Add the item to the budget controller
      newItem = budgetController.addItem( input.type, input.description, input.value );

      // 3. Add the item to the UI 
      UICtrl.addListItem( newItem, input.type );

      // 4. Clear the fields
      UICtrl.clearFields();

      // 5. Calculate and update budget
      updateBudget();

      // 6. Calculate and Update the expense percentage
      updatePercentages();
    }

  };

  var ctrlDeleteItem = function ( event ) {
    var itemId, splitId, type, ID;
    
    itemId = UICtrl.getItemId( event.target );
    

    if ( itemId ) {

      splitId = itemId.split( '-' );
      type = splitId[0];
      ID = window.parseInt( splitId[1], 10 );

      console.log( ID, type );

      // 1. delete item from the data structure
      budgetCtrl.deleteItem( type, ID );

      // 2. delete the item from the UI
      UICtrl.deleteListItem( '#' + itemId );

      // 3. Update and show the new budget
      updateBudget();

      // 4. Calculate and Update the expense percentage
      updatePercentages();
    }  
  };

  return {
    init: function () {
      console.log('Application has started.');
      UICtrl.displayMonth();
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1
      });
      setupEventListeners();
    }
  };

})( budgetController, UIController );

controller.init();

