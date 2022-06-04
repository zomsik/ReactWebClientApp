import { NotificationManager} from 'react-notifications';

export function createNotification (type, title, text) {

    

    switch (type) {
      case 'info':
          return NotificationManager.info(text, title, 1000);
      case 'success':
            return NotificationManager.success(text, title, 1000);
      case 'warning':
          return NotificationManager.warning(text, title, 1000);
      case 'error':
          return NotificationManager.error(text, title, 1000);
        default:
            return ;
    }
}
