
return (function AtrackParser() {

    //copy here onwards for VM2 execution disregard the import of requires

    //Set the default values


    try {

        var dataSet = new Data();

        var firstEntry,
            lastEntry,
            processEntry,
            dataEntry,
            dataEntries = [],
            dataSetArray = [];
        var multipleEntries = rawData.split('\r\n');

        //check if data is a command
        if (/^\$/.test(multipleEntries[0])) {

            var command = multipleEntries[0].split('=');

            dataSet.set('device', 'atrack_command');
            dataSet.set('is_data', 0);
            dataSet.set('command_type', command[0].substr(1, command[0].length - 1));
            dataSet.set('command_data', command[1]);

            return dataSet;
        }


        if (!/^@P/.test(rawData)) {
            /*  Put it in here to ensure that we will only processed junk data
             performance will still be the same except if there is a bunch
             of junk data
             */
            rawData = rawData.substr(rawData.indexOf('@P'), rawData.length);
            if (!/^@P/.test(rawData)) {
                var err = {
                    name: "Parsing Error",
                    message: "Invalid Raw Data",
                    stack: "Raw data did not pass header test, please check the data"
                };
                throw err;
            }
        }


        if (multipleEntries.length === 2 && multipleEntries[1] === '')
            processEntry = _.first(multipleEntries);
        else {
            firstEntry = _.first(multipleEntries);
            lastEntry = multipleEntries[multipleEntries.length - 2]; //get last entry by skipping the blank entry

            multipleEntries.forEach(function (entry) {
                if (lastEntry === entry || entry === '') return;

                if (entry && entry !== firstEntry && !/^@P/.test(entry) && !/^\\u/.test(entry))
                    dataEntries.push(firstEntry.split(',').splice(0, 5).concat(entry.split(',')).toString());
                else if (/^@P/.test(entry))
                    dataEntries.push(entry);
            });

            processEntry = firstEntry.split(',').splice(0, 5).concat(lastEntry.split(',')).toString();
        }

        var parsedData = processEntry.split(',');

        dataSet.set('is_data', 1);
        dataSet.set('sequence_no', parsedData[3]);
        dataSet.set('device', parsedData[4]);
        dataSet.set('gps_dtm', moment(parsedData[5], 'YYYYMMDDHHmmss').toDate());
        dataSet.set('raw_gps_dtm', parsedData[5]);
        dataSet.set('dtm', moment(parsedData[6], 'YYYYMMDDHHmmss').toDate());
        dataSet.set('raw_dtm', parsedData[6]);
        dataSet.set('position_dtm', moment(parsedData[7], 'YYYYMMDDHHmmss').toDate());
        dataSet.set('raw_position_dtm', parsedData[7]);
        dataSet.set('lng', parsedData[8] * 0.000001); //convert lng
        dataSet.set('lat', parsedData[9] * 0.000001); // convert lat
        dataSet.setCoordinates(dataSet.get('lat'), dataSet.get('lng'));
        dataSet.set('heading', parsedData[10]); //heading
        dataSet.set('event_code', parsedData[11]); //report id
        dataSet.set('odometer', ((parsedData[12] * 0.1) * 1000)); //odo convert first to actual km then to m
        dataSet.set('gps_hdop', (parsedData[13] * 0.1)); //gps hdop
        dataSet.set('in_status', parsedData[14]); //analog input status
        dataSet.set('speed', parsedData[15]); //speed
        dataSet.set('out_status', parsedData[16]); //analog output status
        dataSet.set('analog_input', (parsedData[17] * 0.001)); //analog input value
        dataSet.set('driver_id', parsedData[18]); // driver id
        dataSet.set('temp', parsedData[19]); //first temp sensor
        dataSet.set('temp2', parsedData[20]); //second temp sensor
        dataSet.set('text_msg', parsedData[21]); //text msg

        var imeiBytes = new Int64(parseInt(dataSet.get('imei')));
        var ack = new Buffer(12);
        var i = 2;

        ack.writeUInt8(0xFE, 0);
        ack.writeUInt8(0x02, 1);

        imeiBytes.toOctets().forEach(function (imeiByte) {
            ack.writeUInt8(parseInt(imeiByte, 16), i);
            ++i;
        });

        ack.writeUInt16BE(parseInt(dataSet.get('sequence_no')), 10);

        dataSet.set('ack', ack);

        dataSetArray.push(dataSet);

        dataEntries.forEach(function (entry) {

            dataEntry = new Data();
            parsedData = {};
            parsedData = entry.split(',');

            dataEntry.set('is_data', 1);
            dataEntry.set('device', parsedData[4]);
            dataEntry.set('gps_dtm', moment(parsedData[5], 'YYYYMMDDHHmmss').toDate());
            dataEntry.set('raw_gps_dtm', parsedData[5]);
            dataEntry.set('dtm', moment(parsedData[6], 'YYYYMMDDHHmmss').toDate());
            dataEntry.set('raw_dtm', parsedData[6]);
            dataEntry.set('position_dtm', moment(parsedData[7], 'YYYYMMDDHHmmss').toDate());
            dataEntry.set('raw_position_dtm', parsedData[7]);
            dataEntry.set('lng', parsedData[8] * 0.000001); //convert lng
            dataEntry.set('lat', parsedData[9] * 0.000001); // convert lat
            dataEntry.setCoordinates(dataEntry.get('lng'), dataEntry.get('lat'));
            dataEntry.set('heading', parsedData[10]); //heading
            dataEntry.set('event_code', parsedData[11]); //report id
            dataEntry.set('odometer', ((parsedData[12] * 0.1) * 1000)); //odo convert first to actual km then to m
            dataEntry.set('gps_hdop', (parsedData[13] * 0.1)); //gps hdop
            dataEntry.set('in_status', parsedData[14]); //analog input status
            dataEntry.set('speed', parsedData[15]); //speed
            dataEntry.set('out_status', parsedData[16]); //analog output status
            dataEntry.set('analog_input', (parsedData[17] * 0.001)); //analog input value
            dataEntry.set('driver_id', parsedData[18]); // driver id
            dataEntry.set('temp', parsedData[19]); //first temp sensor
            dataEntry.set('temp2', parsedData[20]); //second temp sensor
            dataEntry.set('text_msg', parsedData[21]); //text msg

            dataEntry.set('ack', ack);

            dataSetArray.push(dataEntry);
        });

        return dataSetArray;


    } catch (e) {

        throw e;
    }

}).call(this);
