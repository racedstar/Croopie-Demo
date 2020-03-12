# 這個DEMO是做什麼用的
>使用Croppie實現圖片剪裁及選轉功能

## Croppie是什麼?
[官方網頁](https://foliotek.github.io/Croppie/)
>Croopie是一個能夠是讓jQuery實現圖片剪裁的簡單外掛。

## 選項(Options)
>這裡會先介紹一些基本屬性，若有需要查看所有屬性請至[官網](https://foliotek.github.io/Croppie/)。

* boundary [object]
  > Croppie的物件邊界大小  
  >`預設值：外部容器的大小`
* enableOrientation [boolean]
  > 是否啟用自定義方向(關於Orientation詳情請看bind方法)  
  >`預設值：false`
* enableResize [boolean]
  > 是否啟用使用者修改Croppie物件大小(修改boundary選項)  
  >`預設值：false`
* enableZoom [boolean]
  > 是否啟用縮放功能  
  >`預設值：true`
* mouseWheelZoomb [boolean/string]
  > 是否啟用滑鼠滾輪控制縮放功能，若是value給予'ctrl'則必須使用'ctrl'才可縮放  
  >`預設值：true`
* showZoomer [boolean]
  > 是否顯示縮放拉桿(想要顯示拉桿enableZoom不能是false，否則此選項無效)  
  >`預設值：true`
* viewport [object]
  > 圖片被截取的部分。type有效值為 square(方形)與circle(圓形)
  >`預設值：{width:100, height:100, type: 'square'}`

## 方法(Methods)
>這裡會先介紹一些基本方法，若有需要查看所有方法請至[官網](https://foliotek.github.io/Croppie/)。
* get() [object]
  > 取得擷取點與圖片的縮放。
* bind({url, points, orientation, zoom}) [Promise]
  >將圖片綁定在元素(可以是img或者div)上，並回傳圖片並初始化裁切圖片。
  * url： `將被裁切圖片的位置`
  * points： `傳入陣列設定裁切位置 [topLeftX, topLeftY, bottomRightX, bottomRightY]`
  * orientation： `傳入以下整數值使圖片自訂義方向，需先啟用enableOrientation`  
    1.正常  
    2.水平翻轉  
    3.選轉180度  
    4.垂直翻轉  
    5.水平翻轉後左轉90度  
    6.順時鐘懸轉90度  
    7.水平翻轉後右轉90度  
    8.逆時鐘旋轉90度  
  * zoom：`控制圖片的縮放大小(填入整數)`
* destroy()
  > 刪除一個croppie物件
* result({type, size, format, quality, circle}) [Promise]
  * type
    * [預設值] 'canvas'
    * 'base64'
    * 'html'
    * 'blob'
    * 'rawcanvas'
  * size
    * [預設值] 'viewport' 生成圖片大小與viewport大小一樣
    * original 生成圖片大小與原圖比例一樣
    * {width, height} 自定義大小，可以只輸入單一數值，系統將會依據比例自動計算尺寸
  * format
    * [預設值] 'png'
    * 'jpeg'
    * 'webp'
  * quality
    > 使用0到1之間的數字來決定圖片生成的質量  
    > `預設值：1`
  * circle [boole]
    > 強制將圖片剪裁成圓形
* rotate(degrees)
  > 將圖片旋轉到指定的角度，只有在enableOrientation屬性啟用時作用  
  > `有效數值：90, 180, 270, -90, -180, -270`
