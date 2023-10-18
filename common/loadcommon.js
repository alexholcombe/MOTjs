
var oXMLhttp;

var wechat_found=0;
var resource_loaded=0;
var cover_started=0;
var measure_done=1;

var game_outcome=1;

var verification_code='';
var track_ID='';
var current_level=1;
var current_try=0;
var chosen_display_width=0;
var verification_results = 0;
var wechat_old = 0;



var preload = {
  startPreload: function () {
    var preload = new createjs.LoadQueue(true);
    preload.setMaxConnections(10);
    preload.loadManifest(mainfest);
    preload.addEventListener("complete", this.loadComplete);
  },
  loadComplete: function () {
	resource_loaded = 1;
	if ((cover_started==1) && (resource_loaded==1)&&(wechat_found==1)&&(measure_done==1)) {
		
		if ((game_name=='photo')||(game_name=='character')||(game_name=='shape')) {
		supportive_container_app.image_url='https://visualgame.oss-cn-shenzhen.aliyuncs.com/cover/' + game_name + '.gif';
		}
		supportive_container_app.show_button=true;
		}
  }
}

function verifywechatIDs() {
  if (oXMLhttp !=null) {
    $.ajax({
      type: 'post',
      url: '../common/verifywechatIDs.php',
      data: {
		wechat_ID:supportive_container_app.wechat_ID,
		game_name:game_name,
      },
	  success: function(Echo_info) {
		  wechat_found=1;
		  if ((cover_started==1) && (resource_loaded==1)&&(wechat_found==1)&&(measure_done==1))  {
			if ((game_name=='photo')||(game_name=='character')||(game_name=='shape')) {
		supportive_container_app.image_url='https://visualgame.oss-cn-shenzhen.aliyuncs.com/cover/' + game_name + '.gif';
			}
		  supportive_container_app.show_button=true;
		  }
		  feedback=JSON.parse(Echo_info);
		  
		  	if (feedback[0] != 'N/A') {
		  			 wechat_old =1;
		  			 supportive_container_app.player_ID=feedback[0];
					 current_level=parseInt(feedback[1],10);
					 current_try=parseInt(feedback[2],10);
					 current_average=parseFloat(feedback[3]);

		  	}
	},
      error: ()=> {console.log('verify wechat error(s).');}
    });
  }
}

function verifyIDs() {
  if (oXMLhttp !=null) {
    $.ajax({
      type: 'post',
      url: '../common/verifyIDs.php',
      data: {
		player_ID:supportive_container_app.player_ID,

      },
	  success: function(Echo_info) {
		verification_results = parseInt(Echo_info, 10);
				if (verification_results==21) {
				game_phase=3;
				game_phase_control();			
				} else {
				alert("用户名已经被占用");
				}
		
	},
      error: ()=> {console.log('verifyIDs error(s).');}
    });
  }
}

function prepareData() {

  if (oXMLhttp !=null) {
    $.ajax({
      type: 'post',
      url: '../common/prepareData.php',
      data: {
		wechat_ID:supportive_container_app.wechat_ID,
		player_ID:supportive_container_app.player_ID,
		current_level: current_level,
		game_name:game_name,
      },
	  success: function(Echo_info) {
		//console.log(Echo_info);
	  },
	error: ()=> {console.log('PrepareData error(s).');}
    });
  }
}


function postData() {
	
		post_data_url='../common/post_Data.php';

  if (oXMLhttp !=null) {
    $.ajax({
      type: 'post',
      url: post_data_url,
      data: {
		wechat_ID:supportive_container_app.wechat_ID,
		player_ID:supportive_container_app.player_ID,
		save_data:save_data,
		save_parameter:save_parameter,
		game_outcome:game_outcome,
		game_name:game_name,
      },
	  success: function(Echo_info) {
		//console.log(Echo_info);
	  },
	error: ()=> {console.log('PostData error(s).');}
    });
  }
}

