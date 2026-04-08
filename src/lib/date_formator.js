export const dateFormater = (dateInput, formatType = "DD Mon YYYY") => {
  let date;

  if (typeof dateInput === "number" && String(dateInput).length === 10) {
    date = new Date(dateInput * 1000);
  } else {
    date = new Date(dateInput);
  }

  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  switch (formatType) {
    case "YYYY-MM-DD": {
      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, "0");
      const day = String(date.getUTCDate()).padStart(2, "0");
      return `${year}-${month}-${day}`; // For "2025-10-13T20:59:04.370Z"
    }

    case "DD Mon YYYY": {
      const day = date.getUTCDate();
      const year = date.getUTCFullYear();
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const month = monthNames[date.getUTCMonth()];
      return `${day} ${month} ${year}`; // For "2025-10-13T20:59:04.370Z"
    }

    case "Month D, YYYY": {
      const day = date.getUTCDate();
      const year = date.getUTCFullYear();
      const month = date.toLocaleString("en-US", {
        month: "long",
        timeZone: "UTC",
      });
      return `${month} ${day}, ${year}`; // For "2025-10-13T20:59:04.370Z"
    }

    case "Full": {
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
      }); // For "2025-10-13T20:59:04.370Z"
    }

    case "DateTime": {
      const datePart = date.toLocaleDateString("en-GB", { timeZone: "UTC" });
      const timePart = date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: "UTC",
      });
      return `${datePart}, ${timePart}`; // For "2025-10-13T20:59:04.370Z"
    }

    case "Short": {
      return date.toLocaleDateString("en-GB", { timeZone: "UTC" }); // For "2025-10-13T20:59:04.370Z"
    }

    default:
      return date.toDateString();
  }
};

export function formatIndianAmount(amount) {
  return Number(amount || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
