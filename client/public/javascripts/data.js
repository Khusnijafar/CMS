const API_URL = 'http://localhost:3001/api/data'
let tokenX = localStorage.getItem('token')

const addData = () => {
    
    let data = {
        letter: $('#addletter').val(),
        frequency: $('#addfrequency').val()
      }
      
    $.ajax({
        url: `${API_URL}/${dataId}?x_auth=${tokenX}`,
        method: 'POST',  
        data      
      })
      .done(function(){
        $('#addletter').val('');
        $('#addfrequency').val('');
        $('#rahasia').val('')
        $('#formAdd').hide()
        loadData();
      })
}

