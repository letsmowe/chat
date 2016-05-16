
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