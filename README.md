# MOTjs

Code was started by Liqiang by stripping away a bunch of the functionality he uses. 

This code does not include a bunch of stuff related to server-side things that Liqiang uses to run interactive experiments with WeChat.

## Initial message from Liqiang

For an insight into the implementation, open the file MOT\scripts\mainprogram.js and refer to lines 89-172. The trajectories are defined by several variables (n_item, n_segments_for_items, MOT_segments_x, MOT_segments_y, MOT_segments_curvature, MOT_segments_n_frame). If you're able to easily figure this out, kindly send me a list of (perhaps 10,000?) trajectories that cover the aspects you want to study. I will then organize them into a database for use in the experiment.

## Changes to be made relative to Daan's CSS animation program (the code for which is not here, but it may be running [here](https://experiments.psychsydexp.net/s_test/spinning_speed_test/))

-Needs to look pretty smooth at 1.6 rps with 2 targets and 3 objects per ring
-Have continuously updating fps readout for purposes of getting things working

-Record the min, max, and median fps and spit it out somewhere
- Dramatically increase spacing among rings so no spatial crowding
-Max ring radius is capped at 100, that’s not enough
-Would blurring the segments help?

11th of october and 19th July and 5th July