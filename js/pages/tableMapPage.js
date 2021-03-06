// Controls the behaviour of the table map page
class TableMapPage {
    constructor() {
        // Main data of the element
        var el = $(`
            <div class="table-map-page">
                <div class="content-pane">
                    <div style="width: 100%; display: flex; justify-content: space-between; flex-direction:column; align-items:center">
                        <div class="tables-wrap"></div>
                    </div>
                </div>
            </div>
        `);

        // Append it to body and set the proper panorama image (none in this case)
        this.ref = el.appendTo($('body'));
        $('body').css('background-image', '');

        var navbarOpts = [{
            'text' : 'Table Map',
            'selected' : true,
        }];

        if (window.auth.role === 'manager') {
            navbarOpts.push({
                'text' : 'Accounts List',
                'onClick' : this.goToAccList.bind(this),
            });
        }

        // Add the navbar with all the options/account info
        this.navbar = new NavBar(this.ref, navbarOpts);

        this.tables = [];

        //for each table in the table database, create em
        for(var i = 0; i < window.DB.tables.length; i++)
        {
            this.tables.push(new TableSelector(this.ref.find(".tables-wrap"), this.onTableSelect.bind(this), window.DB.tables[i]));
        }

        // Add title
        this.titleBar = new TitleBar(this.ref.find('.content-pane'), 'Table Map');

        // Bind what this page should do on resize
        window.onResize = this.onResize.bind(this);
        this.onResize();
    }

    // Removes the contents on the page and resets variables in window
    destroy() {
        this.ref.remove();
        window.appPage = undefined;
        window.onResize = undefined;
    }

    // Dynamic sizes yeah
    onResize() {
        //navbar stuff
        if (window.isLandscape()) {
            this.navbar.ref.show();
            this.ref.find('.content-pane').css('width', '80%');
            this.titleBar.hideHamburger();
        } else {
            if (!this.titleBar.showSidebar)
                this.titleBar.hideSidebar();
            this.ref.find('.content-pane').css('width', '100%');
            this.titleBar.showHamburger();
        }

        //resize each table
        for(var i = 0; i < this.tables.length; i++)
        {
            this.tables[i].onResize();
        }
    }

    goToAccList() {
        this.destroy();
        window.createAccountsListPage();
    }

    clean(table)
    {
        $(this.ref.find('.clean-wrap')).remove();
        table.state = 'available';
        for(var i =0; i < this.tables.length; i++)
        {
            this.tables[i].checkClean();
        }
    }

    onTableSelect(table)
    {
        if(table.state === 'cleaning')
        {
            window.makePopup("Are you sure that the table has been sufficiently cleaned?", this.clean.bind(this, table));
            return;
        }
        this.destroy();
        //store which table we are at and go to the next page
        window.currTable = table;
         window.createSingleTablePage();
        // window.createPaymentPage();
    }
}

