
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