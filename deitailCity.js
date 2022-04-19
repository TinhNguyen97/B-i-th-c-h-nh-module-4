let idCity= new URL(location.href).searchParams.get("id");

function deltailCity()
{
    $.ajax({
        type: 'GET',
        url:`http://localhost:8080/cities/${idCity}`,
        success: function (city)
        {
            let name=`Thành phố: ${city.name}`
            let country=`Quốc gia: ${city.country}`
            $('#name').html(name);
            $('#country').html(country);
        }
    })
}
deltailCity();