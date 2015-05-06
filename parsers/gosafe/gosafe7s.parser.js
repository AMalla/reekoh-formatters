
return (function Gosafe7sParser() {

    try {

        var dataSet = new Data();

        if (!/^\*GS/.test(rawData)) {
            var err = {
                name: 'Parsing Error',
                message: 'Invalid Raw Data',
                stack: 'Raw data did not pass header test, please check the data'
            };
            throw err;
        }

        rawData = rawData.substr(0, rawData.length - 1); //remove packet tail

        var parsedData = rawData.split(',');

        dataSet.set('protocol', parsedData[0]);
        dataSet.set('device',  parsedData[1]);

        //comands have a maximum of 3 partitions per data
        if (parsedData.length <= 3) {

            var command = parsedData[2].split(':');

            dataSet.set('is_data', 0);
            dataSet.set('command_type', command[0]);
            dataSet.set('command_data', command[1]);

            return dataSet;

        }

        dataSet.set('is_data', 1);
        dataSet.set('dtm', moment(parsedData[2], 'HHmmssDDMMYY').toDate());
        dataSet.set('raw_dtm', parsedData[2]);
        dataSet.set('event_id', parsedData[3]);


        for (var i = 4; i < parsedData.length; i++ ){

            var dataField = parsedData[i].split(':');
            var dataHeader = dataField[0];
            var data = dataField[1].split(';');

            if (dataHeader === 'SYS') {

                dataSet.set('sys', 1);
                dataSet.set('device_name', data[0]);
                dataSet.set('firmware_v', data[1]);
                dataSet.set('hardware_v', data[2]);

            } else if (dataHeader === 'GPS') {

                dataSet.set('gps', 1);
                dataSet.set('fix_flag', data[0]);
                dataSet.set('satellite_no', data[1]);
                dataSet.set('lat', data[2].substr(1, data[2].length - 1));
                dataSet.set('lng', data[3].substr(1, data[3].length - 1));
                dataSet.set('lat_dir', data[2].substr(0, 1));
                dataSet.set('lng_dir', data[3].substr(0, 1));
                dataSet.set('speed', data[4]);
                dataSet.set('azimuth', data[5]);
                dataSet.set('altitude', data[6]);
                dataSet.set('hdop', data[7]);
                dataSet.set('vdop', data[8]);

                dataSet.setCoordinates(dataSet.get('lat'), dataSet.get('lng'));

            } else if (dataHeader === 'GSM') {

                dataSet.set('gsm', 1);
                dataSet.set('reg_status', data[0]);
                dataSet.set('signal', data[1]);
                dataSet.set('mcc1_ctry', data[2]);
                dataSet.set('mnc1_ntwrk', data[3]);
                dataSet.set('lac1_base_code', data[4]);
                dataSet.set('cid1_base_idntfr', data[5]);
                dataSet.set('rsi1_signal', data[6]);
                dataSet.set('mmc2_ctry', data[7]);
                dataSet.set('mnc2_ntwrk', data[8]);
                dataSet.set('lac2_base_code', data[9]);
                dataSet.set('cid2_base_idntfr', data[10]);
                dataSet.set('rsi2_signal', data[11]);
                dataSet.set('mmc3_ctry', data[12]);
                dataSet.set('mnc3_ntwrk', data[13]);
                dataSet.set('lac3_base_code', data[14]);
                dataSet.set('cid3_base_idntfr', data[15]);
                dataSet.set('rsi3_signal', data[16]);

            } else if (dataHeader === 'COT') {

                dataSet.set('cot', 1);
                dataSet.set('odometer', data[0]);
                dataSet.set('enginehour', data[1]);

            } else if (dataHeader === 'ADC') {

                dataSet.set('adc', 1);
                dataSet.set('ext_pow_volt', data[0]);
                dataSet.set('bkp_bat_volt', data[1]);

            } else if (dataHeader === 'DTT') {

                dataSet.set('dtt', 1);
                dataSet.set('dev_status', data[0]);
                dataSet.set('dtt_reserved', data[1]);
                dataSet.set('geo_status1', data[2]);
                dataSet.set('geo_status2', data[3]);
                dataSet.set('dtt_event_status', data[4]);
                dataSet.set('packet_type', data[5]);

            } else if (dataHeader === 'ETD') {

                //event field is customizable we will just facilitate storage
                //user can expand from the event data
                dataSet.set('etd', 1);
                dataSet.set('etd_data', dataField[1]);

            } else if (dataHeader === 'OBD') {

                dataSet.set('obd', 1);
                dataSet.set('obd_data', data[0]);

            } else if (dataHeader === 'FUL') {

                dataSet.set('ful', 1);
                dataSet.set('ful_data', data[0]);

            } else if (dataHeader === 'TRU') {

                dataSet.set('tru', 1);
                dataSet.set('tru_data', data[0]);
            }
        }

        return dataSet;

    } catch (e) {
        throw e;
    }

}).call(this);
