export const deviceInfo = () => {
  let browser = "";
  let os = "";
  if (
    (navigator.userAgent.indexOf("Opera") ||
      navigator.userAgent.indexOf("OPR")) != -1
  ) {
    browser = "Opera";
  } else if (navigator.userAgent.indexOf("Edg") != -1) {
    browser = "Edge";
  } else if (navigator.userAgent.indexOf("Chrome") != -1) {
    browser = "Chrome";
  } else if (navigator.userAgent.indexOf("Safari") != -1) {
    browser = "Safari";
  } else if (navigator.userAgent.indexOf("Firefox") != -1) {
    browser = "Firefox";
  } else if (
    navigator.userAgent.indexOf("MSIE") !== -1 ||
    navigator.userAgent.indexOf("Trident") !== -1
  ) {
    browser = "IE";
  } else {
    browser = "unknown";
  }

  if (navigator.userAgent.indexOf("Ubuntu") != -1) {
    os = "Ubuntu";
  } else if (navigator.userAgent.indexOf("Linux") != -1) {
    os = "Linux";
  } else if (navigator.userAgent.indexOf("Mac") != -1) {
    os = "MacOS";
  } else if (navigator.userAgent.indexOf("Windows") != -1) {
    os = "Windows";
  } else {
    os = "unknown";
  }

  return { browser, os };
};
