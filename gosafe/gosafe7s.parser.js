module.exports = function (rawData) {
	try {
		var data = {
			is_data: true
		};

		if (!/^\*GS/.test(rawData))
			return new Error('Invalid Data', 'INVALID_DATA');

		rawData = rawData.substr(0, rawData.length - 1); //remove packet tail

		var parsedData = rawData.split(',');

		_.extend(data, {
			protocol: parsedData[0],
			device: parsedData[1]
		});

		//comands have a maximum of 3 partitions per data
		if (parsedData.length <= 3) {
			var command = parsedData[2].split(':');

			_.extend(data, {
				is_data: false,
				message_type: command[0],
				message: command[1]
			});

			return data;
		}

		_.extend(data, {
			dtm: parsedData[2],
			event_id: parsedData[3]
		});

		for (var i = 4, len = parsedData.length; i < len; i++) {
			var dataField = parsedData[i].split(':');
			var dataHeader = dataField[0];
			data = dataField[1].split(';');

			if (dataHeader === 'SYS') {
				_.extend(data, {
					data_type: 'SYS',
					device_name: data[0],
					firmware_v: data[1],
					hardware_v: data[2]
				});
			} else if (dataHeader === 'GPS') {
				_.extend(data, {
					data_type: 'GPS',
					fix_flag: data[0],
					satellite_no: data[1],
					hardware_v: data[2],
					coordinates: [data[3].substr(1, data[3].length - 1), data[2].substr(1, data[2].length - 1)],
					lat_dir: data[2].substr(0, 1),
					lng_dir: data[3].substr(0, 1),
					speed: data[4],
					azimuth: data[5],
					altitude: data[6],
					hdop: data[7],
					vdop: data[8]
				});
			} else if (dataHeader === 'GSM') {
				_.extend(data, {
					data_type: 'GSM',
					reg_status: data[0],
					signal: data[1],
					mcc1_ctry: data[2],
					mnc1_ntwrk: data[3],
					lac1_base_code: data[4],
					cid1_base_idntfr: data[5],
					rsi1_signal: data[6],
					mmc2_ctry: data[7],
					mnc2_ntwrk: data[8],
					lac2_base_code: data[9],
					cid2_base_idntfr: data[10],
					rsi2_signal: data[11],
					mmc3_ctry: data[12],
					mnc3_ntwrk: data[13],
					lac3_base_code: data[14],
					cid3_base_idntfr: data[15],
					rsi3_signal: data[16]
				});
			} else if (dataHeader === 'COT') {
				_.extend(data, {
					data_type: 'COT',
					odometer: data[0],
					enginehour: data[1]
				});
			} else if (dataHeader === 'ADC') {
				_.extend(data, {
					data_type: 'ADC',
					ext_pow_volt: data[0],
					bkp_bat_volt: data[1]
				});
			} else if (dataHeader === 'DTT') {
				_.extend(data, {
					data_type: 'DTT',
					dev_status: data[0],
					dtt_reserved: data[1],
					geo_status1: data[2],
					geo_status2: data[3],
					dtt_event_status: data[4],
					packet_type: data[5]
				});
			} else if (dataHeader === 'ETD') {
				_.extend(data, {
					data_type: 'ETD',
					etd_data: dataField[1]
				});
			} else if (dataHeader === 'OBD') {
				_.extend(data, {
					data_type: 'OBD',
					obd_data: data[0]
				});

			} else if (dataHeader === 'FUL') {
				_.extend(data, {
					data_type: 'FUL',
					ful_data: data[0]
				});
			} else if (dataHeader === 'TRU') {
				_.extend(data, {
					data_type: 'TRU',
					tru_data: data[0]
				});
			}
		}

		return data;
	} catch (err) {
		return err;
	}
};