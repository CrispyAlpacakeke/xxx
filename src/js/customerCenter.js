import './header-footer.js'
import '../less/header-footer.less'
import '../less/normalized.less'
import '../less/customerCenter.less'
import 'distpicker/dist/distpicker'

$('.menu-box .item').click(function(){
    $('.menu-box .item').each(function(){
        $(this).removeClass('item-this')
    })
    $(this).addClass('item-this')
    //显示对应的main-box,隐藏其他main-box
    $('.main-box').each(function(){
        $(this).addClass('hide')
    })
    $(`#${$(this)[0].dataset.id}`).removeClass('hide')
    //设置hash值为当前id
    location.hash = `#${$(this)[0].dataset.id}`;
})
/**获取页面hash值，显示对应div**/ 
function showCurDiv(){
    $('.menu-box .item').each(function(){
        $(this)[0].dataset.id === location.hash.replace(/#/g,'') ? $(this).addClass('item-this'):$(this).removeClass('item-this')
    })
    $('.main-box').each(function(){
        $(this).addClass('hide')
    })
    $(`${location.hash}`).removeClass('hide')    
}
showCurDiv();
//页面hash值改变时，显示hash值对应的页面
window.onhashchange=()=>{
    showCurDiv();
}

/**个人信息**/
//tab切换
$('.filter-list li').click(function(){
    $('.user-panel').addClass('hide')
    $('.user-panel')[$(this).index()].classList.remove('hide')
})
$('.filter-list .txt').click(function(){
    if(!$(this)[0].classList.contains('txt-this')){
       $(this).toggleClass('txt-this').parent().siblings().find('a').removeClass('txt-this') 
    }
})

//基本信息
//->兴趣爱好选中状态
$('.interest-item').click(function(){
    $(this).toggleClass('item-this')
})

//头像照片
function imgPreview(fileDom) {
    // 判断是否支持FileReader 
    let reader = null;
    if(window.FileReader) {
        reader = new FileReader();
    } else {
        alert("您的设备不支持图片预览功能，如需该功能请升级您的设备！");
        return;
    }
    // 获取选中的文件
    let file = fileDom.files[0];
    // 判断是否是图片类型
    let imageType = /^image\//;
    console.log(file.type)
    if(!imageType.test(file.type)) {
        alert("请选择图片！");
        return;
    }
    // 读取完成
    //监听图片是否读取完成
    reader.onload = function(e) {
        // 图片路径设置为读取的图片
        // img.src = e.target.result;
        let box = document.querySelector(".img-cont");
        // 回显图片
        console.log(e.target.result)
        box.style.backgroundImage = `url(${e.target.result})`;
    }
    // 读取图片 => 将图片转换成base64
    //图片、视频以二进制流形式上传（文本以json或者xml形式）
    reader.readAsDataURL(file);
}

function uploadImage() {
    let file = document.querySelector(".select input").files[0];
    if(!file) {
        alert("点击上方方框选择图片！");
        return;
    }
    let formData = new FormData();
    formData.append("photo", file);
    // ajax
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8800/up_image", true);
    xhr.send(formData);
    xhr.onload = function(res) {
        console.log(res);
    }
}

$('.checkbox-inner').click(function(){
    $(this).parent().toggleClass('checked')
})