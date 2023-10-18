const debug_mode=1;
const game_mode=1;


const cutoff_limit=5;
const count_limit=10;

const target_refresh_rate=60;

const game_name="template";
document.title="中文名字";

const screen_ratio=1.65;
const max_level=30;
var number_of_item = 1;

var logoAudio=new Audio('https://visualgame.oss-cn-shenzhen.aliyuncs.com/jump/VG_logo.mp3');
var musicAudio = new Audio('https://visualgame.oss-cn-shenzhen.aliyuncs.com/jump/music.mp3');
var levelupAudio=new Audio('https://visualgame.oss-cn-shenzhen.aliyuncs.com/color/success.mp3');
var crashAudio=new Audio('https://visualgame.oss-cn-shenzhen.aliyuncs.com/color/failure.mp3');

//////////////////////#//////////////////////////define the variables
var convert_mean=0;
var convert_precision=1;

var MOT_segments=Array(6).fill(0);
var MOT_frames_x=Array(6).fill(0);
var MOT_frames_y=Array(6).fill(0);

////////////////////#/////////////////////preload the resource
var mainfest = [
  {src: 'https://visualgame.oss-cn-shenzhen.aliyuncs.com/jump/item.gif'},
];

var stimuli_container_app=new Vue({
	el: '#stimuli_container',
	data: {
		files : ['https://visualgame.oss-cn-shenzhen.aliyuncs.com/jump/item.gif'],
		pics :Array(number_of_item).fill(0),
		show_item: Array(number_of_item).fill(false),
		item_left : Array(number_of_item).fill('0px'),
		item_top : Array(number_of_item).fill('0px'),
	    container_width: "300px",
		item_width: "50px",
		information_height: "50px",
		information_width: "50px",
		top_gap: "50px",
		left_gap: "50px",
		game_info_content:"catch",
		info_font_size: "50px",
		show_trial: false,
		
		//////////////////#///////////////////define Vue variables

	},
	methods:{
		imageclick : function (evt) {
		
		//////////////////#///////////////////define the Vue response function
		
		//debug mode
		//here, write the code
				    clickitem=parseInt(evt.target.id);
					game_outcome=Math.floor(Math.random() * 2);
					endofonegame();

					
		},
		
		
	}

});


function start_program_setting() {		
//////////////////#///////////////////initilize the Vue variables
stimuli_container_app.item_width=chosen_display_width*0.02 + 'px';

}

