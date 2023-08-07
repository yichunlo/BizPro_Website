const Alumni = require('../models/alumni');

const articleQuery = (req) => {
    let search_all_major = false;
    let search_all_tags = false;
    if (req.body.major.length === 0) search_all_major = true;
    if (req.body.tags.length === 0) search_all_tags = true;
    console.log('search all major:', search_all_major);
    console.log('search all tags:', search_all_tags);

    let query = {};
    if (search_all_major && search_all_tags) query = {};
    else if (search_all_major) query = {tags: {$in: req.body.tags}};
    else if (search_all_tags) query = {major: {$in: req.body.major}};
    else {
      query = {
        major: {$in: req.body.major}, 
        tags: {$in: req.body.tags}
      };
    }
    
    return query;
};

module.exports = articleQuery;