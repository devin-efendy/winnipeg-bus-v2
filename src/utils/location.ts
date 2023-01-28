const options = {
  timeout: 10000,
};

export default function getCurrentPosition(success, error) {
  if (navigator) {
    navigator.geolocation.getCurrentPosition(success, error, options);
  }
}
