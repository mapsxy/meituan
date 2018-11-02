var myswiper = new Swiper('.banner', {
    loop: true,
    pagination: {
        el: '.pagination',
        clickable: true
    }
});

var xr = document.querySelector('.xr');

function xrs() {
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
}
xrs();


var scrolls = new BScroll('section', {
    click: true,
    probeType: 2
});
var up = document.querySelector('.pullUp');
var down = document.querySelector('.pullDown');

scrolls.on('scroll', function() {
    if (this.y < this.maxScrollY - 50) {
        up.innerHTML = '释放加载更多';
        up.classList.add('find');
    } else if (this.y < this.maxScrollY - 30) {
        up.innerHTML = '上拉加载';
        up.classList.remove('find');
    } else if (this.y > 50) {
        down.innerHTML = '释放刷新';
        down.classList.add('find');
    } else if (this.y > 30) {
        down.innerHTML = '下拉刷新';
        down.classList.remove('find');
    }
});


scrolls.on('scrollEnd', function() {
    console.log(up.className);
    if (up.className == 'pullUp find') {
        pullup();
        up.innerHTML = '上拉加载';
        up.classList.remove('find');
        scrolls.refresh();
    } else if (down.className == 'pullDown find') {
        pulldown();
        up.innerHTML = '下拉刷新';
        up.classList.remove('find');
        scrolls.refresh();
    }
});

function pullup() {
    var html = "";
    for (var i = 0; i < 3; i++) {
        html = `<div class="every">
                <div class="pict"><img src="./img/5.png" alt=""></div>
                <div class="right">
                    <div class="top">
                        <h3>全聚德${i}</h3>
                        <span>【东城区】精品烤鸭3-4人餐1份</span>
                    </div>
                    <div class="bottom">
                        <b>39${i}元</b>
                        <h5>门市价:498元</h5>
                    </div>
                </div>
            </div>`;
        xr.innerHTML += html;
    }
}

function pulldown() {
    xrs();
}


var list1 = document.querySelector('#list1');
var list2 = document.querySelector('#list2');
ajax({
    url: '/api/banner',
    dataType: 'json',
    success: function(data) {
        var str1 = '';
        var str2 = '';
        if (data.code == 1) {
            data.data[0].list2.forEach(function(item) {
                console.log(item);
                str2 += `<div class="logo">
                        <img src="img/${item.img}" alt="">
                        <span>${item.tit}</span>
                    </div>`;
            });
            list2.innerHTML = str2;
            data.data[0].list1.forEach(function(item) {

                str1 += `<div class="logo">
                        <img src="img/${item.img}" alt="">
                        <span>${item.tit}</span>
                    </div>`;
            });
            list1.innerHTML = str1;

        }
    }
})