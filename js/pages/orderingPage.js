// Controls the behaviour of the ordering page
var length;
class orderingPage {
    constructor() {
        // Main data of the element
        var el = $(`
            <div class="ordering-page">
                <div class="content-pane">
                    <div style="width: 100%; display: flex; justify-content: space-between; flex-direction:column; align-items:center">
                        <div class="foodcard-wrap"></div>
                        <div class="detailedfoodcard-wrap"></div>
                    </div>
                </div>
            </div>
        `);
        
        //define other elements (titleBar, navBar, icons)
        
        // Append it to body and set the proper panorama image (none in this case)
        this.ref = el.appendTo($('body'));
        $('body').css('background-image', '');
        
        // Bind what this page should do on resize
        window.onResize = this.onResize.bind(this);

        // Add the navbar with all the options/account info
        var navbarOpts = [{
            'text' : 'Drinks',
            'selected' : true,
            'onClick' : this.onMenuSelectOption1.bind(this)
        }, 
        {
            'text' : 'Appetizers',
            'onClick' : this.onMenuSelectOption2.bind(this)
            },
        {
            'text' : 'Entrées',
            'onClick' : this.onMenuSelectOption3.bind(this)
            },
        {
            'text' : 'Desserts',
            'onClick' : this.onMenuSelectOption4.bind(this)
            }];

        this.navbar = new NavBar(this.ref, navbarOpts);
        
        this.titleBar = new TitleBar(this.ref.find('.content-pane'), 'Drinks', this.onSearchInputChange.bind(this));
         
                
        this.foodCards=[];
        //create all the food cards 
        var foodCardWrap = this.ref.find(".foodcard-wrap");
        
        var row = $(`<div class="food-card-row"></div>`);
        for (var i = 0; i < 9; i++) {
            if (i % 5 == 0 && i != 0) {
                foodCardWrap.append(row);
                row = $(`<div class="food-card-row"></div>`);
            }

            this.foodCards.push(new FoodCard(row, window.DB.menuItems[i]));
        }

        foodCardWrap.append(row);
        length=9;
        // Bind what this page should do on resize
        window.onResize = this.onResize.bind(this);
    }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //destructor
    // Removes the contents on the page and resets variables in the window
    destroy() {
        this.ref.remove();
        window.orderingPage = undefined;
        window.onResize = undefined;
    }
    //other methods to update the state 
    onBackSelect()
    {
        this.destroy();
        window.createSingleTablePage();
    }
    
    onSearchInputChange(searchText)
    {
        searchText=searchText.toUpperCase()
        switch(searchText)
        {
        case 'VEGETARIAN': break;
        case 'VEGAN': break;
        case 'GLUTEN FREE': break;
        case 'MEAT': break;
        case 'SOUP': break;
        case 'SUSPICIOUS': break;
        case 'LACTOSE FREE': break;
        }
    }

    /////////////////////////////
    onFoodCardSelect()
    {
    }

    onDetailedFoodCardDeselect()
    {
        this.detailedFoodCard=undefined;
    }
    
   
   onMenuSelectOption1()
    {
        this.titleBar.setText('Drinks'); 
        this.navbar.unselectAll();
        this.navbar.selectOption(1);
        
        for (var i = 0; i < length; i++)
            this.foodCards[i].ref.remove();
         
        this.foodCards=[];
        //create all the food cards 
        var foodCardWrap = this.ref.find(".foodcard-wrap");
        
        var row = $(`<div class="food-card-row"></div>`);
        for (var i = 0; i < 9; i++) {
            if (i % 5 == 0 && i != 0) {
                foodCardWrap.append(row);
                row = $(`<div class="food-card-row"></div>`);
            }

            this.foodCards.push(new FoodCard(row, window.DB.menuItems[i]));
        }

        foodCardWrap.append(row);  
        length=9;        
    }
    onMenuSelectOption2()
    {
        this.titleBar.setText('Appetizers');
        this.navbar.unselectAll();
        this.navbar.selectOption(2);
        
        for (var i = 0; i < length; i++)
            this.foodCards[i].ref.remove();
         
        this.foodCards=[];
        //create all the food cards 
        var foodCardWrap = this.ref.find(".foodcard-wrap");
        
        var row = $(`<div class="food-card-row"></div>`);
        for (var i = 9; i < 15; i++) {
            if (i % 5 == 0 && i != 0) {
                foodCardWrap.append(row);
                row = $(`<div class="food-card-row"></div>`);
            }

            this.foodCards.push(new FoodCard(row, window.DB.menuItems[i]));
        }

        foodCardWrap.append(row);  
        length=6;
    }

    onMenuSelectOption3()
    {
        this.titleBar.setText('Entrées');
        this.navbar.unselectAll();
        this.navbar.selectOption(3);
        
        for (var i = 0; i < length; i++)
            this.foodCards[i].ref.remove();
         
        this.foodCards=[];
        //create all the food cards 
        var foodCardWrap = this.ref.find(".foodcard-wrap");
        
        var row = $(`<div class="food-card-row"></div>`);
        for (var i = 15; i < 21; i++) {
            if (i % 5 == 0 && i != 0) {
                foodCardWrap.append(row);
                row = $(`<div class="food-card-row"></div>`);
            }

            this.foodCards.push(new FoodCard(row, window.DB.menuItems[i]));
        }

        foodCardWrap.append(row);  
        length=6;
    }
    onMenuSelectOption4()
    {
        this.titleBar.setText('Desserts');
        this.navbar.unselectAll();
        this.navbar.selectOption(4);
        
        for (var i = 0; i < length; i++)
            this.foodCards[i].ref.remove();
         
        this.foodCards=[];
        //create all the food cards 
        var foodCardWrap = this.ref.find(".foodcard-wrap");
        
        var row = $(`<div class="food-card-row"></div>`);
        for (var i = 21; i < 26; i++) {
            if (i % 5 == 0 && i != 0) {
                foodCardWrap.append(row);
                row = $(`<div class="food-card-row"></div>`);
            }

            this.foodCards.push(new FoodCard(row, window.DB.menuItems[i]));
        }

        foodCardWrap.append(row);  
        length=5;
    }
    
        // Dynamic sizes yeah
    onResize() {
        if (window.isLandscape()) {
            if (this.navbar.ref.is(':hidden')) {
                this.navbar.ref.show();
                this.ref.find('.content-pane').css('width', '80%');
            }
        } else {
            if (this.navbar.ref.is(':visible')) {
                this.navbar.ref.hide();
                this.ref.find('.content-pane').css('width', '100%');
            }
        }
    }
}     
