export const cleanDateNoTime = (dateObj) => {
    let date = dateObj.toString();
    let month = date.slice(3, 7);
    let day = date.slice(8, 10);
    let day_suffix = "th";
    if (day.charAt(0) !== "1") {
        switch (day.charAt(1)) {
            case "1":
                day_suffix = "st";
            break;
            case "2":
                day_suffix = "nd";
            break;
            case "3":
                day_suffix = "rd";
            break;
            default:
            break;
        }
        if (day.charAt(0) === "0") day = day.charAt(1);
    }
 
    let year = date.slice(10, 15);
    
    return `${month} ${day}${day_suffix}, ${year}`;
};
