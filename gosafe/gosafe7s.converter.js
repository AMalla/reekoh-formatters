exports.convert = function () {
	var processData = function (dataEntry) {
		if (dataEntry.dtm)
			dataEntry.dtm = moment(dataEntry.dtm, 'HHmmssDDMMYY').toDate();

		if (dataEntry.event_id)
			dataEntry.event_id = parseInt(dataEntry.event_id);

		if (dataEntry.satellite_no)
			dataEntry.satellite_no = parseInt(dataEntry.satellite_no);

		if (dataEntry.coordinates[0])
			dataEntry.coordinates[0] = parseFloat(dataEntry.coordinates[0]);

		if (dataEntry.coordinates[1])
			dataEntry.coordinates[1] = parseFloat(dataEntry.coordinates[1]);

		if (dataEntry.speed)
			dataEntry.speed = parseInt(dataEntry.speed);

		if (dataEntry.azimuth)
			dataEntry.azimuth = parseInt(dataEntry.azimuth);

		if (dataEntry.altitude)
			dataEntry.altitude = parseInt(dataEntry.altitude);

		if (dataEntry.hdop)
			dataEntry.hdop = parseFloat(dataEntry.hdop);

		if (dataEntry.vdop)
			dataEntry.vdop = parseFloat(dataEntry.vdop);

		if (dataEntry.reg_status)
			dataEntry.reg_status = parseInt(dataEntry.reg_status);

		if (dataEntry.signal)
			dataEntry.signal = parseInt(dataEntry.signal);

		if (dataEntry.mcc1_ctry)
			dataEntry.mcc1_ctry = parseInt(dataEntry.mcc1_ctry);

		if (dataEntry.mnc1_ntwrk)
			dataEntry.mnc1_ntwrk = parseInt(dataEntry.mnc1_ntwrk);

		if (dataEntry.rsi1_signal)
			dataEntry.rsi1_signal = parseFloat(dataEntry.rsi1_signal);

		if (dataEntry.mcc2_ctry)
			dataEntry.mcc2_ctry = parseInt(dataEntry.mcc2_ctry);

		if (dataEntry.mnc2_ntwrk)
			dataEntry.mnc2_ntwrk = parseInt(dataEntry.mnc2_ntwrk);

		if (dataEntry.rsi2_signal)
			dataEntry.rsi2_signal = parseFloat(dataEntry.rsi2_signal);

		if (dataEntry.mcc3_ctry)
			dataEntry.mcc3_ctry = parseInt(dataEntry.mcc3_ctry);

		if (dataEntry.mnc3_ntwrk)
			dataEntry.mnc3_ntwrk = parseInt(dataEntry.mnc3_ntwrk);

		if (dataEntry.rsi3_signal)
			dataEntry.rsi3_signal = parseFloat(dataEntry.rsi3_signal);

		if (dataEntry.odometer)
			dataEntry.odometer = parseInt(dataEntry.odometer);

		if (dataEntry.ext_pow_volt)
			dataEntry.ext_pow_volt = parseFloat(dataEntry.ext_pow_volt);

		if (dataEntry.bkp_bat_volt)
			dataEntry.bkp_bat_volt = parseFloat(dataEntry.bkp_bat_volt);

		if (dataEntry.dev_status)
			dataEntry.dev_status = parseInt(dataEntry.dev_status);

		if (dataEntry.geo_status1)
			dataEntry.geo_status1 = parseInt(dataEntry.geo_status1);

		if (dataEntry.geo_status2)
			dataEntry.geo_status2 = parseInt(dataEntry.geo_status2);

		if (dataEntry.dtt_event_status)
			dataEntry.dtt_event_status = parseInt(dataEntry.dtt_event_status);

		if (dataEntry.packet_type)
			dataEntry.packet_type = parseInt(dataEntry.packet_type);

		delete dataEntry.raw_data_entry;
		delete dataEntry.raw_data;

		return dataEntry;
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
