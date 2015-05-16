exports.convert = function () {
	var convertedData = _.clone(data, true);

	if (convertedData.dtm)
		convertedData.dtm = moment(convertedData.dtm, 'YYMMDDHHmmss').toDate();

	if (convertedData.event_code)
		convertedData.event_code = parseInt(convertedData.event_code);

	if (convertedData.coordinates[0])
		convertedData.coordinates[0] = parseFloat(convertedData.coordinates[0]);

	if (convertedData.coordinates[1])
		convertedData.coordinates[1] = parseFloat(convertedData.coordinates[1]);

	if (convertedData.satellite_no)
		convertedData.satellite_no = parseInt(convertedData.satellite_no);

	if (convertedData.signal)
		convertedData.signal = parseInt(convertedData.signal);

	if (convertedData.speed)
		convertedData.speed = parseInt(convertedData.speed);

	if (convertedData.direction)
		convertedData.direction = parseInt(convertedData.direction);

	if (convertedData.accuracy)
		convertedData.accuracy = parseInt(convertedData.accuracy);

	if (convertedData.altitude)
		convertedData.altitude = parseInt(convertedData.altitude);

	if (convertedData.mileage)
		convertedData.mileage = parseInt(convertedData.mileage);

	if (convertedData.run_time)
		convertedData.run_time = parseInt(convertedData.run_time);

	if (convertedData.protocol)
		convertedData.protocol = parseInt(convertedData.protocol);

	delete convertedData.raw_data;

	exit(convertedData);
};
