
    // Get the #games element
    var games = document.getElementById('games');

    // Get all items inside .games-items section
    var items = games.querySelectorAll('.games-items .item');

    // Loop through each item found
    for (var i = 0; i < items.length; i++) {
        // Your existing logic to handle each item
        var item = items[i];
        var frame = item.getElementsByClassName('frame')[0];
        var frontBox = frame.getElementsByClassName('front')[0];
        var leftBox = frame.getElementsByClassName('left')[0];
        var rightBox = frame.getElementsByClassName('right')[0];
        // Setting background images
        frontBox.style.backgroundImage = 'url(../image/' + (i + 1).toString().padStart(2, '0') + '.jpg)';
        leftBox.style.backgroundImage = 'url(../image/' + (i + 1).toString().padStart(2, '0') + '.jpg)';
        rightBox.style.backgroundImage = 'url(../image/' + (i + 1).toString().padStart(2, '0') + '.jpg)';
    }

    // The rest of your existing code for slider functionality remains unchanged.
    // It will continue to work with the items targeted within #games > .games-items.
    // ...

    (function () {
        "use strict";
        var gamesShell = document.getElementById('games');
        if (!gamesShell) return; // Ensure the #games element exists
    
        var gamesItems = gamesShell.querySelector('.games-items');
        if (!gamesItems) return; // Ensure the .games-items element exists
    
        var slider = gamesItems.querySelector('.shell_slider');
        var items = gamesItems.getElementsByClassName('item');
        var prevBtn = gamesItems.querySelector('.prev');
        var nextBtn = gamesItems.querySelector('.next');
    
        // rest of the code remains unchanged
        // ...
        // 定义变量
        var width, height, totalWidth, margin = 20,
            currIndex = 0,
            interval, intervalTime = 3000;
        function init() {
            // 初始化函数
            resize();
            move(Math.floor(items.length / 2));
            bindEvents();
        }
        function resize() {
            // 窗口大小变化时调整大小
            width = Math.max(window.innerWidth * .20, 275);
            height = window.innerHeight * .5;
            totalWidth = width * items.length;
            // 设置slider宽度
            slider.style.width = totalWidth + "px";
            // 设置每个item的宽度和高度
            for (var i = 0; i < items.length; i++) {
                let item = items[i];
                item.style.width = (width - (margin * 2)) + "px";
                item.style.height = height + "px";
            }
        }
        function bindEvents() {
            // 窗口大小变化时调整大小
            window.onresize = resize;
            // 点击prev按钮切换item
            prevBtn.addEventListener('click', () => { prev(); });
            nextBtn.addEventListener('click', () => { next(); });
        }
        init();

        function move(index) {
            // 移动shell到指定的item
            if (index < 1) index = items.length;
            if (index > items.length) index = 1;
            currIndex = index;
            // 遍历所有item
            for (var i = 0; i < items.length; i++) {
                let item = items[i],
                    box = item.getElementsByClassName('frame')[0];
                if (i == (index - 1)) {
                    // 当前item添加active类并设置3D效果
                    item.classList.add('item--active');
                    box.style.transform = "perspective(1200px)";
                } else {
                    // 其他item移除active类并设置3D效果
                    item.classList.remove('item--active');
                    box.style.transform = "perspective(1200px) rotateY(" + (i < (index - 1) ? 40 : -40) + "deg)";
                }
            }
            // 移动slider
            slider.style.transform = "translate3d(" + ((index * -width) + (width / 2) + window.innerWidth / 2) + "px, 0, 0)";
            // 设置body背景图片
            var frontBox = items[index - 1].getElementsByClassName('front')[0];
            // Get the .shell element inside the #games id
            const shellElement = document.querySelector('#games .games-items .shell');

            // Change the background image of the .shell element
            if (shellElement) {
                const backgroundImage = frontBox.style.backgroundImage;

                // Create the combined background style

                const combinedBackground = `linear-gradient(to bottom, black 0%, rgba(0, 0, 0, 0) 50%, var(--bg-black-900) 100%), ${backgroundImage} no-repeat center center / cover`;

                shellElement.style.background = combinedBackground;
            }

        }
    
        // 切换item
        function prev() {
            move(--currIndex);

        }
        function next() {
            move(++currIndex);
        }
    })();