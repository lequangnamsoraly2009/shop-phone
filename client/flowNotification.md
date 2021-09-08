# Flow Send Notification And Cases

## Notification Model

### Notification Model Of User

    ```js
        notificationModelOfUser = {
            notification: String,
            contentNotification: String,
            userSend: Object,
            typeNotification: String,
            hasSeen: Boolean,
        }
    ```

### Notification Model Of Admin

    ```js
        notificationModelOfAdmin = {
            notification: String,
            contentNotification: String,
            userSend: Object,
            typeNotification: String,
            hasSeen: Boolean,
        }
    ```

### Cases 

    - Accept or Reject Payment 
    - Change Type User -> Send Notification
    - Comment Review 
    - Reply Review
    - Accept or Reject Question
    - Reply Question
    - .....