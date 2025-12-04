import multer, { diskStorage } from "multer"

const storage = diskStorage({
    destination: function(req,file,cb){
        cb(null,"./public")
    },
    filename: function(req,file,cb){
        cb(null,`${Date.now()}-${file.originalname}`)
    }
})

export const upload = multer({storage});