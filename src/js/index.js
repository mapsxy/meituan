var myswiper = new Swiper('.banner', {
    loop: true,
    pagination: {
        el: '.pagination',
        clickable: true
    }
});

var xr = document.querySelector('.xr');
ajax({
    url: '/api/list',
    dataType: 'json',
    success: function(data) {
        var str = '';
        if (data.code == 1) {
            data.data.forEach(function(item) {
                str += `<div class="every">
                            <div class="pict"><img src="img/${item.img}" alt=""></div>
                            <div class="right">
                                <div class="top">
                                    <h3>${item.name}</h3>
                                    <span>${item.add}</span>
                                </div>
                                <div class="bottom">
                                    <b>${item.price}</b>
                                    <h5>门市价:498元</h5>
                                </div>
                            </div>
                        </div>`;
            });
            xr.innerHTML = str;
        }

    }
})