function findAllCity() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/cities',
        success: function (cities) {
            let content = '';
            for (let i = 0; i < cities.length; i++) {
                content += ` <tr><td>${cities[i].id}</td>
    <td><a href="detailCity.html?id=${cities[i].id}">${cities[i].name}</a></td>
    <td>${cities[i].country}</td>
    <td><button data-bs-target="#edit-city" data-bs-toggle="modal" type="button" onclick="showEditCity(${cities[i].id})">Chỉnh sửa</td>
    <td><button data-bs-target="#delete-city" data-bs-toggle="modal" type="button" onclick="showDeleteCity(${cities[i].id})">Xóa</button></td>
    </tr>`
            }
            $('#listCity').html(content);
        }
    })
}

function showEditCity(id) {
    let content = `<button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onclick="editCity(${id})">Chỉnh sửa</button>
    <button type="button" className="btn btn-close" data-bs-dismiss="modal">Hủy</button>`
    $('#editCity').html(content);
}

function editCity(id) {
    let newName = $('#newName').val();
    let newCountry = $('#newCountry').val();
    let newCity = {
        name: newName,
        country: newCountry
    }

    $.ajax({
        type: 'PUT',
        url: `http://localhost:8080/cities/${id}`,
        data: JSON.stringify(newCity),
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
        },

        success: function () {
            findAllCity();
           showSuccessMessage("Cập nhật thành công")
        },

        error: function () {
            showErrorMessage("Cập nhật lỗi")
        }

    })
}


function showDeleteCity(id) {
    let content = `<button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onclick="deleteCity(${id})">Xóa</button>
    <button type="button" className="btn btn-close" data-bs-dismiss="modal">Hủy</button>`

    $('#deleteCity').html(content);
    // document.getElementById('deleteCity').innerHTML(content);
}


function deleteCity(id) {
    $.ajax({
        type: 'DELETE',
        url: `http://localhost:8080/cities/${id}`,
        success: function () {
            findAllCity();
          showSuccessMessage("Xóa thành công")
        },

        error: function () {
            showErrorMessage("Xóa lỗi")
        }
    })
}

function showCreateCity() {

    let content = `<button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onclick="createCity()">Thêm</button>
    <button type="button" className="btn btn-close" data-bs-dismiss="modal">Hủy</button>`
    $('#createCity').html(content);
}

function createCity() {
    let name = $('#name').val();
    let country = $('#country').val();
    let city = {
        name: name,
        country: country
    }

    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/cities',
        data: JSON.stringify(city),
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
        },
        success: function () {
            findAllCity();
            showSuccessMessage("Tạo thành công")

        },
        error: function () {
            showErrorMessage("Tạo lỗi")
        }
    })
}


$(document).ready(function () {
    findAllCity();
})
