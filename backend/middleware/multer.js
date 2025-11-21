import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'uploads/') // Ensure 'uploads' folder exists in root!
    },
    filename: function (req, file, callback) {
        callback(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

export default upload;