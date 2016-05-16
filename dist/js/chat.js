/*!
 * Mowe {ProjectName} Project v0.0.0 (http://letsmowe.org/)
 * Copyright 2013-2015 Mowe Developers
 * Licensed under MIT (https://github.com/mowekabanas/base/blob/master/LICENSE)
*/

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

/* ChatInput */

var ChatInput = (function () {

	/**
	 * ChatInput constructor
	 * @constructor
	 */
	function ChatInput(viewport) {

		this.viewport = viewport;

		this.field = new ChatInputField();
		this.submit = new ChatInputSubmit();

		if (this.viewport)
			this.init();

	}

	ChatInput.prototype.normalize = function () {

		this.viewport.appendChild(this.field.viewport);
		this.viewport.appendChild(this.submit.viewport);

	};

	ChatInput.prototype.init = function () {

		this.normalize();

	};

	return ChatInput;

})();

/* Chat Input Field */

var ChatInputField = (function () {

	/**
	 * Chat Input Field constructor
	 * @constructor
	 */
	function ChatInputField(viewport) {

		this.viewport = viewport || this.build();

		this.config = {
			viewportClass: 'ChatInputField'
		};

		this.textarea = false;

		if (this.viewport)
			this.init();

	}

	ChatInputField.prototype.build = function () {

		return document.createElement('div');

	};

	ChatInputField.prototype.buildTextArea = function () {

		var textArea = document.createElement('textarea');
		textArea.placeholder = 'Digite a sua mensagem aqui';

		// add listeners
		textArea.addEventListener('focus', function() {
			textArea.hasFocus = true;
		});

		textArea.addEventListener('blur', function() {
			textArea.hasFocus = false;
		});

		return textArea;

	};

	ChatInputField.prototype.normalize = function () {

		this.viewport.classList.add(this.config.viewportClass);

		// append text area
		this.textarea = this.buildTextArea();
		this.viewport.appendChild(this.textarea);

	};

	ChatInputField.prototype.init = function () {

		this.normalize();

	};

	return ChatInputField;

})();

/* Chat Input Submit */

var ChatInputSubmit = (function () {

	/**
	 * Chat Input Submit constructor
	 * @constructor
	 */
	function ChatInputSubmit(viewport) {

		this.viewport = viewport || this.build();

		this.config = {
			viewportClass: 'ChatInputSubmit'
		};

		this.button = false;

		if (this.viewport)
			this.init();

	}

	ChatInputSubmit.prototype.build = function () {

		return document.createElement('div');

	};

	ChatInputSubmit.prototype.buildButton = function () {

		var button = document.createElement('button');
		button.innerText = 'Enviar';

		return button;

	};

	ChatInputSubmit.prototype.normalize = function () {

		this.viewport.classList.add(this.config.viewportClass);

		this.button = this.buildButton();
		this.viewport.appendChild(this.button);

	};

	ChatInputSubmit.prototype.init = function () {

		this.normalize();

	};

	return ChatInputSubmit;

})();

/* Chat Message Item */

var ChatMessageItem = (function () {

	/**
	 * Chat Message Item constructor
	 * @constructor
	 */
	function ChatMessageItem(id, data) {

		this.id = id;
		this.data = data;

		this.viewport = this.build();

		this.content = false;
		this.sender = false;

		if (this.viewport)
			this.init();

	}

	ChatMessageItem.prototype.build = function () {

		var item = document.createElement('div');
		item.className = 'ChatMessageItem';

		if (this.id)
			item.dataset.messageItemID = this.id;

		return item;

	};

	ChatMessageItem.prototype.buildContent = function () {

		var messageContent = document.createElement('div');
		messageContent.className = 'ChatMessageItem-content';

		var span = document.createElement('span');

		if (this.data)
			span.innerHTML = this.data.value || '';
		else
			span.innerHTML = '';

		messageContent.appendChild(span);

		return messageContent;

	};

	ChatMessageItem.prototype.buildSender = function (data) {

		var messageSender = document.createElement('div');
		messageSender.className = 'ChatMessageItem-sender';

		var img = document.createElement('img');
		messageSender.appendChild(img);

		if (data)
			if (data.profileImageURL)
				img.src = data.profileImageURL;

		return messageSender;

	};

	ChatMessageItem.prototype.updateContent = function () {

		this.content = this.buildContent();
		this.viewport.appendChild(this.content);

	};

	ChatMessageItem.prototype.updateSender = function(data) {

		if (this.sender)
			this.viewport.removeChild(this.sender);

		this.sender = this.buildSender(data);
		this.viewport.appendChild(this.sender);

	};

	ChatMessageItem.prototype.init = function () {

		this.updateContent();
		this.updateSender();

	};

	return ChatMessageItem;

})();

/* Chat Messages */

var ChatMessages = (function () {

	/**
	 * Chat Messages constructor
	 * @constructor
	 */
	function ChatMessages(viewport) {

		this.viewport = viewport;

		this.items = [];

	}

	ChatMessages.prototype.push = function (item) {

		this.items.push(item);

	};

	ChatMessages.prototype.append = function (item) {

		this.viewport.appendChild(item.viewport);

	};

	return ChatMessages;

})();

/* Chat Session */

var ChatSession = (function () {

	/**
	 * Chat Session constructor
	 * @constructor
	 */
	function ChatSession(viewport) {

		this.viewport = viewport;

	}

	return ChatSession;

})();

/* Chat Stage */

var ChatStage = (function () {

	/**
	 * Chat Stage constructor
	 * @constructor
	 */
	function ChatStage(viewport) {

		this.viewport = viewport;

		this.inner = {};

	}

	return ChatStage;

})();

/* Chat Stage Inner */

var ChatStageInner = (function () {

	/**
	 * Chat Stage Inner constructor
	 * @constructor
	 */
	function ChatStageInner(viewport) {

		this.viewport = viewport;

	}

	ChatStageInner.prototype.scrollToEnd = function() {

		this.viewport.scrollTop = this.viewport.scrollHeight;

	};

	return ChatStageInner;

})();