const Message = require("../models/Message");
const User = require("../models/User");
const { id, now } = require("../utils/helpers");

function list(q, u) {
  let items = Message.all().filter(
    (x) => x.senderId === u.id || x.receiverId === u.id,
  );

  const conversationId = q.conversationId || q.userId || q.recipientId;
  if (conversationId) {
    items = items.filter(
      (x) => x.senderId === conversationId || x.receiverId === conversationId,
    );
  }

  return items
    .sort((x, y) => new Date(x.createdAt) - new Date(y.createdAt))
    .map((message) => ({
      ...message,
      content: message.content || message.text || "",
      message: message.message || message.text || message.content || "",
      isMine: message.senderId === u.id,
      sender: User.findById(message.senderId)
        ? {
            id: User.findById(message.senderId).id,
            name: User.findById(message.senderId).name,
            email: User.findById(message.senderId).email,
            avatar: User.findById(message.senderId).avatar,
          }
        : null,
    }));
}

function conversations(u) {
  const map = new Map();

  for (const message of Message.all().filter(
    (x) => x.senderId === u.id || x.receiverId === u.id,
  )) {
    const otherUserId =
      message.senderId === u.id ? message.receiverId : message.senderId;
    const old = map.get(otherUserId);

    if (
      !old ||
      new Date(message.createdAt) > new Date(old.lastMessage.createdAt)
    ) {
      map.set(otherUserId, {
        id: otherUserId,
        conversationId: otherUserId,
        userId: otherUserId,
        otherUserId,
        otherUser: User.findById(otherUserId) || null,
        lastMessage: {
          ...message,
          content: message.content || message.text || "",
          message: message.message || message.text || message.content || "",
        },
        unreadCount: Message.all().filter(
          (item) =>
            item.senderId === otherUserId &&
            item.receiverId === u.id &&
            item.read !== true,
        ).length,
      });
    }
  }

  return [...map.values()].sort(
    (a, b) =>
      new Date(b.lastMessage.createdAt) -
      new Date(a.lastMessage.createdAt),
  );
}

function get(i, u) {
  const message = Message.findById(i);
  if (
    !message ||
    (message.senderId !== u.id && message.receiverId !== u.id)
  ) {
    throw Object.assign(new Error("Message not found"), { status: 404 });
  }
  return message;
}

function create(b, u) {
  const receiverId = b.receiverId || b.recipientId;
  const text = b.text || b.content || b.message;

  if (!receiverId || !text) {
    throw Object.assign(
      new Error("receiverId and text are required"),
      { status: 400 },
    );
  }

  const message = Message.create({
    id: id(),
    senderId: u.id,
    receiverId,
    projectId: b.projectId || null,
    text,
    content: text,
    attachments: b.attachments || [],
    read: false,
    createdAt: now(),
    updatedAt: now(),
  });

  return {
    ...message,
    content: text,
    message: text,
    isMine: true,
  };
}

function update(i, b, u) {
  const message = get(i, u);
  if (message.senderId !== u.id) {
    throw Object.assign(new Error("Only the sender can edit a message"), {
      status: 403,
    });
  }

  const text = b.text || b.content || b.message || "";
  return Message.update(i, {
    text,
    content: text,
    updatedAt: now(),
  });
}

function remove(i, u) {
  const message = get(i, u);
  if (message.senderId !== u.id) {
    throw Object.assign(new Error("Only the sender can delete a message"), {
      status: 403,
    });
  }
  Message.delete(i);
}

function markRead(i, u) {
  const message = get(i, u);
  if (message.receiverId !== u.id) {
    throw Object.assign(new Error("Not allowed"), { status: 403 });
  }
  return Message.update(i, { read: true, updatedAt: now() });
}

module.exports = {
  list,
  conversations,
  get,
  create,
  update,
  remove,
  markRead,
};
