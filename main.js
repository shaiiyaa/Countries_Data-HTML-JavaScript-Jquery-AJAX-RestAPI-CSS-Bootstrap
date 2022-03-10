$(function () {

    $("#displayAllBtn").on("click", function () { //all button
        event.preventDefault(); //prevent refresh before display
        dataSearch("all"); //display all countries
    });
    
    
    $("#displaySearchBtn").on("click", function () { //search button
        event.preventDefault(); //prevent refresh before display
        const searchVal = $("#searchBox").val();
        dataSearch(`name/${searchVal}`); //display country from search input
    });

    
    async function dataSearch(urlEnd) { //request function
        try {
            $(".results").remove(); //clear the page from previus data
            $("table").css("display", "none");// hide table befor the ui slide effect
            
            const countries = await getDataAsync(`https://restcountries.com/v2/${urlEnd}`); // end of url is variable fron the event listeners 
            for (const singleCountry of countries) { // loop to extract data by object names
                $("table").append(`<tr class="results">
                <td>${!singleCountry.name ? "..." : singleCountry.name}</td>
                <td>${!singleCountry.topLevelDomain ? "..." : singleCountry.topLevelDomain}</td>
                <td>${!singleCountry.capital ? "..." : singleCountry.capital}</td>
                <td>${!singleCountry.currencies ? "..." : singleCountry.currencies[0].code +', '+ singleCountry.currencies[0].name +', '+ singleCountry.currencies[0].symbol}, 
      
                </td>
                <td>${!singleCountry.borders ? "..." : singleCountry.borders}</td>
                <td><img src="${!singleCountry.flag ? "..." : singleCountry.flag}"></td>
                </tr>`);
            }
            $("table").show("slide", 1000); //table slide effect
        }
        catch (err) { // error message
            alert("Error: " + err.status);
        }
    }
   

    function getDataAsync(url) { // promise function get specific country url as an argument 
        return new Promise((resolve, reject) => {
            $.ajax({
                url: url,// url from argument
                success: data => resolve(data), // data for table
                reject: err => reject(err) // error message
            });
        });
    }

});
