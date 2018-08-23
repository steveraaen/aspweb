import axios from 'axios'
import moment from 'moment'
import aspDays from './asp.js'

var today = moment()
var dowNo = today.day()
var dowAbbr = today.format('ddd').toUpperCase()
var days = ["SUN","MON", "TUE", "WED", "THU", "FRI", "SAT",  ]

  function setDay() {

  		if(days.indexOf(dowNo)) {
  			return dowNo
  		}
  	
	 }


	export default setDay