const addBlog = require('./addBlog/index');
const removeBlog = require('./removeBlog/index');
const removeuser = require('./removeuser/index');
const removeClass = require('./removeClass/index');
const updataBlog = require('./updataBlog/index');
// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'addBlog':
      return await addBlog.main(event, context);
    case 'removeBlog':
      return await removeBlog.main(event, context);
      case 'removeuser':
        return await removeuser.main(event, context);
        case 'removeClass':
          return await removeClass.main(event, context);
          case 'updataBlog':
          return await updataBlog.main(event, context);
  }
};