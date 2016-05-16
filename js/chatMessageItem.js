
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