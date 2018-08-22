var signs = require("./models/AllSigns.js");
const moment = require('moment')

module.exports = function(app) {



    app.get("/mon/:coordinates?", function(req, res) {
    	console.log(req.query)
        
        if(req.query.day) {
          var today = req.query.day  
        } else {
    var addDays = 2
    var today = moment().format("dddd").toUpperCase().substring(0, 3)            
    var tPlus = moment().add(addDays, 'days').format("dddd").toUpperCase().substring(0, 3)            
}

   console.log(today)
   console.log(tPlus)
        var lat = parseFloat(req.query.coordinates[1]).toFixed(6)
        var lng = parseFloat(req.query.coordinates[0]).toFixed(6)
       
        var rte = new RegExp(".*^" + today + ".*")
        signs.find({
            "properties.T": rte,
            geometry: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [lng, lat]
                    },
                    $maxDistance: 5000 * 1.60934
                }
            }
        }, function(error, doc) {
            if (error) {
                console.log(error);
            } else {             
                res.json(doc);
            }
        }).limit(10000);
});
        const middleWare = async (req, res, next) => {
    const data = await middleWareZ(endpoint)
    req.data = data.json()
    next()
    }
 }