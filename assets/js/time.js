document.addEventListener("DOMContentLoaded", function() {
    function formatDate(date) {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const year = date.getFullYear();
        
        const strTime = `${month}/${day}/${year} ${hours}:${minutes}:${seconds} ${ampm}`;
        return strTime;
    }

    function updateDateTime() {
        const now = new Date();
        document.querySelector('.today-date').innerText = formatDate(now);
    }

    updateDateTime();
    setInterval(updateDateTime, 1000); // Update every second
});

