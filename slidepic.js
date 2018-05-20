var log = console.log.bind(console)

var e = function(selector) {
    var element = document.querySelector(selector)
    if (element == null) {
        var s = `元素没找到，选择器 ${selector} 没有找到或者 js 没有放在 body 里`
        alert(s)
    } else {
        return element
    }
}

var es = function(selector) {
    var elements = document.querySelectorAll(selector)
    if (elements.length == 0) {
        var s = `元素没找到，选择器 ${selector} 没有找到或者 js 没有放在 body 里`
        alert(s)
    } else {
        return elements
    }
}

var removeClassAll = function(className) {
    var selector = '.' + className
    var elements = es(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        log('classname', className, e)
        e.classList.remove(className)
    }
}

var nextImg = (slidediv, offset) => {
    var currentPic = slidediv.dataset.img
    var picNum = 5
    var nextindex = (Number(currentPic) + Number(offset) + picNum) % picNum
    log(nextindex+'nextImg')
    return nextindex
}
var showImageAtIndex = (slidediv, index) => {
    removeClassAll('active')
    var nextId  = '#id-image-' + index
    var nextimg = e(nextId)
    nextimg.classList.add('active')
    slidediv.dataset.img = index
}

var actionClickBt = (event) => {
    //点击按钮切换上一张或下一张
    var self = event.target
    var offset = self.dataset.offset
    var slidediv = self.closest('.slide-div')
    var nextpic = nextImg(slidediv, offset)
    showImageAtIndex(slidediv, nextpic)

    //切换图片时，小圆点状态随之改变
    removeClassAll('white')
    var indiId = '#id-indi-' + nextpic
    var indi = e(indiId)
    indi.classList.add('white')
}

var actionMouseIndi = (event) => {
    var self = event.target
    var index = self.dataset.index
    removeClassAll('white')
    self.classList.toggle('white')
    var slidediv = self.closest('.slide-div')
    showImageAtIndex(slidediv, index)

}

var actionShowBt = () => {
    var bt = e(".btDiv")
    bt.style.display = 'block'
}
var actionHideBt = () => {
    var bt = e(".btDiv")
    bt.style.display = 'none'
}

var bindEventClick = () => {
    var slidediv = e('.slide-div')
    slidediv.addEventListener('click', (event) => {
        var self = event.target
        if (self.classList.contains('slide-button')) {
        actionClickBt(event)
        }
    })
}
var bindEventMouse = function() {
    log('start')
    var slidediv = e('.slide-div')
    slidediv.addEventListener('mouseover', (event) => {
        var self = event.target
        if (self.classList.contains('slide-indi')) {
            actionMouseIndi(event)
        }

    })
}

var bindEventBt = () => {
    var slidediv = e('.slide-div')
    slidediv.addEventListener('mouseover', (event) => {
            actionShowBt()
    })
    slidediv.addEventListener('mouseout', () => {
        actionHideBt()
    })
}

//自动播放nextPic
var playNectPic = () => {
    var slide = e('.slide-div')
    var nextIndex = nextImg(slide, 1)
    showImageAtIndex(slide, nextIndex)
}
var autoPlay = () => {
    var interval = 2000
    setInterval(() => {
        playNectPic()
    }, interval)
}


var __main = () =>{
    bindEventClick()
    bindEventMouse()
    bindEventBt()
    autoPlay()
}
__main()
