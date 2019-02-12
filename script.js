let pixels;
let original;
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

document.getElementById('inp').onchange = function(e) {
    var img = new Image();
    img.onload = draw;
    img.onerror = failed;
    img.src = URL.createObjectURL(this.files[0]);
};
function draw() {
    canvas.width = this.width;
    canvas.height = this.height;
    ctx.drawImage(this, 0,0);
    pixels = ctx.getImageData(0,0,canvas.width,canvas.height);
    original = ctx.getImageData(0,0,canvas.width,canvas.height);


}
function failed() {
    console.error("The provided file couldn't be loaded as an Image media");
}

function greyOut(){
    for(let i =0; i<pixels.data.length;i++){
        pixels.data[i] = 122;
    }
    ctx.putImageData(pixels,0,0);
}

document.getElementById("jasnosc").addEventListener("input",
function brightness(e){
    for(let i = 0; i<pixels.data.length;i+=4){
        pixels.data[i] = parseInt(original.data[i])+255*(e.target.value/100);
        pixels.data[i+1] = parseInt(original.data[i+1])+255*(e.target.value/100);
        pixels.data[i+2] = parseInt(original.data[i+2])+255*(e.target.value/100);
    }
    ctx.putImageData(pixels,0,0);
})

document.getElementById("kontrast").addEventListener("input",
function brightness(e){
    let contrast = parseFloat(e.target.value);
    let factor = (259 * (contrast + 255)) / (255 * (259 - contrast))
    for(let i = 0; i<pixels.data.length;i+=4){
        pixels.data[i] = factor * (parseInt(original.data[i])   - 128) + 128;
        pixels.data[i+1] = factor * (parseInt(original.data[i+1])   - 128) + 128;
        pixels.data[i+2] = factor * (parseInt(original.data[i+2])   - 128) + 128;
    }
    ctx.putImageData(pixels,0,0);
})
