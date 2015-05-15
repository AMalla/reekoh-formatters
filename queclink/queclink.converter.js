exports.convert = function () {
	var convertedData = _.clone(data, true);

	if (convertedData.dtm)
		convertedData.dtm = moment(convertedData.dtm, 'YYYYMMDDHHmmss').toDate();

	if (convertedData.number)
		convertedData.number = parseInt(convertedData.number);

	if (convertedData.accuracy)
		convertedData.accuracy = parseInt(convertedData.accuracy);

	if (convertedData.speed)
		convertedData.speed = parseInt(convertedData.speed);

	if (convertedData.azimuth)
		convertedData.azimuth = parseInt(convertedData.azimuth);

	if (convertedData.altitude)
		convertedData.altitude = parseInt(convertedData.altitude);

	if (convertedData.coordinates[0])
		convertedData.coordinates[0] = parseFloat(convertedData.coordinates[0]);

	if (convertedData.coordinates[1])
		convertedData.coordinates[1] = parseFloat(convertedData.coordinates[1]);

	if (convertedData.gps_utc_time)
		convertedData.gps_utc_time = moment(convertedData.gps_utc_time, 'YYYYMMDDHHmmss').toDate();

	if (convertedData.mileage)
		convertedData.mileage = parseInt(convertedData.mileage);

	delete convertedData.raw_data;

	exit(convertedData);
};
