const multer = require('multer');

const projectDiskStorage = multer.diskStorage({
    destination: (req, res, cb) => {
        if (!req.session.user) {
            throw "User must be logged in!";
        }
        cb(null, 'project' + req.session.user.id);
    },
    filename: (req, res, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    }
});

const projectFileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'application/step' ||
            file.mimetype === 'application/acad' ||
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg' ||
            file.mimetype === 'application/pdf'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

exports.projectUploadLocal = multer({ storage: projectDiskStorage,
                                      fileFilter: projectFileFilter });