function postInfo() {
	


		post_info_url='../common/postInfo.php';

	
  if (oXMLhttp !=null) {
    $.ajax({
      type: 'post',
      url: post_info_url,
      data: {
        wechat_ID:supportive_container_app.wechat_ID,
		player_ID:supportive_container_app.player_ID,
		DOB: supportive_container_app.year*10000 + supportive_container_app.month*100 + supportive_container_app.day,
		verification_code: verification_code,
		track_ID:track_ID,
        gender: supportive_container_app.gender,
		
		game_name:game_name,
      },
	  success: function(Echo_info) {
		//console.log(Echo_info);
	  },
      error: ()=> {console.log('postInfo errors');}
    });
  }
}

var supportive_container_app=new Vue({
	el: '#supportive_container',
	data: {
	    container_width: "300px",
		information_width: "50px",
		container_height: "300px",
		title_height:"300px",
		top_gap: "50px",
		left_gap: "50px",

		button_top: "50px",
		button_left: "50px",
		button_width: "50px",
		button_content: "catch error",
		input_font_size: "50px",
		input_info_content: "catch error",
		input_info_content2: "catch error",
		wechat_ID: "",
		player_ID: "",
		

		year: 0,
		month: 0,
		day: 0,
		gender: "",

		text_max_height: "50px",

		years: [1964,1965,1966,1967,1968,1969,1970,1971,1972,1973,1974,1975,1976,1977,1978,1979,1980,1981,1982,1983,1984,1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004],
		months: [1,2,3,4,5,6,7,8,9,10,11,12],
		days: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],


		show_image: false,
		show_supportive: false,
		show_text: false,
		show_button: false,
		show_input: false,
		image_url: "https://visualgame.oss-cn-shenzhen.aliyuncs.com/virus/VG_logo2.gif",
		title_url: "https://visualgame.oss-cn-shenzhen.aliyuncs.com/virus/title_blank.png",
		show_logo: true,
		text_content: "",
	}
})

window.onload=function(){
	

 if (window.innerWidth*screen_ratio > window.innerHeight) {
 chosen_display_width=window.innerHeight/screen_ratio;
 chosen_top_gap=0;
 chosen_left_gap=(window.innerWidth-chosen_display_width)/2;
 } else {
 chosen_display_width=window.innerWidth;
 chosen_top_gap=(window.innerHeight-(window.innerWidth*screen_ratio))/2;
 chosen_left_gap=0; 
 }
 
 supportive_container_app.wechat_ID=window.location.search.substring(1);

		supportive_container_app.image_url="https://visualgame.oss-cn-shenzhen.aliyuncs.com/virus/VG_logo2.gif";
	   	supportive_container_app.top_gap=chosen_top_gap + 'px';
		supportive_container_app.left_gap=chosen_left_gap + 'px';
		supportive_container_app.container_width=chosen_display_width + 'px';
		supportive_container_app.information_width=(chosen_display_width*0.91) + 'px';
		supportive_container_app.container_height=(chosen_display_width*screen_ratio) + 'px';
		supportive_container_app.text_max_height=(chosen_display_width*screen_ratio)*0.6 + 'px';		
		supportive_container_app.button_top=(chosen_display_width*screen_ratio)*0.9 + 'px';
		supportive_container_app.button_width=chosen_display_width*0.8 + 'px';
		supportive_container_app.button_left=chosen_display_width*0.1 + 'px';
		stimuli_container_app.top_gap=chosen_top_gap + 'px';
		stimuli_container_app.left_gap=chosen_left_gap + 'px';
		stimuli_container_app.container_width=chosen_display_width + 'px';
		stimuli_container_app.information_width=(chosen_display_width*0.91) + 'px';
		
		stimuli_container_app.information_height=(chosen_display_width*(1-1/screen_ratio)/(2/screen_ratio)) + 'px';
		supportive_container_app.title_height=(chosen_display_width*(1-1/screen_ratio)/(2/screen_ratio)) + 'px';
		supportive_container_app.input_font_size=(chosen_display_width*0.06) + 'px';
		
		start_program_setting();

if (debug_mode==1) {
	game_phase=5;
} else {
	game_phase=0;
}

 game_phase_control();
}

