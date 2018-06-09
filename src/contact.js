'use strict';

var nodemailer = require('nodemailer');

var logger = requireRoot('./helpers/logger');

module.exports = function(opts) {
	opts.method = opts.method || 'post';
	opts.path = opts.path || 'post';
	if(!opts.mailFrom) throw 'mailFrom not defined!!!';

	return function(req, res, next) {
		if (req.method !== opts.method || req.originalUrl !== opts.path) return next();

		var errList = [];
		if (!req.body.email || !validateEmail(req.body.email)) errList.push('Email is not valid!');
		if (!req.body.message) errList.push('Message is required!');

		if (errList.length > 0) {
			res.send(errList.join('\n'));
		}

		var transporter = nodemailer.createTransport({
			transport: 'smtp',
			host: global.appConfig.SMTP.host, // hostname
			secure: global.appConfig.SMTP.secure, // use SSL
			port: global.appConfig.SMTP.port, // port for secure SMTP
			auth: {
				user: global.appConfig.SMTP.user,
				pass: global.appConfig.SMTP.pass
			},
			tls: {
				rejectUnauthorized: false
				//ciphers: "SSLv2"
			}
		});
		var mailOptions = {
			from: '"CreativeCLR Contact" <contact@creativeclr.com>', // sender address
			to: 'raul@creativeclr.com', // list of receivers
			replyTo: req.body.email,
			subject: 'Contact message from ' + req.body.email, // Subject line
			text: req.body.message // plaintext body
		};

		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				return logger.error(error);
			}
			logger.log('Message sent: ', info.response);
			res.redirect('/contact?sent=1');
		});


		function validateEmail(email) {
			var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(email);
		}
	};
};
