$(window).on('load', function() {
    if(localStorage.getItem('theme') == 'dark') {
        localStorage.setItem('theme', 'dark');
        $('body').removeClass('light');
        $('body').addClass('dark');
    }else{
        localStorage.setItem('theme', 'light');
        $('body').removeClass('dark');
        $('body').addClass('light');
    }
})

function toggle_light() {
    if(localStorage.getItem('theme') == 'dark') {
        localStorage.setItem('theme', 'light');
        $('body').removeClass('dark');
        $('body').addClass('light');
    }else{
        localStorage.setItem('theme', 'dark');
        $('body').removeClass('light');
        $('body').addClass('dark');
    }
}