
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