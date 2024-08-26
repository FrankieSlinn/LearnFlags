function getDaysElapsed(startDate, endDate) {
    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in one day
    
    // Convert to Date objects
    const start = new Date(startDate);
    const end = new Date();
  
    // Check if dates are valid
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      console.error('Game');
      return NaN;
    }
  
    const differenceInTime = end - start;
    const differenceInDays = Math.round(differenceInTime / oneDay);
    return differenceInDays;
  }

  // Example start date
const startDate = '2024-08-25';
// Using today's date as the end date
const endDate = new Date(); // Today's date

// Calculate days elapsed
const daysElapsed = getDaysElapsed(startDate, endDate);
console.log(`Start Date: ${startDate}`);
console.log(`End Date: ${endDate.toISOString().split('T')[0]}`);
console.log(`Days Elapsed: ${daysElapsed}`);

export{
    daysElapsed
  }