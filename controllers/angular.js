const request = require('request');
const async = require('async');
const User = require('../models/User');
const Comment = require('../models/Comment');

exports.getItemTemplate = (req, res) => {
  res.render('angular/template/item');
};

exports.getSearchTemplate = (req, res) => {
  res.render('angular/template/search');
};

exports.getSearch = (req, res) => {
	var queryString = `http://www.omdbapi.com/?s=${req.query.s || ''}&page=${req.query.page || 1}`;
	request(queryString, function(err, resp) {
		res.send(resp.body);
	  });
};

exports.getItem = (req, res) => {
	request(`http://www.omdbapi.com/?t=${req.query.t}`, function(err, resp) {
		console.log('resp.body', resp.body);
		res.send(resp.body);
	});
};

exports.addDesired = (req, res) => {
	async.waterfall([
		(callback) => {
			if (req.user && req.body.movie) {
				callback(null);
			} else {
                console.log('user not signed up');
				callback(new Error('user not signed up'));
			}
		},
		(callback) => {
			User.findById(req.user._id).exec((err, user) => {
				if (!user) {
                    console.log('user not found');
					return callback(new Error('user not found'));
				}
				var test = user.desired.some((item) => {
                    console.log(item.Title, req.body.movie.Title);
					return item.Title == req.body.movie.Title;
				});

				if (test) {
                    console.log('already desired');
					return callback(new Error('already desired'));
				}

				user.desired.push(req.body.movie);
				user.save();
				callback();
			});
		}
	], (err) => {
		if (err) {
			return res.send({type: 'error', err});
		}

		res.send({type: 'success'});
	});
};

exports.addComment = (req, res) => {
    var newComment = new Comment({
        movieTitle: req.body.movieTitle,
        text: req.body.text,
        rating: req.body.rating,
        userId: req.user._id
    });
    newComment.save((err) => {
        res.send(err || {
            message: {
                text: 'Success text',
                type: 'success'
            }
        });
    });
};

exports.getComments = (req, res) => {
    Comment.find({movieTitle: req.query.t}).exec((err, docs) => {
        res.send(docs);
    });

};