export function addLeadingZero(val) {
  return val < 10 ? `0${val}` : val;
}

export function getTimerStringFromSeconds(s, supressSeconds = false) {
  let hh = addLeadingZero(~~(s / 3600));
  let mm = addLeadingZero(~~((s % 3600) / 60));
  let ss = addLeadingZero(s % 60);
  return supressSeconds ? `${hh}:${mm}` : `${hh}:${mm}:${ss}`;
}

export function getSeconds(h, m = 0, s = 0) {
  return (h * 60 + m) * 60 + s;
}