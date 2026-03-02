const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.onNewMessage = functions.firestore
    .document('chats/{chatId}/messages/{msgId}')
    .onCreate(async (snap, ctx) => {
        const msg = snap.data();
        const chatSnap = await admin.firestore().collection('chats').doc(ctx.params.chatId).get();
        const chat = chatSnap.data();
        const recipientId = chat.participants?.find(p => p !== msg.senderId);
        if (!recipientId) return;
        const userSnap = await admin.firestore().collection('users').doc(recipientId).get();
        const token = userSnap.data()?.fcmToken;
        if (!token) return;
        await admin.messaging().send({
            token,
            notification: { title: msg.senderName || 'New Message', body: msg.text || '📎 Media' },
            data: { chatId: ctx.params.chatId }
        });
    });
