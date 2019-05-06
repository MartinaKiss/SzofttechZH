var Model = (function(){
    var storage = null;

    function Init(){
        if(storage === null){
            storage = window.localStorage.getItem('model');

            if(!storage){
                storage = [];
                Sync();
            } else {
                storage = JSON.parse(storage);
            }
        }
    }

    function Sync(){
        window.localStorage.setItem('model', JSON.stringify(storage));
    }

    Init();

    var self={
        AddNew: function(code, sex, age, rating){
            Init();
            storage.push({
                code: code,
                sex: sex,
                age: age,
                rating: rating
            });
            Sync();
        },
        Remove: function(index){
            Init();
            if(index<storage.lenght)
            {
                storage.splice(index,1);
            }
            Sync();
        },
        GetAll: function(){
            Init();
            return storage;
        },

        GetAvgRatingBySex : function () {
            Init();
            var n = 0;
            var sum = 0;
            var avr = 0;
            for(var i=0; i<storage.length; i++ ){
                if (storage[i].sex == "female"){
                    n++;
                    sum = sum + storage[i].rating;
                }
                avr = sum / n;
            }
            return avr;
        },

        GetAvgRatingByAge : function () {
            Init();
            var n1 = 0;
            var sum1 = 0;
            var avr1 = 0;
            for(var i=0; i<storage.length; i++ ){
                if (storage[i].sex == "female"){
                    n++;
                    sum = sum + storage[i].rating;
                }
                avr = sum / n;
            }
            return avr;
        }
    };

    return self;

})();
