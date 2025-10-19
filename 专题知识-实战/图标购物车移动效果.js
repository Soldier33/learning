// 小图标点击后 跳到左下角
强行渲染：div.clientWidth

创建一个新图标，使其与原来的图标重叠，点击后位移到左下角，事先计算好位置x, y

var div = document.createElement('div');
div.className = 'add'

div.style.transform = `translate(${start.x} px, ${start.y}px)`;
div.appendChild(i);

div.clientWidth;

div.style.transform = `translate(${this.jumpTarget.x} px, ${this.jumpTarget.y}px)`;



