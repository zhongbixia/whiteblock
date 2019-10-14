var go=document.getElementById('go');
var main=document.getElementById('main');
var colorsArr=['yellow','red','blue','black'];
var speed=5,num=0,timer,flag=true;
function clickStart(){
    go.addEventListener('click',function(){
        go.style.display='none';   //自身消失
        move();    //调用移动
    })
}
clickStart();
//实现运动 判断游戏是否结束
function move(){
    clearInterval(timer);    //清理timer，防止定时器累加
    timer=setInterval(function(){
        var step = parseInt(main.offsetTop) + speed;    //step高度  改变当前区域的top值，使之加上speed的值
        main.style.top=step + 'px';  
        if(parseInt(main.offsetTop) >= 0){  //如果运动到warpper区域
            main.style.top='-150px';
            cDiv();
        }
        var len=main.childNodes.length;  //判断当前div的长度
        if(len == 6){    //如果当前div的长度等于0，把最后一行删掉
            for(var i=0;i<4;i++){   //循环最后一行的四列
                if(main.childNodes[len-1].childNodes[i]){
                    if(main.childNodes[len-1].childNodes[i].classList.contains('i')){ //是否有包含没点击的色块 
                        alert('游戏结束，得分: ' + num);
                        clearInterval(timer);  //清理当前计时器
                        flag=false;
                        
                        
                    }
                }
               
            }
            main.removeChild(main.childNodes[len-1]);  //删除最下面的一行
        }
    },20);
    bindEvent();
}
//创建行和列，小方格
function cDiv(){
    var oDiv=document.createElement('div');   //创建一个div
    var index=Math.floor(Math.random()*4);   //随机取0-4的整数存储到index中
    oDiv.setAttribute('class','row');
    for(var j=0;j<4;j++){
        var iDiv=document.createElement('div');
        oDiv.appendChild(iDiv);   //创建的每一列插入行中
    }
   if(main.childNodes.length==0){   //如果main区域为空
       main.appendChild(oDiv);   //将odiv插入到main中
   }else{
       main.insertBefore(oDiv,main.childNodes[0]);  //将新生成的ODIV插入到main的childNodes[0]最前面
   }
    var clickDiv=main.childNodes[0].childNodes[index];  //取main的第一行，随机拿取第一行中的某一列作为色块
    clickDiv.setAttribute('class','i');    //为当前div取一个class名
    clickDiv.style.backgroundColor=colorsArr[index];    //给当前div赋予随机的背景色

}
//游戏开始，点击方块 判断游戏是否结束
function bindEvent(){
    main.addEventListener('click',function(e){
        if(flag){
            var tar=e.target;  //获取触发源对象
            if(tar.className=='i'){   //如果点击色块
                tar.style.backgroundColor='#bbb';  //色块背景色更换
                tar.classList.remove('i');  //点击之后，移除i
                num++;
    
            }else{
                alert('游戏结束，得分' + num);
                clearInterval(timer);
                flag=false;
            }
            if(num % 10 == 0){
                speed++;
            }
        }
        
    })
}
