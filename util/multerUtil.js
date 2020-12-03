const path = require('path');
const fs = require('fs');
const multer = require('multer');

const projectDiskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (!req.session.user) {
            throw "User must be logged in!";
        }

        // We need to make sure the upload directory exists.
        // After that, we need to create a user specific directory
        // for their project files if it doesn't exist based on
        // their id in the database. The database should keep
        // track of which files belong to what project.
        try {
            //This fs.mkdirSync function should only run once.
            if (!fs.existsSync('project')) {
                fs.mkdirSync('project');
            }

            //Check if user-specific folder exists, create it if it doesnt.
            if (!fs.existsSync('project/' + req.session.user._id)) {
                //Async function to create folder.
                fs.mkdir('project/' + req.session.user._id, (err) => {
                    if (err) {
                        return console.error(err);
                    }
                    cb(null, 'project/' + req.session.user._id);
                });

            } else {
                cb(null, 'project/' + req.session.user._id);
            }

        } catch (err){
            console.error('Files/Folders Could Not be Created:\n' + err);
        }

    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '--' + file.originalname);
    }
});

const projectFileFilter = (req, file, cb) => {
    let ext = path.extname(file.originalname);
        if ( ext === '.png' ||
             ext === '.jpeg' ||
             ext === '.jpg' ||
             ext === '.obj' ||
             ext === '.step' ||
             ext === '.stp' ||
             ext === '.blend' ||
             ext === '.FCStd' ||
             ext === '.stl' ||
             ext === '.dxf'
           ) {
            cb(null, true);
        } else {
            cb(null, false);
        }
}

exports.projectUploadLocal = multer({ storage: projectDiskStorage,
                                      fileFilter: projectFileFilter });
