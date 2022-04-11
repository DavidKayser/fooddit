export function timeConverter(UNIX_timestamp){
    let date = new Date(UNIX_timestamp * 1000);
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    let formatedDate = date.toLocaleString('en-US', options);
    let currentDate = new Date();
    let timeDifference = currentDate.getHours() - date.getHours();
    let hoursOrMinutes = "hours";
    if (timeDifference === 1) {
      hoursOrMinutes = "hour";
    }
    if (timeDifference < 1) {
      timeDifference = currentDate.getMinutes() - date.getMinutes();
      hoursOrMinutes = "minutes";
      if (timeDifference === 1) {
        hoursOrMinutes = "minute";
      }
    }
    if (
      date.getFullYear() === currentDate.getFullYear() &&
      date.getMonth() === currentDate.getMonth() &&
      date.getDate() === currentDate.getDate()
    ) {
      return [`${timeDifference} ${hoursOrMinutes} ago`, formatedDate];
    } else {
      return [formatedDate];
    }

  }