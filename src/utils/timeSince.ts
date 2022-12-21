export default function timeSince(date: Date) {
  let dt = new Date()
  let offset = dt.getTimezoneOffset();
  let utc_timestamp = dt.setMinutes( dt.getMinutes() + offset );

  var seconds = Math.floor((utc_timestamp - date.getTime()) / 1000);

  var interval = Math.floor(seconds / 31536000);

  if (interval >= 1) {
      if (interval === 1) {
          return interval + " year ago";
      } else {
          return interval + " years ago";
      }
  }
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
      if (interval === 1) {
          return interval + " month ago";
      } else {
          return interval + " months ago";
      }
  }
  interval = Math.floor(seconds / 604800);
  if (interval >= 1) {
      if (interval === 1) {
          return interval + " week ago";
      } else {
          return interval + " weeks ago"
      }
  }
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
      if (interval === 1) {
          return interval + " day ago";
      } else {
          return interval + " days ago";
      }
  }
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
      if (interval === 1) {
          return interval + " hour ago";
      } else {
          return interval + " hours ago";
      }
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
      if (interval === 1) {
          return interval + " minute ago";
      } else {
          return interval + " minutes ago";
      }
  }
  if (seconds > 0) {
      return Math.floor(seconds) + " seconds ago";
  } else {
      return "";
  }
}