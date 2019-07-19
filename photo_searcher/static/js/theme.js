//ロード時の処理
$(window).on('load', function() {

    if(localStorage.getItem('theme') == 'dark') {
        localStorage.setItem('theme', 'dark');
        // $('body').css({
        //     background: 'rgb(25, 25, 25)'
        // });
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
        // $('body').css({
        //     background: 'rgb(250, 250, 250)'
        // });
        $('#curtain').css({
            background: 'rgb(250, 250, 250)'
        });
        $('body').removeClass('dark');
        $('body').addClass('light');
        $('#toggle-menu ul li:nth-child(1) div.icon span.material-icons').html('brightness_3');
        $('#toggle-menu ul li:nth-child(1) div.icon span.material-icons').css('background', '#0d47a1');
        $('#toggle-menu ul li:nth-child(1) div.menu-text p').html('ダークテーマ');
    }
    
    //ふわっと表示する
    $('#curtain').animate({
        opacity: '0.0'
    }, 500);
    setTimeout(function() {
        $('#curtain').css({
            display: 'none'
        })
    }, 500)
})

//ライトテーマとダークテーマの切り替え
function toggle_light() {
    if(localStorage.getItem('theme') == 'dark') {
        localStorage.setItem('theme', 'light');
        $('body').removeClass('dark');
        $('body').addClass('light');
        $('#toggle-menu ul li:nth-child(1) div.icon span.material-icons').html('brightness_3');
        $('#toggle-menu ul li:nth-child(1) div.icon span.material-icons').css('background', '#0d47a1');
        $('#toggle-menu ul li:nth-child(1) div.menu-text p').html('ダークテーマ');
    }else{
        localStorage.setItem('theme', 'dark');
        $('body').removeClass('light');
        $('body').addClass('dark');
        $('#toggle-menu ul li:nth-child(1) div.icon span.material-icons').html('wb_sunny');
        $('#toggle-menu ul li:nth-child(1) div.icon span.material-icons').css('background', '#ff8f00');
        $('#toggle-menu ul li:nth-child(1) div.menu-text p').html('ライトテーマ');
    }
}

//サイドメニューについて
function toggle() {
    if($('#toggle-menu').hasClass('toggle-hide')) {
        //表示
        $('#toggle-menu').animate({
            right: '0'
        }, {
            duration: 200,
            queue: false
        })
        $('.cover').animate({
            opacity: 1.0
        }, {
            duration: 200,
            queue: false
        })
        $('.cover').css({
            display: 'block'
        })
        $('#toggle-menu').removeClass('toggle-hide')
        $('#toggle-menu').addClass('toggle-show')
    }else{
        //非表示
        $('#toggle-menu').animate({
            right: '-300px'
        }, {
            duration: 200,
            queue: false
        })
        $('.cover').animate({
            opacity: 0.0
        }, {
            duration: 200,
            queue: false
        })
        $('.cover').css({
            display: 'none'
        })
        $('#toggle-menu').removeClass('toggle-show')
        $('#toggle-menu').addClass('toggle-hide')
    }
}

//表示数(横)を増やす
function incrementDisplay() {

    //画面幅に応じてbootstrapのクラス名を指定
    let template = (function() {
        if($(window).width() >= 768) {
            return 'col-md-';
        }else if($(window).width() >= 544) {
            return 'col-sm-';
        }else{
            return 'col-xs-';
        }
    })();
    $('.wrapper .result .row .pane').each(function() {
        let dom = $(this); //下のfunctionの中における$(this)はウィンドウを指すのでここのスコープで変数に代入しておく
        $(this).attr('class').split(' ').forEach(function(target) {
            if(target.indexOf(template) === 0) {
                //要素名を取得
                let el = $(target)['selector'];
                let num = Number(el.replace(/[^0-9]/g, '')); //1絡むの幅
                //新しい幅を決定
                let newWidth = (function() {
                    switch(num) {
                        case 1:
                            return 1;
                        case 2:
                            return 1;
                        case 3:
                            return 2;
                        case 4:
                            return 3;
                        case 6:
                            return 4;
                        case 12:
                            return 6;
                        default:
                            return 6;
                    }
                })();
                dom.removeClass(el);
                dom.addClass(template + newWidth);
            }
        });
    })
    $('.wrapper .result .row .pane').height($('.wrapper .result .row .pane').width());
}

//表示数(横)を減らす
function decrementDisplay() {
    //画面幅に応じてbootstrapのクラス名を指定
    let template = (function() {
        if($(window).width() >= 768) {
            return 'col-md-';
        }else if($(window).width() >= 544) {
            return 'col-sm-';
        }else{
            return 'col-xs-';
        }
    })();
    $('.wrapper .result .row .pane').each(function() {
        let dom = $(this); //下のfunctionの中における$(this)はウィンドウを指すのでここのスコープで変数に代入しておく
        $(this).attr('class').split(' ').forEach(function(target) {
            if(target.indexOf(template) === 0) {
                //要素名を取得
                let el = $(target)['selector'];
                let num = Number(el.replace(/[^0-9]/g, '')); //1絡むの幅
                //新しい幅を決定
                let newWidth = (function() {
                    switch(num) {
                        case 1:
                            return 2;
                        case 2:
                            return 3;
                        case 3:
                            return 4;
                        case 4:
                            return 6;
                        case 6:
                            return 12;
                        case 12:
                            return 12;
                        default:
                            return 6;
                    }
                })();
                dom.removeClass(el);
                dom.addClass(template + newWidth);
            }
        });
    })
   $('.wrapper .result .row .pane').height($('.wrapper .result .row .pane').width());
}
