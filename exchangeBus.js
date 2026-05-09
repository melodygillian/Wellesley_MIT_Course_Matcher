// Wellesley-MIT Exchange Bus Schedule
// Source: Wellesley Website
// by Melody Lyu, April 29, 2026

const exchangeBus = [
  {bus: "B", stopTimes: {
    "Chapel_out":"7:15 am", "Alumnae_out":"7:20 am",
    "350 Mass Ave.":"8:05 am", "Vassar St., Bldg 34":"8:10 am",
    "Kendall Sq. T Stop":"8:15 am", "77 Mass Ave.":"8:20 am", "Marlboro Market":"8:25 am",
    "Alumnae_in":"9:15 am", "Chapel_in":"9:20 am"
  }},
  {bus: "A", stopTimes: {
    "Chapel_out":"9:00 am", "Alumnae_out":"9:05 am",
    "350 Mass Ave.":"9:50 am", "Vassar St., Bldg 34":"9:55 am",
    "Kendall Sq. T Stop":"10:00 am", "77 Mass Ave.":"10:05 am", "Marlboro Market":"10:10 am",
    "Alumnae_in":"11:00 am", "Chapel_in":"11:05 am"
  }},
  {bus: "B", stopTimes: {
    "Chapel_out":"10:30 am", "Alumnae_out":"10:35 am",
    "350 Mass Ave.":"11:20 am", "Vassar St., Bldg 34":"11:25 am",
    "Kendall Sq. T Stop":"11:30 am", "77 Mass Ave.":"11:35 am", "Marlboro Market":"11:40 am",
    "Alumnae_in":"12:30 pm", "Chapel_in":"12:35 pm"
  }},
  {bus: "A", stopTimes: {
    "Chapel_out":"11:30 am", "Alumnae_out":"11:35 am",
    "350 Mass Ave.":"12:20 pm", "Vassar St., Bldg 34":"12:25 pm",
    "Kendall Sq. T Stop":"12:30 pm", "77 Mass Ave.":"12:35 pm", "Marlboro Market":"12:40 pm",
    "Alumnae_in":"1:35 pm", "Chapel_in":"1:40 pm"
  }},
  {bus: "C", stopTimes: {
    "Chapel_out":"12:40 pm", "Alumnae_out":"12:45 pm",
    "350 Mass Ave.":"1:20 pm", "Vassar St., Bldg 34":"1:25 pm",
    "Kendall Sq. T Stop":"1:30 pm", "77 Mass Ave.":"1:35 pm", "Marlboro Market":"1:40 pm",
    "Alumnae_in":"2:30 pm", "Chapel_in":"2:35 pm"
  }},
  {bus: "B", stopTimes: {
    "Chapel_out":"1:30 pm", "Alumnae_out":"1:35 pm",
    "350 Mass Ave.":"2:20 pm", "Vassar St., Bldg 34":"2:25 pm",
    "Kendall Sq. T Stop":"2:30 pm", "77 Mass Ave.":"2:35 pm", "Marlboro Market":"2:40 pm",
    "Alumnae_in":"3:30 pm", "Chapel_in":"3:35 pm"
  }},
  {bus: "A", stopTimes: {
    "Chapel_out":"2:30 pm", "Alumnae_out":"2:35 pm",
    "350 Mass Ave.":"3:20 pm", "Vassar St., Bldg 34":"3:25 pm",
    "Kendall Sq. T Stop":"3:30 pm", "77 Mass Ave.":"3:35 pm", "Marlboro Market":"3:40 pm",
    "Alumnae_in":"4:30 pm", "Chapel_in":"4:35 pm"
  }},
  {bus: "C", stopTimes: {
    "Chapel_out":"3:30 pm", "Alumnae_out":"3:35 pm",
    "350 Mass Ave.":"4:20 pm", "Vassar St., Bldg 34":"4:25 pm",
    "Kendall Sq. T Stop":"4:30 pm", "77 Mass Ave.":"4:35 pm", "Marlboro Market":"4:40 pm",
    "Alumnae_in":"5:30 pm", "Chapel_in":"5:35 pm"
  }},
  {bus: "B", stopTimes: {
    "Chapel_out":"4:30 pm", "Alumnae_out":"4:35 pm",
    "350 Mass Ave.":"5:20 pm", "Vassar St., Bldg 34":"5:25 pm",
    "Kendall Sq. T Stop":"5:30 pm", "77 Mass Ave.":"5:35 pm", "Marlboro Market":"5:40 pm",
    "Alumnae_in":"6:30 pm", "Chapel_in":"6:35 pm"
  }},
  {bus: "A", stopTimes: {
    "Chapel_out":"5:30 pm", "Alumnae_out":"5:35 pm",
    "350 Mass Ave.":"6:20 pm", "Vassar St., Bldg 34":"6:25 pm",
    "Kendall Sq. T Stop":"6:30 pm", "77 Mass Ave.":"6:35 pm", "Marlboro Market":"6:40 pm",
    "Alumnae_in":"7:30 pm", "Chapel_in":"7:35 pm"
  }},
  {bus: "C", stopTimes: {
    "Chapel_out":"6:00 pm", "Alumnae_out":"6:05 pm",
    "350 Mass Ave.":"6:50 pm", "Vassar St., Bldg 34":"6:55 pm",
    "Kendall Sq. T Stop":"7:00 pm", "77 Mass Ave.":"7:05 pm", "Marlboro Market":"7:10 pm",
    "Alumnae_in":"8:00 pm", "Chapel_in":"8:05 pm"
  }},
  {bus: "B", stopTimes: {
    "Chapel_out":"7:00 pm", "Alumnae_out":"7:05 pm",
    "350 Mass Ave.":"7:50 pm", "Vassar St., Bldg 34":"7:55 pm",
    "Kendall Sq. T Stop":"8:00 pm", "77 Mass Ave.":"8:05 pm", "Marlboro Market":"8:10 pm",
    "Alumnae_in":"9:00 pm", "Chapel_in":"9:05 pm"
  }},
  {bus: "A", stopTimes: {
    "Chapel_out":"8:00 pm", "Alumnae_out":"8:05 pm",
    "350 Mass Ave.":"8:50 pm", "Vassar St., Bldg 34":"8:55 pm",
    "Kendall Sq. T Stop":"9:00 pm", "77 Mass Ave.":"9:05 pm", "Marlboro Market":"9:10 pm",
    "Alumnae_in":"10:00 pm", "Chapel_in":"10:05 pm"
  }},
  {bus: "C", stopTimes: {
    "Chapel_out":"9:00 pm", "Alumnae_out":"9:05 pm",
    "350 Mass Ave.":"9:50 pm", "Vassar St., Bldg 34":"9:55 pm",
    "Kendall Sq. T Stop":"10:00 pm", "77 Mass Ave.":"10:05 pm", "Marlboro Market":"10:10 pm",
    "Alumnae_in":"11:00 pm", "Chapel_in":"11:05 pm"
  }},
];
