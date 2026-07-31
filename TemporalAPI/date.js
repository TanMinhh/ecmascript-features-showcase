import { Temporal } from 'temporal-polyfill';

//Old way to get date
const date = new Date();
const today = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
console.log(today);
//Mutate when add or sub dates
const nextWeek = new Date();
nextWeek.setDate(nextWeek.getDate() + 7);
console.log(nextWeek.to);

//Temporal API
const todayTemp = Temporal.Now.plainDateISO();
const nextWeekTemp = todayTemp.add({ days: 7 });
const preWeekTemp = todayTemp.subtract({ days: 7 });
console.log(todayTemp.toString());
console.log(nextWeekTemp.toString());
console.log(preWeekTemp.toString());
//Duration (days)
const duration = todayTemp.until(nextWeekTemp);
console.log(duration.days);
const months = todayTemp.until(Temporal.PlainDate.from("2027-12-23"));
console.log(months.days);
//Timezone support
const timezoneSeoul = Temporal.ZonedDateTime.from({
    timeZone: "Asia/Seoul",
    year: 2026,
    month: 7,
    day: 31,
    hour: 11,
});
const timezoneHCM = timezoneSeoul.withTimeZone("Asia/Ho_Chi_Minh");
console.log(timezoneSeoul.toString());
console.log(timezoneHCM.toString());