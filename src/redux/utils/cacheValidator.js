const today = new Date();

export const dateTime = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}:${today.getHours() < 10 ? `0${today.getHours()}` : today.getHours()}-${today.getMinutes() < 10 ? `0${today.getMinutes()}` : today.getMinutes()}-${today.getSeconds() < 10 ? `0${today.getSeconds()}` : today.getSeconds()}`;

export const validateCache = () => {
  const curr_y = today.getFullYear();
  const curr_mon = today.getMonth() + 1;
  const curr_d = today.getDate();
  const curr_h = today.getHours();
  const curr_min = today.getMinutes();

  const cache = localStorage.getItem('eb-cache-updated');

  if (cache != null) {
    const cache_date = cache.split(':')[0].split('-');
    const cache_time = cache.split(':')[1].split('-');

    const cache_y = parseInt(cache_date[0], 10) || -1;
    const cache_mon = parseInt(cache_date[1], 10) || -1;
    const cache_d = parseInt(cache_date[2], 10) || -1;
    const cache_h = parseInt(cache_time[0], 10) || -1;
    const cache_min = parseInt(cache_time[1], 10) || -1;

    let lessThanTwenty;
    if (curr_h === cache_h) {
      lessThanTwenty = ((curr_min - 20) <= cache_min);
    } else if (curr_h - 1 === cache_h) {
      let diff;
      if (curr_min - 30 < 0) {
        diff = 60 - Math.abs(curr_min - 30);
        lessThanTwenty = (diff <= cache_min);
      } else {
        lessThanTwenty = ((curr_min - 20) <= cache_min);
      }
    } else {
      lessThanTwenty = false;
    }
    return (curr_y === cache_y && curr_mon === cache_mon && curr_d === cache_d && lessThanTwenty);
  }
  return false;
};
