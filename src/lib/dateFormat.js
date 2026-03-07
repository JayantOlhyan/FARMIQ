/**
 * Sprint 3 — Indian Date Format (Section 5.5)
 * Formats dates like: "1 दिसंबर 2024, रविवार"
 */

const hindiMonths = [
    "जनवरी", "फरवरी", "मार्च", "अप्रैल", "मई", "जून",
    "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर",
];

const hindiDays = [
    "रविवार", "सोमवार", "मंगलवार", "बुधवार", "गुरुवार", "शुक्रवार", "शनिवार",
];

/**
 * Format a standard Indian date string in Hindi
 * @param {Date} date
 * @returns {string} e.g. "8 मार्च 2026, शनिवार"
 */
export function formatIndianDate(date = new Date()) {
    return `${date.getDate()} ${hindiMonths[date.getMonth()]} ${date.getFullYear()}, ${hindiDays[date.getDay()]}`;
}

/**
 * Short format: "8 मार्च"
 */
export function formatShortDate(date = new Date()) {
    return `${date.getDate()} ${hindiMonths[date.getMonth()]}`;
}

/**
 * Format time in Hindi: "सुबह 6:30" / "दोपहर 2:15" / "शाम 7:00"
 */
export function formatHindiTime(date = new Date()) {
    const hours = date.getHours();
    const mins = date.getMinutes().toString().padStart(2, "0");
    const h12 = hours % 12 || 12;

    let period = "सुबह";
    if (hours >= 12 && hours < 16) period = "दोपहर";
    else if (hours >= 16 && hours < 20) period = "शाम";
    else if (hours >= 20) period = "रात";

    return `${period} ${h12}:${mins}`;
}
