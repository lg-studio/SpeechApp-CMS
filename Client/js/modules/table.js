materialAdmin

    // =========================================================================
    // Bootgrid Data Table
    // =========================================================================

    //Basic
    .directive('bootgridBasic', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attr) {
                element.bootgrid({
                    css: {
                        icon: 'md icon',
                        iconColumns: 'md-view-module',
                        iconDown: 'md-expand-more',
                        iconRefresh: 'md-refresh',
                        iconUp: 'md-expand-less'
                    }
                });
            }
        }
    })

    //Selection
    .directive('bootgridSelection', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attr) {
                element.bootgrid({
                    ajax: true,
                    css: {
                        icon: 'md icon',
                        iconColumns: 'md-view-module',
                        iconDown: 'md-expand-more',
                        iconRefresh: 'md-refresh',
                        iconUp: 'md-expand-less'
                    },
                    rowCount :  [5, 10, 25, 50, -1],
                    url: attr.apiUrl,
                    selection: true,
                    multiSelect: true,
                    rowSelect: true,
                    keepSelection: true
                })
                .on("selected.rs.jquery.bootgrid", function (e, arr) {     
                    scope.$emit('ITEM_SELECTED', arr);              
                })
                .on("deselected.rs.jquery.bootgrid", function (e, arr) {
                    scope.$emit('ITEM_DESELECTED', arr);
                })
                .on("loaded.rs.jquery.bootgrid", function(){
                    scope.$emit('TABLE_LOADED', element);
                });
                
            }
        }
    })

    //Command
    .directive('bootgridCommand', function($compile) {
        return {
            restrict: 'A',
            link: function(scope, element, attr) {
                element.bootgrid({
                    ajax: true,
                    css: {
                        icon: 'md icon',
                        iconColumns: 'md-view-module',
                        iconDown: 'md-expand-more',
                        iconRefresh: 'md-refresh',
                        iconUp: 'md-expand-less'
                    },
                    rowCount :  [5, 10, 25, 50, -1],
                    url: attr.apiUrl,
                    formatters: {
                        "commands": function(column, row) {
                            var params = { id : row._id };
                            var uiSref = attr.attrState + "(" + JSON.stringify(params) + ")";
                            return "<button type=\"button\" class=\"btn-icon  command-edit\" ui-sref='" + uiSref + "' data-row-id=\"" + row._id + "\"><span class=\"md md-edit\"></span></button>";
                        }
                    }
                }).on("loaded.rs.jquery.bootgrid", function(){
                    scope.$emit('TABLE_LOADED', element);
                    element.find(".command-edit").each(function(index, e){
                        var html = e.outerHTML;
                        $(e).replaceWith($compile(html)(scope));
                    });
                });
            }
        }
    })