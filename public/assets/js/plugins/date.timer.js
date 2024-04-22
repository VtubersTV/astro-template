class DateTimer {
    constructor() {
      this.updateInterval = 1000; // Update every 1 second
      this.updateElapsedTime(); // Initial update
      console.debug("updateElapsedTime");
      setInterval(() => this.updateElapsedTime(), this.updateInterval);
    }
  
    updateElapsedTime() {
      const dateMadeElements = document.querySelectorAll(".elapsed-time");
  
      dateMadeElements.forEach((dateElement) => {
        const dateString = dateElement.getAttribute("data-date");
        const dateMade = new Date(dateString);
        const currentDate = new Date();
  
        const timeDifference = currentDate.getTime() - dateMade.getTime();
  
        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);
        const months = Math.floor(days / 30);
        const years = Math.floor(days / 365);
  
        const formatTime = (value, unit) =>
          value + ` ${unit}${value > 1 ? "s" : ""} ago`;
  
        if (seconds < 60) {
          dateElement.innerHTML = formatTime(seconds, "second");
        } else if (minutes < 60) {
          dateElement.innerHTML = formatTime(minutes, "minute");
        } else if (hours < 24) {
          dateElement.innerHTML = formatTime(hours, "hour");
        } else if (days === 1) {
          dateElement.innerHTML = `Yesterday`;
        } else if (days < 7) {
          dateElement.innerHTML = formatTime(days, "day");
        } else if (weeks < 4) {
          dateElement.innerHTML = formatTime(weeks, "week");
        } else if (months < 12) {
          dateElement.innerHTML = formatTime(months, "month");
        } else {
          dateElement.innerHTML = formatTime(years, "year");
        }
      });
    }
  }
  
  window.date_timer = new DateTimer();
  