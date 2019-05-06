var Controller = (function(){
    function RecordList(){
        var list = Model.GetAll();

        if(list.length > 0){
            View.List(list, function(x){Model.Remove(x); RecordList();});
        } else {
            View.EmptyState(AddNew);
        }
    };

    function AddNew(){
        View.AddForm(function(data){
            Model.AddNew(data.recordCode, data.recordSex, data.recordAge, data.recordRating);
        });
    };

    var self = {
        Run: function(){

            View.Clear();
            RecordList();

            document.querySelector('#add').onclick = function(e){
                e.preventDefault();
                AddNew();
            };
            document.querySelector("#list").onclick = function(e){
                e.preventDefault();
                RecordList();
            };
        }
    };

    return self;

})();