function start_trial_setting() {
//////////////////#///////////////////start a trial
stimuli_container_app.game_info_content= "<br /><span style='font-weight: bold; color: darkgoldenrod'>" + supportive_container_app.player_ID + "</span> &nbsp&nbsp&nbsp" + "成绩:" + show_average;

if ((current_level==1) && (current_try==0)) {
	stimuli_container_app.game_info_content="";	
}


// The trajectories are specified by the following variables:

// The variable n_item represents the number of items. It specifies how many individual 
// items or objects are there whose trajectories need to be tracked or calculated.
n_item=6;

// Given that n_item is 6, the variable n_segments_for_items consists of 6 numbers. Each 
// of these numbers represents the total number of segments that make up the trajectory 
// of each corresponding item. For instance, if n_item is 6, there will be 6 values in 
// n_segments_for_items, each specifying the count of trajectory segments for one particular item.
n_segments_for_items=[7, 7, 5, 5, 6, 6]; 

// The variables MOT_segments_x and MOT_segments_y are used to denote the locations of 
// the segments of trajectories. For instance, if there are 7 segments in the first 
// trajectory, there will be 8 x and y coordinates to mark the starting location and 
// the endpoints of the 7 segments, thereby fully outlining the trajectory’s path.
MOT_segments_x=[91.5,93.7,48.4,93.8,40,36,95.9,92.8,
38.8,72.5,34,42.1,87.6,29.8,38.7,75.3,
40.8,68.6,24.6,50.4,47.1,92,
12.2,11.5,31.2,19.2,2,29.4,
84.7,44.5,84.5,13,24.5,29.5,74.2,
34.5,30.1,40.7,88.8,60.9,1.6,62.5];

MOT_segments_y=[5.2,99.7,71.7,76.8,39.2,89.1,60.2,3.4,
23.2,74.3,61.3,55.3,59.6,82.3,48.1,92.4,
46.6,49.4,18.9,83.1,19,50,
64.9,4.3,46.4,84.1,3,52.6,
8.4,31,10.1,67,63.7,87.9,72.3,
46,44.5,1.3,3.6,47,34.6,31.6];

// MOT_segments_curvature is a variable that indicates the curvature of each segment. 
// A value of 0 signifies a straight line segment. A positive value indicates a 
// counter-clockwise curve, with the maximum of 1 representing a counter-clockwise 
// half-circle. Conversely, a value of -1 signifies a clockwise half-circle curve. 
// This allows for the representation of circular trajectories.
MOT_segments_curvature=[0.63,0.95,0.16,0.16,0.85,0.04,0.12,
0.48,0.68,0.27,0.39,0.34,0.77,0.34,
0.22,0.37,0.09,0,0.54,
0.52,0.17,0,0.54,0.58,
0.85,0.06,0.41,0.61,0.49,0.54,
0.97,0.37,0,0,0.7,0.12];

// The MOT_segments_n_frame variable represents the number of frames covered by each 
// segment. This essentially dictates the duration of each segment of the trajectory. 
// The program operates at a 60Hz refresh rate, so a 60-frame segment lasts for one 
// second. This refresh rate is compatible with the display capabilities of most modern 
// cellphones, ensuring smooth visualization.
MOT_segments_n_frame=[77,94,45,102,88,118,76,
60,72,82,66,100,106,114,
155,110,101,118,116,
166,116,112,106,100,
61,109,105,102,103,120,
48,108,105,115,111,113]

// The MOT_frames_x and MOT_frames_y variables are derived from the previously mentioned 
// variables and together, they depict the complete trajectories of each item. Each 
// variable comprises 600 values, corresponding to 600 frames, to represent a 10-second 
// trial. When these frames are observed in sequence, they illustrate the movement of 
// the items over time, effectively portraying the entire trajectory.
MOT_frames_x=Array(600*n_item).fill(0);
MOT_frames_y=Array(600*n_item).fill(0);

				index_segement=0;
				index_segement2=0;
				for (let i_item=0; i_item < n_item; i_item++) {
					accumulated_frames=0;
					for (let i_segment=0; i_segment < n_segments_for_items[i_item]; i_segment++) {
						x1=MOT_segments_x[index_segement2+i_item+i_segment];
						y1=MOT_segments_y[index_segement2+i_item+i_segment];
						x2=MOT_segments_x[index_segement2+i_item+i_segment+1];
						y2=MOT_segments_y[index_segement2+i_item+i_segment+1];
						curvature=MOT_segments_curvature[index_segement2+i_segment];
						n_frames=MOT_segments_n_frame[index_segement2+i_segment];
						MOT_points=getArcPoints(x1,y1,x2,y2,curvature,n_frames);
						for (let i_frame=0; i_frame < n_frames; i_frame++) {
							MOT_frames_x[i_item*600+i_frame+accumulated_frames]=MOT_points[i_frame].x;
							MOT_frames_y[i_item*600+i_frame+accumulated_frames]=MOT_points[i_frame].y;
						}
						accumulated_frames=accumulated_frames+n_frames;
					}
					index_segement=index_segement+n_segments_for_items[i_item]*4+2;
					index_segement2=index_segement2+n_segments_for_items[i_item];
					}
	
	timer_counter=0;
	trialtimerpointer = setInterval(myTimer, 1000/target_refresh_rate);

}

