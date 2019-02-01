import url_fn from './url_fn/index'
import req_res from './req_res/index'

module.exports = (app) => {
    url_fn(app);
    req_res(app);
}