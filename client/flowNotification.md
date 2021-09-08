# Flow Send Notification And Cases

## Notification Model

### Notification Model Of User

    ```JavaScript
        notificationModelOfUser = {
            notification: String,
            content: String,
            userSend: Object,
            typeNotification: String,
            hasSeen: Boolean,
        }
    ```

### Notification Model Of Admin

    ```JavaScript
        notificationModelOfAdmin = {
            notification: String,
            content: String,
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