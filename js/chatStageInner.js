
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