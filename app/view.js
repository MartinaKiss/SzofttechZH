var View = (function()
{
    function Update(html){
        document.querySelector('main > div').innerHTML = html;
    }

    var self={
        Clear: function(){
            Update('');
        },

        EmptyState: function(interaction){
            Update('<section class="empty"><h2>No ratings yet</h2><p>No ratings have been added yet.</p><p>Add the first rating!</p><i class="fas fa-plus-circle"></i></section>');
            document.querySelector('section.empty').onclick = interaction;
        },

        AddForm: function(submit){
            Update(`<form>
				
					<label for="recordCode">Code</label>
					<input type="text" id="recordCode" required>
				
					<label for="recordSex">Sex (type "female" or "male")</label>
					<input type="text" id="recordSex"><br>
					
					<label for="recordAge">Age</label>
					<input type="text" id="recordAge" required>
				
					<label for="recordRating">Rating (1-10)</label>
					<input type="text" id="recordRating" required>
					
					<button> <i class="fas fa-check"></i> Submit</button>
					
				</form>`);

            document.querySelector('form button').onclick = function(e){
                e.preventDefault();

                var data = {
                    recordCode: document.querySelector('#recordCode').value,
                    recordSex: document.querySelector('#recordSex').value,
                    recordAge: document.querySelector('#recordAge').value,
                    recordRating: document.querySelector('#recordRating').value,
                };

                submit(data);
                document.querySelector("#list").click();
            };
        },
        List: function(model, interaction)
        {
            var html ='';
            let sumRatingMan = 0;
            let sumRatingWoman = 0;
            let sumAgeMan = 0;
            let sumAgeWoman = 0;
            let women = 0;
            let men = 0;
            for (var i in model){
                if (model[i].sex === 'female') {
                    sumRatingWoman += parseInt(model[i].rating);
                    sumAgeWoman += parseInt(model[i].age);
                    women++;
                } else {
                    sumRatingMan += parseInt(model[i].rating);
                    console.log(model[i].rating);
                    sumAgeMan += parseInt(model[i].age);
                    men++;
                    console.log(sumRatingMan);
                    console.log(men);
                }
            }
            sumRatingWoman = sumRatingWoman/women;
            sumRatingMan = sumRatingMan/men;
            sumAgeWoman = sumAgeWoman/women;
            sumAgeMan = sumAgeMan/men;

            html += ('<section><h2> Average rating of women: '+sumRatingWoman+'</h2><p> Average age of women: '+sumAgeWoman+'</p></section>');
            html += ('<section><h2> Average rating of men: '+sumRatingMan+'</h2><p> Average age of men: '+sumAgeMan+'</p></section>');
            html += ('<section><h2> Number of ratings: '+model.length+'</h2></section>');

            Update(html);

            var items = document.querySelectorAll('main section');
            for(var i=0; i<items.length;i++){
                items[i].onclick = RecordClick;
            }

            function RecordClick(){
                var x = parseInt(this.getAttribute('data-tx'));
                interaction(x);
            }

        }


    };

    return self;

})();
