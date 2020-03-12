let uploadArea = document.getElementById('uploadArea');

let btnLeft = document.getElementById('btnLeft');
let btnRight = document.getElementById('btnRight');
let btnDownload = document.getElementById('btnDownload');

let selectOrietation = document.getElementById('selectOrietation');

let stopEvt = (evt) => {
    evt.stopPropagation();
    evt.preventDefault();            
}

let handleDragOver = (evt) => {
    stopEvt(evt);
    evt.dataTransfer.dropEffect = 'copy';
}

let handleSelectFiles = (evt) => {
    stopEvt(evt);
    
    let files = evt.dataTransfer.files;

    for(let i=0, f; f=files[i]; i++){
        if(!f.type.match('image.*')){
            continue;
        }

        let elemnetId = i;
        if(document.getElementsByClassName('thumb').length != 0){
            elemnetId = document.getElementsByClassName('thumb').length + i + 1;
        }

        let div = document.createElement('div');
        div.id = 'imgdiv-' + elemnetId;
        div.className = 'imgDiv';        
        div.innerHTML = ['<p class="loading"</p>']        
        document.getElementById('uploadArea').insertBefore(div, null);
        document.getElementById(div.id).addEventListener('selectImg',null);
        document.getElementById(div.id).setAttribute('onclick', 'selectImg("' + div.id + '")');

        let reader = new FileReader();
        reader.onload = ((evt) => {
            return(e) => {
                el = document.getElementById(div.id);
                el.innerHTML = "";
                el.style.border = "0px"
                el.style.height = "auto";
                let img = document.createElement('img');
                img.className = "thumb";
                img.src = e.target.result;                
                document.getElementById(div.id).insertBefore(img, null);
            }
        })(f);

        reader.readAsDataURL(f);
    }
    
}

let el = document.getElementById('vanilla');
let vanilla = new Croppie(el, {
    enableExif: true,
    viewport: { width: 200, height: 200 , type: 'circle'},//擷取大小 type預設為square 使用為circle設定為圓形
    boundary: { width: 800, height: 400},//顯示範圍
    showZoomer: true, //是否顯示縮放拉桿
    //enableResize: true, //使用者是否可自訂擷取範圍
    enableZoom: true,
    enableOrientation: true
});


let bindVanilla = (src, orientation) =>{
    vanilla.bind({
        url: src,
        orientation: parseInt(orientation, 10)
    })
}

//選擇要編輯的圖片
let selectImg = (id) =>{       
    let vanillaImg = document.getElementById('vanilla');    
    let src = document.getElementById(id).children[0].src;
    vanillaImg.src = src;    
    bindVanilla(src, 1);
}

//圖片方向
let vanillaOrientation = () =>{
    let orientaion = selectOrietation.value;
    let vanillaImg = document.getElementById('vanilla');    

    bindVanilla(vanillaImg.src, orientaion);
}

//選轉圖片
let croppieRotate = (ev) => {
    let deg = ev.target.dataset.deg;
    vanilla.rotate(deg);
}

//下載圖片被截取的部分
let croppieResult = () => {
    vanilla.result({
        type: 'base64',
        size: 'viewport',
        format: 'png'
    }).then(function(src) {
        let downloadImg = document.createElement('a');
        downloadImg.setAttribute("href", src);
        downloadImg.setAttribute("download", "");

        let evObj = document.createEvent('MouseEvents');
        evObj.initMouseEvent( 'click', true, true, window, 0, 0, 0, 0, 0, false, false, true, false, 0, null);
        downloadImg.dispatchEvent(evObj);
    });
}

btnLeft.addEventListener('click', croppieRotate, false);
btnRight.addEventListener('click', croppieRotate, false);
btnDownload.addEventListener('click', croppieResult, false);

uploadArea.addEventListener('dragover', handleDragOver, false);
uploadArea.addEventListener('drop', handleSelectFiles, false);

selectOrietation.addEventListener('change', vanillaOrientation, false);