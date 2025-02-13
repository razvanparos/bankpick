import { calculateDaysDifference, formatDateInTwoParts, getToday, nextDay } from '../common/utils.ts';
import {getCurrentUserData, updateUserStatsData} from './usersService.ts'

export const getChartData = async () => {
    let currentUserData: any = await getCurrentUserData();
    let totalBalance = currentUserData[0]?.accountUSD;
    let userChartData = currentUserData[0]?.statsData;
    const daysDiff = calculateDaysDifference(getToday(), userChartData[6].date);
    const slicedData = userChartData?.slice(daysDiff, userChartData.length);
    if (daysDiff > 0) {
      for (let i = 0; i < daysDiff; i++) {
        slicedData.push({
          pv: slicedData[slicedData.length - 1].pv,
          date: nextDay(slicedData[slicedData.length - 1].date),
        });
      }
      updateUserStatsData({
        statsData: slicedData,
      });
    }
    slicedData[6].pv = totalBalance;
  
    let finalChartData = slicedData.map((d) => {
      return { pv: d.pv, date: formatDateInTwoParts(d.date) };
    });
  
    return finalChartData;
  };