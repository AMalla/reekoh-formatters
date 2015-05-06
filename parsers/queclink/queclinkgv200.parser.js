
return (function Queclink200Parser() {

    try {

        var dataSet = new Data();

        if (!/^\+RESP/.test('+RESP') && !/^\+ACK/.test('+RESP') && !/^\+ACK/.test('+BUFF')) {
            var err = {
                name: 'Parsing Error',
                message: 'Invalid Raw Data',
                stack: 'Raw data did not pass header test, please check the data'
            };
            throw err;
        }

        rawData = rawData.substr(0, rawData.length - 1); //remove packet tail

        var parsedData = rawData.split(',');

        var command = parsedData[0].split(':');


        //default data always in every message
        dataSet.set('is_data', 1);
        dataSet.set('command_header', command[0]);
        dataSet.set('command_type', command[1]);
        dataSet.set('protocol', parsedData[1]);
        dataSet.set('device', parsedData[2]);
        dataSet.set('device_name', parsedData[3]);
        dataSet.set('dtm', moment(parsedData[parsedData.length - 2], 'YYYYMMDDHHmmss').toDate());
        dataSet.set('raw_dtm', parsedData[parsedData.length - 2]);
        dataSet.set('count_number', parsedData[parsedData.length - 1]); //return to ack
        dataSet.set('ack', '+SACK:' + dataSet.count_number + '$'); // use for ack receipt


        //all acknowledgement and non-location reports/events will be processed here and returned
        if (command[0] === '+ACK' || ((command[0] === '+RESP'  || command[0] === '+BUFF') &&
            (command[1] === 'GTINF' || command[1] === 'GTGPS' || command[1] === 'GTALL' ||
            command[1] === 'GTCID' || command[1] === 'GTCSQ' || command[1] === 'GTVER' ||
            command[1] === 'GTBAT' || command[1] === 'GTIOS' || command[1] === 'GTTMZ' ||
            command[1] === 'GTAIF' || command[1] === 'GTALS' || command[1] === 'GTGSV' ||
            command[1] === 'GTUVN' || command[1] === 'GTPNA' || command[1] === 'GTPFA' ||
            command[1] === 'GTPDP' || command[1] === 'GTGSM' || command[1] === 'GTPHD' ||
            command[1] === 'GTFSD' || command[1] === 'GTUFS'))) {

            parsedData.splice(0,1); //removed only the header to match documentation
            dataSet.set('is_data', 0);
            dataSet.set('command_data', parsedData.join());
            return dataSet;
        }

        //all location related reports will be processed here will list down supported reports
        //GTTOW, GTDIS, GTIOB, GTSPD, GTSOS, GTRTL, GTDOG, GTIGL, GTHBM

        //Buffer logic not covered

        if (command[1] === 'GTTOW' || command[1] === 'GTDIS' || command[1] === 'GTIOB' ||
            command[1] === 'GTSPD' || command[1] === 'GTSOS' || command[1] === 'GTRTL' ||
            command[1] === 'GTDOG' || command[1] === 'GTIGL' || command[1] === 'GTHBM' ||
            command[1] === 'GTGEO') {

            dataSet.set('reserved1', parsedData[4]);
            dataSet.set('report_id', parsedData[5]);
            dataSet.set('number', parsedData[6]);
            dataSet.set('accuracy', parsedData[7]);
            dataSet.set('speed', parsedData[8]);
            dataSet.set('azimuth', parsedData[9]);
            dataSet.set('altitude', parsedData[10]);
            dataSet.set('lng', parsedData[11]);
            dataSet.set('lat', parsedData[12]);
            dataSet.set('gps_utc_time', moment(parsedData[13], 'YYYYMMDDHHmmss').toDate());
            dataSet.set('raw_gps_time', parsedData[13]);
            dataSet.set('mcc', parsedData[14]);
            dataSet.set('lnc', parsedData[15]);
            dataSet.set('lac', parsedData[16]);
            dataSet.set('cell_id', parsedData[17]);
            dataSet.set('reserved2', parsedData[18]);
            dataSet.set('mileage', parsedData[19]);

        } else if (command[1] === 'GTFRI') {

            dataSet.set('analog_in_vcc', parsedData[4]);
            dataSet.set('report_id', parsedData[5]);
            dataSet.set('number', parsedData[6]);
            dataSet.set('accuracy', parsedData[7]);
            dataSet.set('speed', parsedData[8]);
            dataSet.set('azimuth', parsedData[9]);
            dataSet.set('altitude', parsedData[10]);
            dataSet.set('lng', parsedData[11]);
            dataSet.set('lat', parsedData[12]);
            dataSet.set('gps_utc_time', moment(parsedData[13], 'YYYYMMDDHHmmss').toDate());
            dataSet.set('raw_gps_time', parsedData[13]);
            dataSet.set('mcc', parsedData[14]);
            dataSet.set('lnc', parsedData[15]);
            dataSet.set('lac', parsedData[16]);
            dataSet.set('cell_id', parsedData[17]);
            dataSet.set('reserved1', parsedData[18]);
            dataSet.set('mileage', parsedData[19]);
            dataSet.set('hr_m_cnt', parsedData[20]);
            dataSet.set('mult_analog_vcc1', parsedData[21]);
            dataSet.set('mult_analog_vcc2', parsedData[22]);
            dataSet.set('mult_analog_vcc3', parsedData[23]);
            dataSet.set('digital_in', parsedData[24]);
            dataSet.set('digital_out', parsedData[25]);
            dataSet.set('reserved2', parsedData[26]);
            dataSet.set('reserved3', parsedData[27 ]);

        } else if (command[1] === 'GTERI') {

            dataSet.set('eri_mask', parsedData[4]);
            dataSet.set('analog_input_vcc', parsedData[5]);
            dataSet.set('report_id', parsedData[6]);
            dataSet.set('number', parsedData[7]);
            dataSet.set('accuracy', parsedData[8]);
            dataSet.set('speed', parsedData[9]);
            dataSet.set('azimuth', parsedData[10]);
            dataSet.set('altitude', parsedData[11]);
            dataSet.set('lng', parsedData[12]);
            dataSet.set('lat', parsedData[13]);
            dataSet.set('gps_utc_time', moment(parsedData[14], 'YYYYMMDDHHmmss').toDate());
            dataSet.set('raw_gps_time', parsedData[14]);
            dataSet.set('mcc', parsedData[15]);
            dataSet.set('lnc', parsedData[16]);
            dataSet.set('lac', parsedData[17]);
            dataSet.set('cell_id', parsedData[18]);
            dataSet.set('reserved1', parsedData[19]);
            dataSet.set('mileage', parsedData[20]);
            dataSet.set('hr_m_cnt', parsedData[21]);
            dataSet.set('multi_analog_vcc1', parsedData[22]);
            dataSet.set('multi_analog_vcc2', parsedData[23]);
            dataSet.set('multi_analog_vcc3', parsedData[24]);
            dataSet.set('digital_in', parsedData[25]);
            dataSet.set('digital_out', parsedData[26]);


            /***
             Device Type Optional fields are not
             included kindly refer to queclink
             protocol documentation to build
             the code base on your setup
             ***/


        } else if (command[1] === 'GTAIS' || command[1] === 'GTMAI') {

            dataSet.set('analog_in_vcc', parsedData[4]);
            dataSet.set('report_id', parsedData[5]);
            dataSet.set('number', parsedData[6]);
            dataSet.set('accuracy', parsedData[7]);
            dataSet.set('speed', parsedData[8]);
            dataSet.set('azimuth', parsedData[9]);
            dataSet.set('altitude', parsedData[10]);
            dataSet.set('lng', parsedData[11]);
            dataSet.set('lat', parsedData[12]);
            dataSet.set('gps_utc_time', moment(parsedData[13], 'YYYYMMDDHHmmss').toDate());
            dataSet.set('raw_gps_time', parsedData[13]);
            dataSet.set('mcc', parsedData[14]);
            dataSet.set('lnc', parsedData[15]);
            dataSet.set('lac', parsedData[16]);
            dataSet.set('cell_id', parsedData[17]);
            dataSet.set('reserved1', parsedData[18]);
            dataSet.set('mileage', parsedData[19]);

        }  else if (command[1] === 'GTLBC') {

            dataSet.set('call_number', parsedData[4]);
            dataSet.set('accuracy', parsedData[5]);
            dataSet.set('speed', parsedData[6]);
            dataSet.set('azimuth', parsedData[7]);
            dataSet.set('altitude', parsedData[8]);
            dataSet.set('lng', parsedData[9]);
            dataSet.set('lat', parsedData[10]);
            dataSet.set('gps_utc_time', moment(parsedData[11], 'YYYYMMDDHHmmss').toDate());
            dataSet.set('raw_gps_time', parsedData[11]);
            dataSet.set('mcc', parsedData[12]);
            dataSet.set('lnc', parsedData[13]);
            dataSet.set('lac', parsedData[14]);
            dataSet.set('cell_id', parsedData[15]);
            dataSet.set('reserved1', parsedData[16]);

        } else if (command[1] === 'GTIDA') {

            dataSet.set('reserved1', parsedData[4]);
            dataSet.set('id', parsedData[5]);
            dataSet.set('report_id', parsedData[6]);
            dataSet.set('number', parsedData[7]);
            dataSet.set('accuracy', parsedData[8]);
            dataSet.set('speed', parsedData[9]);
            dataSet.set('azimuth', parsedData[10]);
            dataSet.set('altitude', parsedData[11]);
            dataSet.set('lng', parsedData[12]);
            dataSet.set('lat', parsedData[13]);
            dataSet.set('gps_utc_time', moment(parsedData[14], 'YYYYMMDDHHmmss').toDate());
            dataSet.set('raw_gps_time', parsedData[14]);
            dataSet.set('mcc', parsedData[15]);
            dataSet.set('lnc', parsedData[16]);
            dataSet.set('lac', parsedData[17]);
            dataSet.set('cell_id', parsedData[18]);
            dataSet.set('reserved2', parsedData[19]);
            dataSet.set('mileage', parsedData[20]);
            dataSet.set('reserved3', parsedData[21]);
            dataSet.set('reserved4', parsedData[22]);
            dataSet.set('reserved5', parsedData[23]);
            dataSet.set('reserved6', parsedData[24]);

        }   else if (command[1] === 'GTGIN' || command[1] === 'GTGOT') {

                dataSet.set('reserved1', parsedData[4]);
                dataSet.set('reserved2', parsedData[5]);
                dataSet.set('area_type', parsedData[6]);
                dataSet.set('area_mask', parsedData[7]);
                dataSet.set('reserved3', parsedData[8]);
                dataSet.set('reserved4', parsedData[9]);
                dataSet.set('reserved5', parsedData[10]);
                dataSet.set('reserved6', parsedData[11]);
                dataSet.set('number', parsedData[12]);
                dataSet.set('accuracy', parsedData[13]);
                dataSet.set('speed', parsedData[14]);
                dataSet.set('azimuth', parsedData[15]);
                dataSet.set('altitude', parsedData[16]);
                dataSet.set('lng', parsedData[17]);
                dataSet.set('lat', parsedData[18]);
                dataSet.set('gps_utc_time', moment(parsedData[19], 'YYYYMMDDHHmmss').toDate());
                dataSet.set('raw_gps_time', parsedData[19]);
                dataSet.set('mcc', parsedData[20]);
                dataSet.set('lnc', parsedData[21]);
                dataSet.set('lac', parsedData[22]);
                dataSet.set('cell_id', parsedData[23]);
                dataSet.set('reserved7', parsedData[24]);
                dataSet.set('mileage', parsedData[25]);


        }    else if (command[1] === 'GTMPN' || command[1] === 'GTMPF' || command[1] === 'GTBTC') {

            dataSet.set('accuracy', parsedData[4]);
            dataSet.set('speed', parsedData[5]);
            dataSet.set('azimuth', parsedData[6]);
            dataSet.set('altitude', parsedData[7]);
            dataSet.set('lng', parsedData[8]);
            dataSet.set('lat', parsedData[9]);
            dataSet.set('gps_utc_time', moment(parsedData[10], 'YYYYMMDDHHmmss').toDate());
            dataSet.set('raw_gps_time', parsedData[10]);
            dataSet.set('mcc', parsedData[11]);
            dataSet.set('lnc', parsedData[12]);
            dataSet.set('lac', parsedData[13]);
            dataSet.set('cell_id', parsedData[14]);
            dataSet.set('reserved1', parsedData[15]);

        } else if (command[1] === 'GTJDR') {

            dataSet.set('accuracy', parsedData[4]);
            dataSet.set('speed', parsedData[5]);
            dataSet.set('azimuth', parsedData[6]);
            dataSet.set('altitude', parsedData[7]);
            dataSet.set('lng', parsedData[8]);
            dataSet.set('lat', parsedData[9]);
            dataSet.set('gps_utc_time', moment(parsedData[10], 'YYYYMMDDHHmmss').toDate());
            dataSet.set('raw_gps_time', parsedData[10]);
            dataSet.set('mcc', parsedData[11]);
            dataSet.set('lnc', parsedData[12]);
            dataSet.set('lac', parsedData[13]);
            dataSet.set('cell_id', parsedData[14]);
            dataSet.set('reserved1', parsedData[15]);

        } else if (command[1] === 'GTJDS') {

            dataSet.set('jam_status', parsedData[4]);
            dataSet.set('accuracy', parsedData[5]);
            dataSet.set('speed', parsedData[6]);
            dataSet.set('azimuth', parsedData[7]);
            dataSet.set('altitude', parsedData[8]);
            dataSet.set('lng', parsedData[9]);
            dataSet.set('lat', parsedData[10]);
            dataSet.set('gps_utc_time', moment(parsedData[11], 'YYYYMMDDHHmmss').toDate());
            dataSet.set('raw_gps_time', parsedData[11]);
            dataSet.set('mcc', parsedData[12]);
            dataSet.set('lnc', parsedData[13]);
            dataSet.set('lac', parsedData[14]);
            dataSet.set('cell_id', parsedData[15]);
            dataSet.set('reserved1', parsedData[16]);

        } else if (command[1] === 'GTSTC') {

            dataSet.set('reserved1', parsedData[4]);
            dataSet.set('accuracy', parsedData[5]);
            dataSet.set('speed', parsedData[6]);
            dataSet.set('azimuth', parsedData[7]);
            dataSet.set('altitude', parsedData[8]);
            dataSet.set('lng', parsedData[9]);
            dataSet.set('lat', parsedData[10]);
            dataSet.set('gps_utc_time', moment(parsedData[11], 'YYYYMMDDHHmmss').toDate());
            dataSet.set('raw_gps_time', parsedData[11]);
            dataSet.set('mcc', parsedData[12]);
            dataSet.set('lnc', parsedData[13]);
            dataSet.set('lac', parsedData[14]);
            dataSet.set('cell_id', parsedData[15]);
            dataSet.set('reserved2', parsedData[16]);

        }   else if (command[1] === 'GTBPL') {

            dataSet.set('bkp_bat_vcc', parsedData[4]);
            dataSet.set('accuracy', parsedData[5]);
            dataSet.set('speed', parsedData[6]);
            dataSet.set('azimuth', parsedData[7]);
            dataSet.set('altitude', parsedData[8]);
            dataSet.set('lng', parsedData[9]);
            dataSet.set('lat', parsedData[10]);
            dataSet.set('gps_utc_time', moment(parsedData[11], 'YYYYMMDDHHmmss').toDate());
            dataSet.set('raw_gps_time', parsedData[11]);
            dataSet.set('mcc', parsedData[12]);
            dataSet.set('lnc', parsedData[13]);
            dataSet.set('lac', parsedData[14]);
            dataSet.set('cell_id', parsedData[15]);
            dataSet.set('reserved1', parsedData[16]);

        }   else if (command[1] === 'GTSTT') {

            dataSet.set('state', parsedData[4]);
            dataSet.set('accuracy', parsedData[5]);
            dataSet.set('speed', parsedData[6]);
            dataSet.set('azimuth', parsedData[7]);
            dataSet.set('altitude', parsedData[8]);
            dataSet.set('lng', parsedData[9]);
            dataSet.set('lat', parsedData[10]);
            dataSet.set('gps_utc_time', moment(parsedData[11], 'YYYYMMDDHHmmss').toDate());
            dataSet.set('raw_gps_time', parsedData[11]);
            dataSet.set('mcc', parsedData[12]);
            dataSet.set('lnc', parsedData[13]);
            dataSet.set('lac', parsedData[14]);
            dataSet.set('cell_id', parsedData[15]);
            dataSet.set('reserved1', parsedData[16]);

        }  else if (command[1] === 'GTANT') {

            dataSet.set('ext_antenna', parsedData[4]);
            dataSet.set('accuracy', parsedData[5]);
            dataSet.set('speed', parsedData[6]);
            dataSet.set('azimuth', parsedData[7]);
            dataSet.set('altitude', parsedData[8]);
            dataSet.set('lng', parsedData[9]);
            dataSet.set('lat', parsedData[10]);
            dataSet.set('gps_utc_time', moment(parsedData[11], 'YYYYMMDDHHmmss').toDate());
            dataSet.set('raw_gps_time', parsedData[11]);
            dataSet.set('mcc', parsedData[12]);
            dataSet.set('lnc', parsedData[13]);
            dataSet.set('lac', parsedData[14]);
            dataSet.set('cell_id', parsedData[15]);
            dataSet.set('reserved1', parsedData[16]);

        }   else if (command[1] === 'GTMON') {

            dataSet.set('phone_no', parsedData[4]);
            dataSet.set('mon_type', parsedData[5]);
            dataSet.set('stlth_mic', parsedData[6]);
            dataSet.set('stlth_spk', parsedData[7]);
            dataSet.set('accuracy', parsedData[8]);
            dataSet.set('speed', parsedData[9]);
            dataSet.set('azimuth', parsedData[10]);
            dataSet.set('altitude', parsedData[11]);
            dataSet.set('lng', parsedData[12]);
            dataSet.set('lat', parsedData[13]);
            dataSet.set('gps_utc_time', moment(parsedData[14], 'YYYYMMDDHHmmss').toDate());
            dataSet.set('raw_gps_time', parsedData[14]);
            dataSet.set('mcc', parsedData[15]);
            dataSet.set('lnc', parsedData[16]);
            dataSet.set('lac', parsedData[17]);
            dataSet.set('cell_id', parsedData[18]);
            dataSet.set('reserved1', parsedData[19]);

        }   else if (command[1] === 'GTIGN') {

            dataSet.set('dur_ign_off', parsedData[4]);
            dataSet.set('accuracy', parsedData[5]);
            dataSet.set('speed', parsedData[6]);
            dataSet.set('azimuth', parsedData[7]);
            dataSet.set('altitude', parsedData[8]);
            dataSet.set('lng', parsedData[9]);
            dataSet.set('lat', parsedData[10]);
            dataSet.set('gps_utc_time', moment(parsedData[11], 'YYYYMMDDHHmmss').toDate());
            dataSet.set('raw_gps_time', parsedData[11]);
            dataSet.set('mcc', parsedData[12]);
            dataSet.set('lnc', parsedData[13]);
            dataSet.set('lac', parsedData[14]);
            dataSet.set('cell_id', parsedData[15]);
            dataSet.set('reserved1', parsedData[16]);
            dataSet.set('hr_m_cnt', parsedData[17]);
            dataSet.set('mileage', parsedData[18]);

        }   else if (command[1] === 'GTIGF') {

            dataSet.set('dur_ign_on', parsedData[4]);
            dataSet.set('accuracy', parsedData[5]);
            dataSet.set('speed', parsedData[6]);
            dataSet.set('azimuth', parsedData[7]);
            dataSet.set('altitude', parsedData[8]);
            dataSet.set('lng', parsedData[9]);
            dataSet.set('lat', parsedData[10]);
            dataSet.set('gps_utc_time', moment(parsedData[11], 'YYYYMMDDHHmmss').toDate());
            dataSet.set('raw_gps_time', parsedData[11]);
            dataSet.set('mcc', parsedData[12]);
            dataSet.set('lnc', parsedData[13]);
            dataSet.set('lac', parsedData[14]);
            dataSet.set('cell_id', parsedData[15]);
            dataSet.set('reserved1', parsedData[16]);
            dataSet.set('hr_m_cnt', parsedData[17]);
            dataSet.set('mileage', parsedData[18]);


        }   else if (command[1] === 'GTIDN') {

            dataSet.set('reserved1', parsedData[4]);
            dataSet.set('reserved2', parsedData[5]);
            dataSet.set('accuracy', parsedData[6]);
            dataSet.set('speed', parsedData[7]);
            dataSet.set('azimuth', parsedData[8]);
            dataSet.set('altitude', parsedData[9]);
            dataSet.set('lng', parsedData[10]);
            dataSet.set('lat', parsedData[11]);
            dataSet.set('gps_utc_time', moment(parsedData[12], 'YYYYMMDDHHmmss').toDate());
            dataSet.set('raw_gps_time', parsedData[12]);
            dataSet.set('mcc', parsedData[13]);
            dataSet.set('lnc', parsedData[14]);
            dataSet.set('lac', parsedData[15]);
            dataSet.set('cell_id', parsedData[16]);
            dataSet.set('reserved3', parsedData[17]);
            dataSet.set('mileage', parsedData[18]);

        }   else if (command[1] === 'GTIDF') {

            dataSet.set('motion_state', parsedData[4]);
            dataSet.set('dur_idling', parsedData[5]);
            dataSet.set('accuracy', parsedData[6]);
            dataSet.set('speed', parsedData[7]);
            dataSet.set('azimuth', parsedData[8]);
            dataSet.set('altitude', parsedData[9]);
            dataSet.set('lng', parsedData[10]);
            dataSet.set('lat', parsedData[11]);
            dataSet.set('gps_utc_time', moment(parsedData[12], 'YYYYMMDDHHmmss').toDate());
            dataSet.set('raw_gps_time', parsedData[12]);
            dataSet.set('mcc', parsedData[13]);
            dataSet.set('lnc', parsedData[14]);
            dataSet.set('lac', parsedData[15]);
            dataSet.set('cell_id', parsedData[16]);
            dataSet.set('reserved1', parsedData[17]);
            dataSet.set('mileage', parsedData[18]);

        }   else if (command[1] === 'GTFLA') {

            dataSet.set('input_id', parsedData[4]);
            dataSet.set('ign_off_fuel', parsedData[5]);
            dataSet.set('ign_on_fuel', parsedData[6]);
            dataSet.set('accuracy', parsedData[7]);
            dataSet.set('speed', parsedData[8]);
            dataSet.set('azimuth', parsedData[9]);
            dataSet.set('altitude', parsedData[10]);
            dataSet.set('lng', parsedData[11]);
            dataSet.set('lat', parsedData[12]);
            dataSet.set('gps_utc_time', moment(parsedData[13], 'YYYYMMDDHHmmss').toDate());
            dataSet.set('raw_gps_time', parsedData[13]);
            dataSet.set('mcc', parsedData[14]);
            dataSet.set('lnc', parsedData[15]);
            dataSet.set('lac', parsedData[16]);
            dataSet.set('cell_id', parsedData[17]);
            dataSet.set('reserved1', parsedData[18]);

        }   else if (command[1] === 'GTTMP') {

            dataSet.set('reserved1', parsedData[4]);
            dataSet.set('analog_input_vcc', parsedData[5]);
            dataSet.set('report_id', parsedData[6]);
            dataSet.set('number', parsedData[7]);
            dataSet.set('accuracy', parsedData[8]);
            dataSet.set('speed', parsedData[9]);
            dataSet.set('azimuth', parsedData[10]);
            dataSet.set('altitude', parsedData[11]);
            dataSet.set('lng', parsedData[12]);
            dataSet.set('lat', parsedData[13]);
            dataSet.set('gps_utc_time', moment(parsedData[14], 'YYYYMMDDHHmmss').toDate());
            dataSet.set('raw_gps_time', parsedData[14]);
            dataSet.set('mcc', parsedData[15]);
            dataSet.set('lnc', parsedData[16]);
            dataSet.set('lac', parsedData[17]);
            dataSet.set('cell_id', parsedData[18]);
            dataSet.set('reserved2', parsedData[19]);
            dataSet.set('mileage', parsedData[20]);
            dataSet.set('hr_m_cnt', parsedData[21]);
            dataSet.set('multi_analog_vcc1', parsedData[22]);
            dataSet.set('multi_analog_vcc2', parsedData[23]);
            dataSet.set('multi_analog_vcc3', parsedData[24]);
            dataSet.set('digital_in', parsedData[25]);
            dataSet.set('digital_out', parsedData[26]);
            dataSet.set('reserved3', parsedData[27]);
            dataSet.set('reserved4', parsedData[28]);
            dataSet.set('reserved5', parsedData[29]);
            dataSet.set('temp_dev_id', parsedData[30]);
            dataSet.set('reserved6', parsedData[31]);
            dataSet.set('temp_dev_data', parsedData[32]);

        }   else if (command[1] === 'GTSTR' || command[1] === 'GTSTP' ||command[1] === 'GTLSP') {

                dataSet.set('reserved1', parsedData[4]);
                dataSet.set('reserved2', parsedData[5]);
                dataSet.set('accuracy', parsedData[6]);
                dataSet.set('speed', parsedData[7]);
                dataSet.set('azimuth', parsedData[8]);
                dataSet.set('altitude', parsedData[9]);
                dataSet.set('lng', parsedData[10]);
                dataSet.set('lat', parsedData[11]);
                dataSet.set('gps_utc_time', moment(parsedData[12], 'YYYYMMDDHHmmss').toDate());
                dataSet.set('raw_gps_time', parsedData[12]);
                dataSet.set('mcc', parsedData[13]);
                dataSet.set('lnc', parsedData[14]);
                dataSet.set('lac', parsedData[15]);
                dataSet.set('cell_id', parsedData[16]);
                dataSet.set('reserved3', parsedData[17]);
                dataSet.set('mileage', parsedData[18]);

        }   else if (command[1] === 'GTDOS') {

                dataSet.set('wave_out_id', parsedData[4]);
                dataSet.set('wave_out_active', parsedData[5]);
                dataSet.set('accuracy', parsedData[6]);
                dataSet.set('speed', parsedData[7]);
                dataSet.set('azimuth', parsedData[8]);
                dataSet.set('altitude', parsedData[9]);
                dataSet.set('lng', parsedData[10]);
                dataSet.set('lat', parsedData[11]);
                dataSet.set('gps_utc_time', moment(parsedData[12], 'YYYYMMDDHHmmss').toDate());
                dataSet.set('raw_gps_time', parsedData[12]);
                dataSet.set('mcc', parsedData[13]);
                dataSet.set('lnc', parsedData[14]);
                dataSet.set('lac', parsedData[15]);
                dataSet.set('cell_id', parsedData[16]);
                dataSet.set('reserved1', parsedData[17]);

        }   else if (command[1] === 'GTGSS') {

                dataSet.set('gps_sig_status', parsedData[4]);
                dataSet.set('satellite_no', parsedData[5]);
                dataSet.set('device_state', parsedData[6]);
                dataSet.set('reserved1', parsedData[7]);
                dataSet.set('accuracy', parsedData[8]);
                dataSet.set('speed', parsedData[9]);
                dataSet.set('azimuth', parsedData[10]);
                dataSet.set('altitude', parsedData[11]);
                dataSet.set('lng', parsedData[12]);
                dataSet.set('lat', parsedData[13]);
                dataSet.set('gps_utc_time', moment(parsedData[14], 'YYYYMMDDHHmmss').toDate());
                dataSet.set('raw_gps_time', parsedData[14]);
                dataSet.set('mcc', parsedData[15]);
                dataSet.set('lnc', parsedData[16]);
                dataSet.set('lac', parsedData[17]);
                dataSet.set('cell_id', parsedData[18]);
                dataSet.set('reserved2', parsedData[19]);

        }   else if (command[1] === 'GTGPJ') {

                dataSet.set('cw_jam_state', parsedData[4]);
                dataSet.set('gps_jam_state', parsedData[5]);
                dataSet.set('accuracy', parsedData[6]);
                dataSet.set('speed', parsedData[7]);
                dataSet.set('azimuth', parsedData[8]);
                dataSet.set('altitude', parsedData[9]);
                dataSet.set('lng', parsedData[10]);
                dataSet.set('lat', parsedData[11]);
                dataSet.set('gps_utc_time', moment(parsedData[12], 'YYYYMMDDHHmmss').toDate());
                dataSet.set('raw_gps_time', parsedData[12]);
                dataSet.set('mcc', parsedData[13]);
                dataSet.set('lnc', parsedData[14]);
                dataSet.set('lac', parsedData[15]);
                dataSet.set('cell_id', parsedData[16]);
                dataSet.set('reserved2', parsedData[17]);

        }   else if (command[1] === 'GTPHL') {

                dataSet.set('camera_id', parsedData[4]);
                dataSet.set('reserved1', parsedData[5]);
                dataSet.set('photo_time', parsedData[6]);
                dataSet.set('accuracy', parsedData[7]);
                dataSet.set('speed', parsedData[8]);
                dataSet.set('azimuth', parsedData[9]);
                dataSet.set('altitude', parsedData[10]);
                dataSet.set('lng', parsedData[11]);
                dataSet.set('lat', parsedData[12]);
                dataSet.set('gps_utc_time', moment(parsedData[13], 'YYYYMMDDHHmmss').toDate());
                dataSet.set('raw_gps_time', parsedData[13]);
                dataSet.set('mcc', parsedData[14]);
                dataSet.set('lnc', parsedData[15]);
                dataSet.set('lac', parsedData[16]);
                dataSet.set('cell_id', parsedData[17]);
                dataSet.set('reserved2', parsedData[18]);
                dataSet.set('reserved3', parsedData[19]);
                dataSet.set('reserved4', parsedData[20]);
                dataSet.set('reserved5', parsedData[21]);
                dataSet.set('reserved6', parsedData[22]);


        }   else if (command[1] === 'GTRMD') {

                dataSet.set('roam_state', parsedData[4]);
                dataSet.set('accuracy', parsedData[5]);
                dataSet.set('speed', parsedData[6]);
                dataSet.set('azimuth', parsedData[7]);
                dataSet.set('altitude', parsedData[8]);
                dataSet.set('lng', parsedData[9]);
                dataSet.set('lat', parsedData[10]);
                dataSet.set('gps_utc_time', moment(parsedData[11], 'YYYYMMDDHHmmss').toDate());
                dataSet.set('raw_gps_time', parsedData[11]);
                dataSet.set('mcc', parsedData[12]);
                dataSet.set('lnc', parsedData[13]);
                dataSet.set('lac', parsedData[14]);
                dataSet.set('cell_id', parsedData[15]);
                dataSet.set('reserved1', parsedData[16]);

        }   else if (command[1] === 'GTDAT') {

            if (parsedData.length <= 7) {
                dataSet.set('is_data', 0);
                dataSet.set('format', 'short');
                dataSet.set('data', parsedData[4]);
            } else {
                dataSet.set('format', 'long');
                dataSet.set('report_type', parsedData[4]);
                dataSet.set('reserved1', parsedData[5]);
                dataSet.set('reserved2', parsedData[6]);
                dataSet.set('data', parsedData[7]);
                dataSet.set('accuracy', parsedData[8]);
                dataSet.set('speed', parsedData[9]);
                dataSet.set('azimuth', parsedData[10]);
                dataSet.set('altitude', parsedData[11]);
                dataSet.set('lng', parsedData[12]);
                dataSet.set('lat', parsedData[13]);
                dataSet.set('gps_utc_time', moment(parsedData[14], 'YYYYMMDDHHmmss').toDate());
                dataSet.set('raw_gps_time', parsedData[14]);
                dataSet.set('mcc', parsedData[15]);
                dataSet.set('lnc', parsedData[16]);
                dataSet.set('lac', parsedData[17]);
                dataSet.set('cell_id', parsedData[18]);
                dataSet.set('reserved3', parsedData[19]);
                dataSet.set('reserved4', parsedData[20]);
                dataSet.set('reserved5', parsedData[21]);
                dataSet.set('reserved6', parsedData[22]);
                dataSet.set('reserved7', parsedData[23]);

            }
        }   else if (command[1] === 'GTDTT') {

            if (parsedData.length <= 10) {
                dataSet.set('is_data', 0);
                dataSet.set('format', 'short');
                dataSet.set('reserved1', parsedData[4]);
                dataSet.set('reserved2', parsedData[5]);
                dataSet.set('data_type', parsedData[6]);
                dataSet.set('data_length', parsedData[7]);
                dataSet.set('data', parsedData[8]);
            } else {
                dataSet.set('format', 'long');
                dataSet.set('reserved1', parsedData[4]);
                dataSet.set('reserved2', parsedData[5]);
                dataSet.set('data_length', parsedData[6]);
                dataSet.set('data', parsedData[7]);
                dataSet.set('accuracy', parsedData[8]);
                dataSet.set('speed', parsedData[9]);
                dataSet.set('azimuth', parsedData[10]);
                dataSet.set('altitude', parsedData[11]);
                dataSet.set('lng', parsedData[12]);
                dataSet.set('lat', parsedData[13]);
                dataSet.set('gps_utc_time', moment(parsedData[14], 'YYYYMMDDHHmmss').toDate());
                dataSet.set('raw_gps_time', parsedData[14]);
                dataSet.set('mcc', parsedData[15]);
                dataSet.set('lnc', parsedData[16]);
                dataSet.set('lac', parsedData[17]);
                dataSet.set('cell_id', parsedData[18]);
                dataSet.set('reserved3', parsedData[19]);
                dataSet.set('reserved4', parsedData[20]);
                dataSet.set('reserved5', parsedData[21]);
                dataSet.set('reserved6', parsedData[22]);
                dataSet.set('reserved7', parsedData[23]);

            }

        }   else if (command[1] === 'GTUDT') {

                dataSet.set('firmware_v', parsedData[2]);
                dataSet.set('hardware_v', parsedData[3]);
                dataSet.set('reserved1', parsedData[4]);
                dataSet.set('device', parsedData[5]);
                dataSet.set('device_name', parsedData[6]);
                dataSet.set('report_type', parsedData[7]);
                dataSet.set('report_id', parsedData[8]);
                dataSet.set('number', parsedData[9]);
                dataSet.set('accuracy', parsedData[10]);
                dataSet.set('speed', parsedData[11]);
                dataSet.set('azimuth', parsedData[12]);
                dataSet.set('altitude', parsedData[13]);
                dataSet.set('lng', parsedData[14]);
                dataSet.set('lat', parsedData[15]);
                dataSet.set('gps_utc_time', moment(parsedData[16], 'YYYYMMDDHHmmss').toDate());
                dataSet.set('raw_gps_time', parsedData[16]);
                dataSet.set('mcc', parsedData[17]);
                dataSet.set('lnc', parsedData[18]);
                dataSet.set('lac', parsedData[19]);
                dataSet.set('cell_id', parsedData[20]);
                dataSet.set('reserved2', parsedData[21]);
                dataSet.set('mileage', parsedData[22]);
                dataSet.set('reserved3', parsedData[23]);
                dataSet.set('hr_m_cnt', parsedData[24]);
                dataSet.set('reserved4', parsedData[25]);
                dataSet.set('ext_antenna', parsedData[26]);
                dataSet.set('gsv_no', parsedData[27]);
                dataSet.set('geofence_state', parsedData[28]);
                dataSet.set('multi_analog_vcc1', parsedData[29]);
                dataSet.set('multi_analog_vcc2', parsedData[30]);
                dataSet.set('multi_analog_vcc3', parsedData[31]);
                dataSet.set('digital_in', parsedData[32]);
                dataSet.set('digital_out', parsedData[33]);
                dataSet.set('motion_status', parsedData[34]);
                dataSet.set('ext_pow_vcc', parsedData[35]);
                dataSet.set('bkp_bat_level', parsedData[36]);
                dataSet.set('charging', parsedData[37]);
                dataSet.set('geo_status_mask', parsedData[38]);
                dataSet.set('reserved4', parsedData[39]);
                dataSet.set('reserved5', parsedData[40]);
                dataSet.set('reserved6', parsedData[41]);
        }


        if (dataSet.get('lat') || dataSet.get('lng')) {
            dataSet.setCoordinates(dataSet.get('lat'), dataSet.get('lng'));
        }

        return dataSet;

    } catch (e) {
        throw err;
    }

}).call(this);