function showcover() {
window.clearTimeout(mytimeoutpointer);
supportive_container_app.show_logo=true;

		if ((game_name=='photo')||(game_name=='character')||(game_name=='shape')) {
		supportive_container_app.image_url='https://visualgame.oss-cn-shenzhen.aliyuncs.com/games/loading.gif';
		} else {
		supportive_container_app.image_url='https://visualgame.oss-cn-shenzhen.aliyuncs.com/cover/' + game_name + '.gif';	
		}


cover_started=1;

if ((cover_started==1) && (resource_loaded==1)&&(wechat_found==1)&&(measure_done==1)) {
		if ((game_name=='photo')||(game_name=='character')||(game_name=='shape')) {
		supportive_container_app.image_url='https://visualgame.oss-cn-shenzhen.aliyuncs.com/cover/' + game_name + '.gif';
		}
		supportive_container_app.show_button=true;
}
else {
supportive_container_app.show_button=false;	
}
supportive_container_app.button_content="继续";
musicAudio.loop = true;
musicAudio.volume=0.3;
musicAudio.play();
}

function clickbutton() {
	
if (game_phase==0) {

if (wechat_old==1) {
	//debug mode
	if (current_try>0)  {
		game_phase=5;
		} else {
		game_phase=3;
		}
} else {
	game_phase=1;
}

game_phase_control();

} else if (game_phase==1) {

if ((supportive_container_app.player_ID!="") && (supportive_container_app.year>0) && (supportive_container_app.month>0) && (supportive_container_app.day>0) && (supportive_container_app.gender != "")) 
{

var zg = /^[0-9a-zA-Z]+$/;
var zg2= /^[a-zA-Z]+$/;
if (zg.test(supportive_container_app.player_ID)) {
if (zg2.test(supportive_container_app.player_ID.charAt(0))) {
	
	if ((supportive_container_app.player_ID.length<4) || (supportive_container_app.player_ID.length > 14)) {
		alert("ID长度必须在4~14之间");	
	} else {
		verifyIDs();
	}
} else {
	alert("ID必须以字母开头");
}
} else {
	alert("ID只能由字母和数字组成");
}

} else {
alert("尚未输入完整信息");
}
} else if (game_phase==3) {
current_level=1;
game_phase=5;
game_phase_control();	
} else if (game_phase==5) {
	
	startatrial();
	
	if (game_outcome==1) {
		levelupAudio.pause();
		levelupAudio.currentTime = 0;
	} else {
		crashAudio.pause();
		crashAudio.currentTime = 0;		
	}
	
} else {	
game_phase=game_phase+1;
game_phase_control();
}
}


