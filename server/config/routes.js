const authController = require('../controllers/authController');
const projectsController = require('../controllers/projectsController');
const commentsController = require('../controllers/commentsController');


module.exports = (app) => {
    app.use('/api/v1/auth', authController);    
    app.use('/api/v1/projects', projectsController);    
    app.use('/api/v1/comments', commentsController);    
}
