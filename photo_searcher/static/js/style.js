$.ajax({
    url: 'localhost:5000/static/python/theme.py',
    type: 'post',
    dataType: 'text',
    crossDomain: true,
    xhrFields: {
        withCredentials: true
        }
  })
  .done(function(response) {
    alert('通信成功')
    alert(response)
  })
  .fail(function(err) {
    alert('通信失敗')
    console.log(err)
  });


if(localStorage.getItem('theme') == 'dark') {
    localStorage.setItem('theme', 'dark');
    $('body').css({
        background: 'rgb(25, 25, 25)'
    });
    $('#curtain').css({
        background: 'rgb(25, 25, 25)'
    });
    $('body').removeClass('light');
    $('body').addClass('dark');
    $('#toggle-menu ul li:nth-child(1) div.icon span.material-icons').html('wb_sunny');
    $('#toggle-menu ul li:nth-child(1) div.icon span.material-icons').css('background', '#ff8f00');
    $('#toggle-menu ul li:nth-child(1) div.menu-text p').html('ライトテーマ');
}else{
    localStorage.setItem('theme', 'light');
    $('body').css({
        background: 'rgb(250, 250, 250)'
    });
    $('#curtain').css({
        background: 'rgb(250, 250, 250)'
    });
    $('body').removeClass('dark');
    $('body').addClass('light');
    $('#toggle-menu ul li:nth-child(1) div.icon span.material-icons').html('brightness_3');
    $('#toggle-menu ul li:nth-child(1) div.icon span.material-icons').css('background', '#0d47a1');
    $('#toggle-menu ul li:nth-child(1) div.menu-text p').html('ダークテーマ');
}