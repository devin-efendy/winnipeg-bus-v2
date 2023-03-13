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

  const location = await fetchLocation();

  const { latitude, longitude } = location.coords;

  return {
    latitude: latitude.toString(),
    longitude: longitude.toString()
  };
}
