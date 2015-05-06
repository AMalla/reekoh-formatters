
return (function MeitrackParser() {

    //copy here onwards for VM2 execution disregard the import of requires


    try {

        var dataSet = new Data();

        if (!/^\$\$/.test(rawData)) {
            var err = {
                name: 'Parsing Error',
                message: 'Invalid Raw Data',
                stack: 'Raw data did not pass header test, please check the data'
            };
            throw err;
        }

        var parsedData = rawData.split('*')[0].split(',');

        dataSet.set('header', parsedData[0]);
        dataSet.set('device', parsedData[1]);
        dataSet.set('command_type', parsedData[2]);

        //if command type is not AAA then it is a command and not position data
        if (dataSet.get('command_type') !== 'AAA') {

            parsedData.splice(0, 3);
            dataSet.set('is_data', 0);
            dataSet.set('command_data', parsedData.join());

            return dataSet;
        }

        dataSet.set('is_data', 1);
        dataSet.set('event_code', parsedData[3]);
        dataSet.set('lat', parsedData[4]);
        dataSet.set('lng', parsedData[5]);
        dataSet.setCoordinates(parsedData[4], parsedData[5]);
        dataSet.set('dtm', moment(parsedData[6], 'YYMMDDHHmmss').toDate());
        dataSet.set('raw_dtm', parsedData[6]);
        dataSet.set('status', parsedData[7]);
        dataSet.set('satellite_no', parsedData[8]);
        dataSet.set('signal', parsedData[9]);
        dataSet.set('speed', parsedData[10]);
        dataSet.set('direction', parsedData[11]);
        dataSet.set('accuracy', parsedData[12]);
        dataSet.set('altitude', parsedData[13]);
        dataSet.set('odometer', parsedData[14]);
        dataSet.set('run_time', parsedData[15]);
        dataSet.set('base_station', parsedData[16]);
        dataSet.set('io_status', parsedData[17]);
        dataSet.set('analog_input', parsedData[18]);

        var eventCode = parseInt(dataSet.get('event_code'));

        if (eventCode === 37)
            dataSet.set('rfid', parsedData[19]);

        if (eventCode === 39)
            dataSet.set('picture_name', parsedData[19]);

        if (eventCode === 50 || eventCode === 51)
            dataSet.set('temp_num', parsedData[19]);

        if (eventCode === 20 || eventCode === 21 || eventCode === 58 || eventCode === 145)
            dataSet.set('asst_event_info', parsedData[19]);

        if (parsedData.length >= 21) {

            dataSet.set('custom', parsedData[20]);
            dataSet.set('protocol', parsedData[21]);

            if (dataSet.protocol === '1') {
                if (parsedData.length === 24) {
                    dataSet.set('fuel_value', parsedData[22]);
                    dataSet.set('temp', parsedData[23]);
                } else {
                    if (parsedData[22].length === 4)
                        dataSet.set('fuel_value', parsedData[22]);
                    else
                        dataSet.set('temp', parsedData[22]);
                }
            }
        }

        return dataSet;

    } catch (e) {
        throw e;
    }

}).call(this);
