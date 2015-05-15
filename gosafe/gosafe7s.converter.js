exports.convert = function () {

    var convertedDataArr = [];

    if (_.isArray(data)){

        data.forEach(function (dataEntry) {
            convertedDataArr.push(processData(dataEntry));
        });

    }else{
        convertedDataArr.push(processData(data));
    }

    exit(convertedDataArr);

    function processData(entry) {
        var convertedData = _.clone(entry, true);

        if (convertedData.dtm)
            convertedData.dtm = moment(convertedData.dtm, 'HHmmssDDMMYY').toDate();

        if (convertedData.event_id)
            convertedData.event_id = parseInt(convertedData.event_id);

        if (convertedData.satellite_no)
            convertedData.satellite_no = parseInt(convertedData.satellite_no);

        if (convertedData.coordinates[0])
            convertedData.coordinates[0] = parseFloat(convertedData.coordinates[0]);

        if (convertedData.coordinates[1])
            convertedData.coordinates[1] = parseFloat(convertedData.coordinates[1]);

        if (convertedData.speed)
            convertedData.speed = parseInt(convertedData.speed);

        if (convertedData.azimuth)
            convertedData.azimuth = parseInt(convertedData.azimuth);

        if (convertedData.altitude)
            convertedData.altitude = parseInt(convertedData.altitude);

        if (convertedData.hdop)
            convertedData.hdop = parseFloat(convertedData.hdop);

        if (convertedData.vdop)
            convertedData.vdop = parseFloat(convertedData.vdop);

        if (convertedData.reg_status)
            convertedData.reg_status = parseInt(convertedData.reg_status);

        if (convertedData.signal)
            convertedData.signal = parseInt(convertedData.signal);

        if (convertedData.mcc1_ctry)
            convertedData.mcc1_ctry = parseInt(convertedData.mcc1_ctry);

        if (convertedData.mnc1_ntwrk)
            convertedData.mnc1_ntwrk = parseInt(convertedData.mnc1_ntwrk);

        if (convertedData.rsi1_signal)
            convertedData.rsi1_signal = parseFloat(convertedData.rsi1_signal);

        if (convertedData.mcc2_ctry)
            convertedData.mcc2_ctry = parseInt(convertedData.mcc2_ctry);

        if (convertedData.mnc2_ntwrk)
            convertedData.mnc2_ntwrk = parseInt(convertedData.mnc2_ntwrk);

        if (convertedData.rsi2_signal)
            convertedData.rsi2_signal = parseFloat(convertedData.rsi2_signal);

        if (convertedData.mcc3_ctry)
            convertedData.mcc3_ctry = parseInt(convertedData.mcc3_ctry);

        if (convertedData.mnc3_ntwrk)
            convertedData.mnc3_ntwrk = parseInt(convertedData.mnc3_ntwrk);

        if (convertedData.rsi3_signal)
            convertedData.rsi3_signal = parseFloat(convertedData.rsi3_signal);

        if (convertedData.odometer)
            convertedData.odometer = parseInt(convertedData.odometer);

        if (convertedData.ext_pow_volt)
            convertedData.ext_pow_volt = parseFloat(convertedData.ext_pow_volt);

        if (convertedData.bkp_bat_volt)
            convertedData.bkp_bat_volt = parseFloat(convertedData.bkp_bat_volt);

        if (convertedData.dev_status)
            convertedData.dev_status = parseInt(convertedData.dev_status);

        if (convertedData.geo_status1)
            convertedData.geo_status1 = parseInt(convertedData.geo_status1);

        if (convertedData.geo_status2)
            convertedData.geo_status2 = parseInt(convertedData.geo_status2);

        if (convertedData.dtt_event_status)
            convertedData.dtt_event_status = parseInt(convertedData.dtt_event_status);

        if (convertedData.packet_type)
            convertedData.packet_type = parseInt(convertedData.packet_type);

        delete convertedData.raw_data_entry;
        delete convertedData.raw_data;

        return convertedData;
    }

};
