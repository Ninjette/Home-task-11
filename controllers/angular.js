const request = require('request');
const async = require('async');
const User = require('../models/User');

exports.getItemTemplate = (req, res) => {
  res.render('angular/template/item');
};

exports.getSearchTemplate = (req, res) => {
  res.render('angular/template/search');
};

exports.getSearch = (req, res) => {
	let queryString = `http://www.omdbapi.com/?s=${req.query.s || ''}&page=${req.query.page || 1}`;
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
				callback(new Error('user not signed up'));
			}
		},
		(callback) => {
			User.findById(req.user._id).exec((err, user) => {
				if (!user) {
					return callback(new Error('user not found'));
				}
				var test = user.desired.some((err, item) => {
					return item.title == req.body.movie.title;
				});

				if (test) {
					return callback(new Error('already desired'));
				}

				user.desired.push(req.body.movie);
				user.save();
				callback();
			});
		},
		(callback) => {

		}
	], (err) => {
		if (err) {
			return res.send({type: 'error', err});
		}

		res.send({type: 'success'});
	});
};