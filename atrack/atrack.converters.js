exports.convert = function () {
	var processData = function (entry) {
		var convertedData = _.clone(entry, true);

		if (convertedData.gps_dtm)
			convertedData.gps_dtm = moment(convertedData.gps_dtm, 'YYYYMMDDHHmmss').toDate();

		if (convertedData.dtm)
			convertedData.dtm = moment(convertedData.dtm, 'YYYYMMDDHHmmss').toDate();

		if (convertedData.position_dtm)
			convertedData.position_dtm = moment(convertedData.position_dtm, 'YYYYMMDDHHmmss').toDate();

		if (convertedData.coordinates[0])
			convertedData.coordinates[0] = parseFloat(convertedData.coordinates[0]);

		if (convertedData.coordinates[1])
			convertedData.coordinates[1] = parseFloat(convertedData.coordinates[1]);

		if (convertedData.heading)
			convertedData.heading = parseInt(convertedData.heading);

		if (convertedData.event_code)
			convertedData.event_code = parseInt(convertedData.event_code);

		if (convertedData.odometer)
			convertedData.odometer = parseInt(convertedData.odometer);

		if (convertedData.gps_hdop)
			convertedData.gps_hdop = parseInt(convertedData.gps_hdop);

		if (convertedData.speed)
			convertedData.speed = parseInt(convertedData.speed);

		delete convertedData.raw_data;
		delete convertedData.raw_data_entry;

		return convertedData;
	};

	var convertedData = _.clone(data, true);

	if (_.isArray(convertedData)) {
		_.each(convertedData, function (dataEntry) {
			processData(dataEntry);
		});
	}
	else
		_.extend(convertedData, processData(convertedData));

	exit(convertedData);
};