function endofonegame() {
	save_data='';		
					
	if (game_outcome==1) {
		levelupAudio.play();
		supportive_container_app.image_url='https://visualgame.oss-cn-shenzhen.aliyuncs.com/color/success.gif';
		current_level=current_level+1;
				if (current_level>=max_level) {
				current_level=max_level;
				}
		} else {
		crashAudio.play();
		supportive_container_app.image_url='https://visualgame.oss-cn-shenzhen.aliyuncs.com/color/failure.gif';
		current_level=current_level-1;
				if (current_level<=0) {
				current_level=1;
				}
				
				}
				
				current_try=current_try+1;
				
				if (current_try<cutoff_limit) {
				current_average=0;
				}
				
				if (current_try==cutoff_limit) {
				current_average=current_level;
				}
				
				if (current_try>cutoff_limit) {
				average_factor=current_try-cutoff_limit;
				if (average_factor>40) {
				average_factor=40;
				}
				current_average=current_average*average_factor/(average_factor+1)+current_level/(average_factor+1);

		}

	save_parameter=game_mode+'/'+current_level;

	if (debug_mode==0) {
	postData();						
	}
	

	supportive_container_app.show_supportive=true;
	stimuli_container_app.show_trial=false;
	supportive_container_app.show_button=true;
	
}

function myTimer() {
	
timer_counter++;

if (timer_counter==5) {
	for (let i_item=0; i_item < n_item; i_item++) {
	stimuli_container_app.show_item[i_item]=true;
	stimuli_container_app.pics[i_item]=0;
	}
	starttimeread=new Date();
	starttime=starttimeread.getTime();
}

if (timer_counter>=5) {
	
	nowtimeread=new Date();
	nowtime=nowtimeread.getTime();
	
	now_frame=Math.floor((nowtime-starttime)*60/1000);
	if (now_frame>599) {
		now_frame=599;
	}
	for (let i_item=0; i_item < n_item; i_item++) {
	Vue.set(stimuli_container_app.item_left,i_item,MOT_frames_x[now_frame+i_item*600]*chosen_display_width*0.0098 + 'px');
	Vue.set(stimuli_container_app.item_top,i_item,MOT_frames_y[now_frame+i_item*600]*chosen_display_width*0.0098 + 'px');
	}
	
	nowtimeread=new Date();
	nowtime=nowtimeread.getTime();	
	time_spent=nowtime-starttime;
	actual_refresh_rate=1000*(timer_counter-5)/time_spent;
	if (timer_counter % target_refresh_rate==0) {
		stimuli_container_app.game_info_content="actual refresh rate:" + Math.round(actual_refresh_rate);
	}

}


}


function getArcPoints(x1, y1, x2, y2, curvature, n_frames) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  
  const distanceBetweenPoints = Math.sqrt(dx*dx + dy*dy);
  
  if (distanceBetweenPoints==0) {
	curvature=0;
  }



  if (curvature === 0) {  // Handling the straight line case
    return Array.from({ length: (n_frames+1) }, (_, i) => ({
      x: x1 + dx * i / n_frames,
      y: y1 + dy * i / n_frames
    }));
  } else {
  
  if (curvature>0) {
	  curvature_direction=1;
  } else {
	  curvature_direction=-1;
  }

  const angleBetweenPoints = Math.atan2(dy, dx);
  const R = distanceBetweenPoints / Math.abs(curvature)/2;
  const midpoint = { x: (x1 + x2) / 2, y: (y1 + y2) / 2 }; 
  
  const angleToCenter = Math.asin(distanceBetweenPoints / (2 * R));
  
	lateral_move=curvature_direction*Math.sqrt(R*R-(dx*dx+dy*dy)/4);

	
  const centerX = midpoint.x + lateral_move * Math.cos(angleBetweenPoints-Math.PI/2);
  const centerY = midpoint.y + lateral_move * Math.sin(angleBetweenPoints-Math.PI/2);

  const angles = Array.from({ length: (n_frames+1) }, (_, i) => 
    curvature_direction*Math.PI/2 + angleBetweenPoints + curvature_direction*angleToCenter + (-2 * curvature_direction*angleToCenter / n_frames) * i
  );
  
  const points = angles.map(angle => ({
    x: centerX + R * Math.cos(angle),
    y: centerY + R * Math.sin(angle)
  }));

  return points;
  }
}