function game_phase_control() { //控制程序在所有的阶段间切换。

	if (game_phase==0) // 初始化并显示开场动画和封面
	{
		
//define XMLHttpRequest object
if (window.XMLHttpRequest) {
  oXMLhttp=new XMLHttpRequest();
} else {
  oXMLhttp=new ActiveXObject("Microsoft.XMLHTTP");
}


if (debug_mode==0) {
//get wechat_ID
if (supportive_container_app.wechat_ID.length==28) {
verifywechatIDs();	
} else {
window.location.replace("https://huang.psy.cuhk.edu.hk/games/");
}


}

		supportive_container_app.show_supportive=true;
		supportive_container_app.show_image=true;
		supportive_container_app.show_logo=true;
		supportive_container_app.show_text=false;
		supportive_container_app.show_button=false;
		supportive_container_app.show_input=false;
		stimuli_container_app.show_trial=false;
		
		preload.startPreload();
		
		//生成抽奖密码
				   var list_characters='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
				   for ( var i=0; i < 8; i++ ) {
				      verification_code +=list_characters.charAt(Math.floor(Math.random() * 62));
					}
					for ( var i=0; i < 10; i++ ) {
					   track_ID +=list_characters.charAt(Math.floor(Math.random() * 62));
					}
		
		logoAudio.play();
		mytimeoutpointer=setTimeout(showcover,2000);
		


	} else if(game_phase==1) // 输入出生年月日和性别
	{

	supportive_container_app.show_image=false;
	supportive_container_app.show_input=true;
	supportive_container_app.button_content="注册以上新ID信息";
	supportive_container_app.title_url="https://visualgame.oss-cn-shenzhen.aliyuncs.com/virus/title_brain.gif";
	} else if(game_phase==3) {	// 显示知情同意书
	
		if (wechat_old==0) {
	postInfo();	
	}
	supportive_container_app.show_input=false;
		
	supportive_container_app.title_url="https://visualgame.oss-cn-shenzhen.aliyuncs.com/virus/title_brain.gif";
		supportive_container_app.input_font_size=(chosen_display_width*0.04) + 'px';
		supportive_container_app.show_image=false;
		supportive_container_app.show_text=true;
		supportive_container_app.text_content="<p style='text-align: center; font-weight: bold'>研究参加者知情同意书 </p>这个游戏是香港中文大学黄力强教授研究项目的一部分。在该游戏中，你将看到一些视觉信息并需要把他们在心里记住一会儿，然后根据要求点击屏幕。每次游戏持续约6-10分钟。<br>该游戏不会引起除正常手机使用之外的不适，但如果您有严重眼部疾病或者因任何原因不适合使用手机，年龄小于18岁或大于60岁，或不具备正常行为能力，请不要参加本研究。如果您中途改变主意，请随时退出。<br>我们的游戏会记录您在屏幕点击的位置和时间的数据。这些数据不会涉及您个人的任何敏感信息，将被永久保存在我们的加密数据库中，并将被用于我们以及合作团队的科学研究。如果我们从这些数据中幸运地做出了重要发现，它们将会与科学论文一起公之于众，但任何您的个人信息都不会被公布。<br> 如果您有任何问题或建议，欢迎加黄力强教授(lqhuang@cuhk.edu.hk)进一步咨询。香港中文大学社会科学学院调查及行为研究操守委员会的联系方式是 fssc02@cuhk.edu.hk 。<br><span style='color: red'>点下面表示你明白以上说明并自愿参加该研究。</span>";
		supportive_container_app.button_content="同意并继续";
	} else if(game_phase==5) // 进行正式实验
	{
	supportive_container_app.title_url="https://visualgame.oss-cn-shenzhen.aliyuncs.com/virus/title_blank.png";
	supportive_container_app.input_font_size=(chosen_display_width*0.06) + 'px';
	supportive_container_app.show_text=false;
	supportive_container_app.button_content="继续";
	startexperiment();
	} 
}


//以下最后3个函数处理正式实验阶段的流程
function startexperiment() {

supportive_container_app.show_supportive=false;
supportive_container_app.show_image=true;
supportive_container_app.image_url="https://visualgame.oss-cn-shenzhen.aliyuncs.com/jump/levelup.gif";
supportive_container_app.show_logo=true;
supportive_container_app.title_url="https://visualgame.oss-cn-shenzhen.aliyuncs.com/virus/title_blank.png";
supportive_container_app.show_button=false;
stimuli_container_app.show_trial=true;
stimuli_container_app.info_font_size=(chosen_display_width*0.06) + 'px';
stimuli_container_app.show_button=true;
startatrial();
}

function startatrial() {
	
stimuli_container_app.show_trial=true;
supportive_container_app.show_supportive=false;

RTs=[0,0];
responses=[0,0];
starttimeread=new Date();
starttime=starttimeread.getTime();

if (game_mode==1) {
prepareData();	

		if ((game_name=='photo')||(game_name=='diary')) {
		show_cutoff=0;
		} else {
		show_cutoff=cutoff_limit+count_limit;			
		}

if (current_try>show_cutoff) {
temp_value=(current_average-convert_mean)*convert_precision;
if (temp_value>50) {
	temp_value=50+Math.sqrt(temp_value-50);
}
show_average=110+Math.round(temp_value);
} else {
show_average="测试中";
}

}

start_trial_setting();

}