export interface Forum {
    message_body: string;
    recipient: string;
}


export interface Notification {
  notification_text: string;
  notification_links: string;
  start_time: string;
  end_time: string;
  severity: number;
  visibility: boolean;
  // archived: boolean;
}
