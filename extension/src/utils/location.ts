const options = {
  timeout: 10000
};

export default async function getLocation() {
  if (!navigator) {
    return undefined;
  }

  const fetchLocation = async () =>
    new Promise<GeolocationPosition>((res, rej) => {
      navigator.geolocation.getCurrentPosition(res, rej, options);
    });

  console.time('Geolocation: getCurrentPosition');
  const location = await fetchLocation();
  console.timeEnd('Geolocation: getCurrentPosition');

  const { latitude, longitude } = location.coords;

  return {
    latitude: latitude.toString(),
    longitude: longitude.toString()
  };
}
