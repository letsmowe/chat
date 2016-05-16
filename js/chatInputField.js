
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