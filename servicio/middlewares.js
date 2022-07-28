const middlewareLog = {
    estaLogeado: function(req,res,next){
        console.log(req.session.name)
        if(req.isAuthenticated()){
            //req.isAuthenticated() will return true if user is logged in
            next()}
        else{
            res.json({status: "error", msg:"usuario sin logear"})
        }
        
    },
    destruirSesion: function(req,res,next){
        console.log(req.session.name)
        if(req.isAuthenticated()){
            req.logout( function(err) {
                if (err) { return next(err)}})
            next()}
        else{
            res.json({status: "error", msg:"usuario sin logear"})
        }
        
    }
}

export {middlewareLog}