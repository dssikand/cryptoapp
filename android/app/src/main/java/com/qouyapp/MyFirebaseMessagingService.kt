package com.qouyapp

import android.util.Log
import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage

class MyFirebaseMessagingService : FirebaseMessagingService() {

    override fun onMessageReceived(remoteMessage: RemoteMessage) {
        Log.d("MyFirebaseMessaging", "Message received: ${remoteMessage.data}")
    }

    override fun onNewToken(token: String) {
        Log.d("MyFirebaseMessaging", "New FCM Token: $token")
    }
}
