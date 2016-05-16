
/* Chat */

var Chat = (function () {

	/**
	 * Chat constructor
	 * @constructor
	 */
	function Chat(viewport) {

		var self = this;

		this.viewport = viewport;

		this.data = {};
		this.users = {};
		this.messages = {};

		this.shiftActive = false;

		this.goOnline = function (authData) {

			console.log("User " + authData.uid + " is logged in with " + authData.provider);
			chat.data.child("users").child(authData.uid).set(authData.facebook);
			userRef = chat.data.child('users/' + authData.uid);
			chat.viewport.classList.add('is-online');

			chat.session.viewport.innerHTML = 'você está online';

			chat.session.user = authData;

		};

		this.goOffline = function (authData) {

			console.log("User is logged out");
			chat.viewport.classList.remove('is-online');
			chat.session.viewport.innerHTML = 'você está offline';

			chat.session.user = false;

		};

		this.onSubmitClick = function () {

			self.sendMessage();

		};

		this.onKeyDown = function (event) {

			if (event.keyCode == 16)
				self.shiftActive = true;

			if (event.keyCode == 13)
				if (!self.shiftActive)
					if (chat.input.field.textarea.hasFocus) {
						self.sendMessage();
						setTimeout(function () {
							self.input.field.textarea.value = '';
						}, 0);
					}

		};

		this.onKeyUp = function (event) {

			if (event.keyCode == 16)
				self.shiftActive = false;

		};

	}

	Chat.prototype.doBeep = function () {

		if (this.audio) {

			// stop audio
			chat.audio.pause();
			chat.audio.currentTime = 0;

			// play audio
			chat.audio.play();

		}

	};

	Chat.prototype.sendMessage = function () {

		var value = chat.input.field.textarea.value.trim();

		if (value.length && value.length < 1024) {

			// create push
			var newMessage = this.messages.data.push();

			// set the push value
			newMessage.set({
				value: value,
				user: chat.session.user.uid || false
			});

			// set text area value to empty
			chat.input.field.textarea.value = '';
			chat.input.field.textarea.focus();

		}

	};

	Chat.prototype.addListeners = function () {

		this.input.submit.button.addEventListener('click', this.onSubmitClick);

		window.addEventListener('keydown', this.onKeyDown);
		window.addEventListener('keyup', this.onKeyUp);

	};

	Chat.prototype.init = function () {

		this.addListeners();

	};

	return Chat;

})();