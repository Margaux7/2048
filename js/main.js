$(document).ready(function(){
  var cubes = new Array(16);    //储存格子内的数字
  var judge1 = 1;     //判断是否能左移
  var judge2 = 1;     //判断是否能右移
  var judge3 = 1;     //判断是否能上移
  var judge4 = 1;     //判断是否能下移

  //判断是否合并或移动
  var judge11 = 0;    
  var judge22 = 0;
  var judge33 = 0;
  var judge44 = 0; 
  
  //背景音乐
  var musicjud = 1;
  var music = document.getElementById("music");
  $("#btnMusic").click(function(){
    if(musicjud === 1){
      music.pause();
      musicjud = 0;
    }
    else{
      music.play();
      musicjud = 1;
    }
  })
  
  //设置相关按钮
  function setBtn(){
    $("#btnRules").click(function(){
    $("#divRules").show(1000);
    });
    $("#btnBack").click(function(){
      $("#divRules").hide(1000);
    })
    $("#btnAgain").click(function(){
      start();
    })
  }

  //渲染游戏格子
  function render(){
    var allCube = document.getElementById("boxPlay").getElementsByTagName("div");
    for(var i = 0; i < 16; i++){
      if(cubes[i] === 0){
         allCube[i].innerHTML = '';
         allCube[i].className = "cube0";
         allCube[i].style.backgroundColor = "#dcdcdc";
      }
      else if(cubes[i] !== 0){
        allCube[i].innerHTML = cubes[i];
        if(cubes[i] === 2)
          allCube[i].className = "cube2";
        else if(cubes[i] === 4)
          allCube[i].className = "cube4";
        else if(cubes[i] === 8)
          allCube[i].className = "cube8"; 
        else if(cubes[i] === 16) 
          allCube[i].className = "cube16";
        else if(cubes[i] === 32) 
          allCube[i].className = "cube32";
        else if(cubes[i] === 64) 
          allCube[i].className = "cube64";
        else if(cubes[i] === 128) 
          allCube[i].className = "cube128";
        else if(cubes[i] === 256) 
          allCube[i].className = "cube256";
        else if(cubes[i] === 512) 
          allCube[i].className = "cube512";
        else if(cubes[i] === 1024) 
          allCube[i].className = "cube1024";
        else if(cubes[i] === 2048) 
          allCube[i].className = "cube2048";
      }
    }
    if(judge2048() === 1){
      $("#spanPrompt").html("You win!");
      $("#spanPrompt").css("font-size", "40px");
      $("#spanPrompt").css("backgroundColor", "#c2c6cd");
      keypress.preventDefault();
      return;
    }
  }

  //监听键盘方向操作
  function eventCodeListener(){
    $(document).keypress(function(event){
    if(event.keyCode === 37)
      toLeft();
    else if(event.keyCode === 38)
      toUp();
    else if(event.keyCode === 39)
      toRight();
    else if(event.keyCode === 40)
      toDown();
  })
  }

  //向左位移
  function toLeft(){
    track();
    if(judgeResult() === 0)
      return;
    else{
      if(judge1 === 1){
        for(var i = 0; i < 16; i++){
          if(i % 4 !== 0 && cubes[i] !== 0){
            for(var j = 1; cubes[i-j] === 0;){
              j++;
              if((i - j + 1) % 4 === 0)
              break;
            }
            if(j !== 1){
              cubes[i - j + 1] = cubes[i];
              cubes[i] = 0;
              judge11 = 1;
            }
          }
        }
      }
      leftChange();
      if(judgeNum() === 1 && judge11 === 1){
        newNum();
        judge11 = 0;
      }
      render();
    }
  }

  //左位移计算
  function leftChange(){
    for(var i = 0; i < 16; i++){
      if(i % 4 !== 0 && cubes[i] !== 0){
        if(cubes[i] === cubes[i-1]){
          cubes[i-1] = cubes[i-1] + cubes[i];
          cubes[i] = 0;
          judge11 = 1;
          if((i + 1) % 4 !== 0 && cubes[i+1] !== 0){
            cubes[i] = cubes[i+1];
            cubes[i+1] = 0;
          }
        }
      }
    }
  }

  //向右位移
  function toRight(){
    track();
    if(judgeResult() === 0)
      return;
    else{
      if(judge2 === 1){
        for(var i = 15; i >= 0 ; i--){
          if((i + 1) % 4 !== 0 && cubes[i] !== 0){
            for(var j = 1; cubes[i+j] === 0;){
              j++;
              if((i + j) % 4 === 0)
                break;
            }
            if(j !== 1){
              cubes[i+j-1] = cubes[i];
              cubes[i] = 0;
              judge22 = 1;
            }
          }
        }
      }
      rightChange();
      if(judgeNum() === 1 && judge22 === 1){
         newNum();
         judge22 = 0;
      }
      render();
    }
  }

  //右位移计算
  function rightChange(){
    for(var i = 15; i >= 0; i--){
      if((i + 1) % 4 !== 0 && cubes[i] !== 0){
        if(cubes[i] === cubes[i+1]){
          cubes[i+1] = cubes[i+1] + cubes[i];
          cubes[i] = 0;
          judge22 = 1;
          if(i %  4 !== 0 && cubes[i-1] !== 0){
            cubes[i] = cubes[i-1];
            cubes[i-1] = 0;
          }
        }
      }
    }
  }

  //向上位移
  function toUp(){
    track();
    if(judgeResult() === 0)
      return;
    else{
      if(judge3 === 1){
        for(var i = 0; i < 16; i++){
          if(i > 3 && cubes[i] !== 0){
            for(var j = 1; cubes[i - 4 * j] === 0;){
              j++;
              if(i - 4 * j + 4 <= 3)
                break;
            }
            if(j !== 1){
              cubes[i - 4 * j + 4] = cubes[i];
              cubes[i] = 0;
              judge33 = 1;
            }
          }
        }
      }
      UpChange();
      if(judgeNum() === 1 && judge33 === 1){
        newNum();
        judge33 = 0;
      }
      render();
    }
  }

  //上位移计算
  function UpChange(){
    for(var i = 0; i < 16; i++){
      if(i > 3 && cubes[i] !== 0){
        if(cubes[i] === cubes[i-4]){
          cubes[i-4] = cubes[i-4] + cubes[i];
          cubes[i] = 0;
          judge33 = 1;
          if(i < 12 && cubes[i+4] !== 0){
            cubes[i] = cubes[i+4];
            cubes[i+4] = 0;
          }
        }
      }
    }
  }

  //向下位移
  function toDown(){
    track();
    if(judgeResult() === 0)
      return;
    else{
      if(judge4 === 1){
        for(var i = 15; i >= 0; i--){
          if(i < 12  && cubes[i] !== 0){
            for(var j = 1; cubes[i + j * 4] === 0;){
              j++;
              if(i + 4 * j - 4 >= 12)
              break;
            }
            if(j !== 1){
              cubes[i + j * 4 - 4] = cubes[i];
              cubes[i] = 0;
              judge44 = 1;
            }
          }
        }
      }
      downChange();
      if(judgeNum() === 1 && judge44 === 1){
        newNum();
        judge44 = 0;
      }
      render();
    }
  }

  //下位移计算
  function downChange(){
    for(var i = 15; i >= 0; i--){
      if(i < 12 && cubes[i] !== 0){
        if(cubes[i] === cubes[i+4]){
          cubes[i+4] = cubes[i+4] + cubes[i];
          cubes[i] = 0;
          judge44 = 1;
          if(i > 3 && cubes[i-4] !== 0){
            cubes[i] = cubes[i-4];
            cubes[i-4] = 0;
          }
        }
      }
    }
  }

  //出现新数字
  function newNum(){
    var num = Math.floor(Math.random()*15+1);
    for(; cubes[num] !== 0;)
      num = Math.floor(Math.random()*15+1);
    if(num % 2 === 0)
      cubes[num] = 2;
    else
      cubes[num] = 4;
  }

  //初始出现数字
  function initNum(){
    var num1 = Math.floor(Math.random()*15+1);
    var num2 = Math.floor(Math.random()*15+1);
    for(; num1 === num2;){
      num1 = Math.floor(Math.random()*15+1);
      num2 = Math.floor(Math.random()*15+1);
    }
    if(num1 % 2 === 0)
      cubes[num1] = 2;
    else
      cubes[num1] = 4;
    if(num2 % 2 === 0)
      cubes[num2] = 2;
    else
      cubes[num2] = 4;
    render();
  }

  //检查是否还可以进行位移
  function judgeResult(){
    if(judge1 === 0 && judge2 === 0 && judge3 === 0 && judge4 === 0 && judgeNum() === 0){
      $("#spanPrompt").html("Game over");
      $("#spanPrompt").css("font-size", "40px");
      $("#spanPrompt").css("backgroundColor", "#c2c6cd");
      render();
      return 0;
    }
    return 1;
  }

  //跟踪变化
  function track(){
    judge1 = 0;     
    judge2 = 0;     
    judge3 = 0;   
    judge4 = 0; 

    for(var i = 0; i < 16; i++){
      if((i % 4 !== 0 && cubes[i] !== 0 && cubes[i-1] === 0) || (i % 4 !== 0 && cubes[i] === cubes[i-1] && cubes[i] !== 0))
        judge1 = 1;
    }
    for(var i = 15; i >= 0; i--){
      if(((i + 1) % 4  !== 0 && cubes[i+1] === 0 && cubes[i] !== 0) || ((i + 1) % 4 !== 0 && cubes[i] !== 0 && cubes[i] === cubes[i+1])) 
        judge2 = 1;
    }
    for(var i = 0; i < 16; i++){
      if((i > 3 && cubes[i-4] === 0 && cubes[i] !== 0) || (i > 3 && cubes[i] !== 0 && cubes[i] === cubes[i-4]))
        judge3 = 1;
    }
    for(var i = 15; i >= 0; i--){
      if((i < 12 && cubes[i+4] === 0 && cubes[i] !== 0) || (i < 12 && cubes[i] !== 0 && cubes[i] === cubes[i+4]))
        judge4 = 1;
    }
  }
  
  //检查数字是否已填满
  function judgeNum(){
    var judge = 0;
    for(var i = 0; i < 16; i++){
      if(cubes[i] === 0)
        judge = 1;
    }
    return judge;
  }

  //检查是否已有2048
  function judge2048(){
    var judge = 0;
    for(var i = 0; i < 16; i++){
      if(cubes[i] === 2048)
        judge = 1;
    }
    return judge;
  }

  function start(){
    judge1 = 1;     
    judge2 = 1;     
    judge3 = 1;   
    judge4 = 1;   
    judge11 = 0;
    judge22 = 0;
    judge33 = 0;
    judge44 = 0;
    $("#spanPrompt").html("Keep it up..");
    $("#spanPrompt").css("font-size", "20px");

    for(var i = 0; i < 16; i++)   //数组初始化
      cubes[i] = 0;
    initNum();
    eventCodeListener();
  }

  function init(){
  setBtn();
  start();
  }

  init();
});