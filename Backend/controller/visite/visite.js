const Response = require('../../helper/errHandler')
const Visit = require('../../models/visit')

const createVisit = async (req, res) => {
  try {
    const visit = new Visit({ timestamp: new Date() });
    await visit.save();
    return Response.Success({
      res,
      status: 201,
      message: "Visit created successfully",
      data: visit
    });
  } catch (error) {
    return Response.Error({
      res,
      status: 500,
      message: error.stack
    });
  }
}
const getVisitsByDay = async (req, res) => {
  try {
    const now = new Date();

    // Start of current week (Sunday)
    const startOfWeek = new Date(now);
    startOfWeek.setHours(0, 0, 0, 0);
    startOfWeek.setDate(now.getDate() - now.getDay());

    // End of current week (Saturday 23:59:59)
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    // Start and end of last week
    const startOfLastWeek = new Date(startOfWeek);
    startOfLastWeek.setDate(startOfWeek.getDate() - 7);

    const endOfLastWeek = new Date(endOfWeek);
    endOfLastWeek.setDate(endOfWeek.getDate() - 7);

    // Weekly visits this week
    const weeklyVisits = await Visit.find({
      timestamp: {
        $gte: startOfWeek,
        $lte: endOfWeek,
      }
    });

    // Weekly visits last week
    const lastWeekVisits = await Visit.find({
      timestamp: {
        $gte: startOfLastWeek,
        $lte: endOfLastWeek,
      }
    });

    // Total visits (all time)
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    startOfLastMonth.setHours(0, 0, 0, 0);

    // Today (end boundary)
    const endDate = new Date(); // defaults to current time

    const totalThisMonth = await Visit.countDocuments({
      timestamp: {
        $gte: startOfLastMonth,
        $lte: endDate,
      },
    });
    // Initialize counts for this week and last week
    const counts = { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 };
    const lastWeekCounts = { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 };

    // Count visits by day this week
    weeklyVisits.forEach(v => {
      const day = new Date(v.timestamp).toLocaleDateString('en-US', { weekday: 'short' });
      if (counts[day] !== undefined) counts[day]++;
    });

    // Count visits by day last week
    lastWeekVisits.forEach(v => {
      const day = new Date(v.timestamp).toLocaleDateString('en-US', { weekday: 'short' });
      if (lastWeekCounts[day] !== undefined) lastWeekCounts[day]++;
    });

    const totalWeek = Object.values(counts).reduce((a, b) => a + b, 0);
    const totalLastWeek = Object.values(lastWeekCounts).reduce((a, b) => a + b, 0);

    return Response.Success({
      res,
      status: 200,
      message: "Visits grouped by day for this week and last week",
      data: {
        daily: counts,
        lastWeek: lastWeekCounts,
        totalWeek,
        totalLastWeek,
        totalThisMonth
      }
    });

  } catch (error) {
    return Response.Error({
      res,
      status: 500,
      message: "Failed to fetch visits",
      error: error.stack
    });
  }
};




module.exports = { createVisit, getVisitsByDay };