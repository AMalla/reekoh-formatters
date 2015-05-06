
return (function Queclink55Parser() {

    try {

        var dataSet = new Data();

        if (!/^\+RESP/.test('+RESP') && !/^\+ACK/.test('+RESP') && !/^\+ACK/.test('+BUFF')) {
            var err = {
                name: 'Parsing Error',
                message: 'Invalid Raw Data',
                stack: 'Raw data did not pass header test, please check the data'
            };
            return err;
        }

        rawData = rawData.substr(0, rawData.length - 1); //remove packet tail

        var parsedData = rawData.split(',');

        var command = parsedData[0].split(':');


        //default data always in every message
        dataSet.command_header = command[0];
        dataSet.command_type = command[1];
        dataSet.protocol = parsedData[1];
        dataSet.device = parsedData[2];
        dataSet.device_name = parsedData[3];
        dataSet.dtm = moment(parsedData[parsedData.length - 2], 'YYYYMMDDHHmmss').toDate();
        dataSet.raw_dtm = parsedData[parsedData.length - 2];
        dataSet.count_number = parsedData[parsedData.length - 1]; //return to ack
        dataSet.ack = '+SACK:' + dataSet.count_number + '$'; // use for ack receipt


        //all acknowledgement and non-location reports/events will be processed here and returned
        if (command[0] === '+ACK' || ((command[0] === '+RESP' || command[0] === '+BUFF') &&
            (command[1] === 'GTINF' || command[1] === 'GTGPS' || command[1] === 'GTALL' ||
            command[1] === 'GTCID' || command[1] === 'GTCSQ' || command[1] === 'GTVER' ||
            command[1] === 'GTBAT' || command[1] === 'GTIOS' || command[1] === 'GTTMZ' ||
            command[1] === 'GTAIF' || command[1] === 'GTALS' || command[1] === 'GTGSV' ||
            command[1] === 'GTUVN' || command[1] === 'GTPNA' || command[1] === 'GTPFA' ||
            command[1] === 'GTPDP' || command[1] === 'GTGSM' || command[1] === 'GTPHD' ||
            command[1] === 'GTFSD' || command[1] === 'GTUFS' || command[1] === 'GTCRD' ||
            command[1] === 'GTACC'))) {

            parsedData.splice(0, 1); //removed only the header to match documentation
            dataSet.is_data = 0;
            dataSet.command_data = parsedData.join();
            return dataSet;
        }

        //all location related reports will be processed here will list down supported reports
        //GTTOW, GTDIS, GTIOB, GTSPD, GTSOS, GTRTL, GTDOG, GTIGL, GTHBM

        //Buffer logic not covered

        if (command[1] === 'GTTOW' || command[1] === 'GTDIS' || command[1] === 'GTIOB' ||
            command[1] === 'GTSPD' || command[1] === 'GTSOS' || command[1] === 'GTRTL' ||
            command[1] === 'GTDOG' || command[1] === 'GTIGL' || command[1] === 'GTHBM') {

            dataSet.reserved1 = parsedData[4];
            dataSet.report_id = parsedData[5];
            dataSet.number = parsedData[6];
            dataSet.accuracy = parsedData[7];
            dataSet.speed = parsedData[8];
            dataSet.azimuth = parsedData[9];
            dataSet.altitude = parsedData[10];
            dataSet.lng = parsedData[11];
            dataSet.lat = parsedData[12];
            dataSet.gps_utc_time = moment(parsedData[13], 'YYYYMMDDHHmmss').toDate();
            dataSet.raw_gps_time = parsedData[13];
            dataSet.mcc = parsedData[14];
            dataSet.lnc = parsedData[15];
            dataSet.lac = parsedData[16];
            dataSet.cell_id = parsedData[17];
            dataSet.reserved2 = parsedData[18];
            dataSet.mileage = parsedData[19];

        } else if (command[1] === 'GTFRI') {

            dataSet.ext_power = parsedData[4];
            dataSet.report_id = parsedData[5];
            dataSet.number = parsedData[6];
            dataSet.accuracy = parsedData[7];
            dataSet.speed = parsedData[8];
            dataSet.azimuth = parsedData[9];
            dataSet.altitude = parsedData[10];
            dataSet.lng = parsedData[11];
            dataSet.lat = parsedData[12];
            dataSet.gps_utc_time = moment(parsedData[13], 'YYYYMMDDHHmmss').toDate();
            dataSet.raw_gps_time = parsedData[13];
            dataSet.mcc = parsedData[14];
            dataSet.lnc = parsedData[15];
            dataSet.lac = parsedData[16];
            dataSet.cell_id = parsedData[17];
            dataSet.reserved1 = parsedData[18];
            dataSet.mileage = parsedData[19];
            dataSet.hr_m_cnt = parsedData[20];
            dataSet.reserved2 = parsedData[21];
            dataSet.reserved3 = parsedData[22];
            dataSet.bkp_bat_pct = parsedData[23];
            dataSet.device_stat = parsedData[24];
            dataSet.reserved4 = parsedData[25];
            dataSet.reserved5 = parsedData[26];
            dataSet.reserved6 = parsedData[27];

        } else if (command[1] === 'GTEPS') {

            dataSet.ext_pow_volt = parsedData[4];
            dataSet.report_id = parsedData[5];
            dataSet.number = parsedData[6];
            dataSet.accuracy = parsedData[7];
            dataSet.speed = parsedData[8];
            dataSet.azimuth = parsedData[9];
            dataSet.altitude = parsedData[10];
            dataSet.lng = parsedData[11];
            dataSet.lat = parsedData[12];
            dataSet.gps_utc_time = moment(parsedData[13], 'YYYYMMDDHHmmss').toDate();
            dataSet.raw_gps_time = parsedData[13];
            dataSet.mcc = parsedData[14];
            dataSet.lnc = parsedData[15];
            dataSet.lac = parsedData[16];
            dataSet.cell_id = parsedData[17];
            dataSet.reserved1 = parsedData[18];
            dataSet.mileage = parsedData[19];

        } else if (command[1] === 'GTLBC') {

            dataSet.call_number = parsedData[4];
            dataSet.accuracy = parsedData[5];
            dataSet.speed = parsedData[6];
            dataSet.azimuth = parsedData[7];
            dataSet.altitude = parsedData[8];
            dataSet.lng = parsedData[9];
            dataSet.lat = parsedData[10];
            dataSet.gps_utc_time = moment(parsedData[11], 'YYYYMMDDHHmmss').toDate();
            dataSet.raw_gps_time = parsedData[11];
            dataSet.mcc = parsedData[12];
            dataSet.lnc = parsedData[13];
            dataSet.lac = parsedData[14];
            dataSet.cell_id = parsedData[15];
            dataSet.reserved1 = parsedData[16];
            dataSet.mileage = parsedData[17];

        } else if (command[1] === 'GTGEO') {

            dataSet.reserved1 = parsedData[4];
            dataSet.report_id = parsedData[5];
            dataSet.number = parsedData[6];
            dataSet.accuracy = parsedData[7];
            dataSet.speed = parsedData[8];
            dataSet.azimuth = parsedData[9];
            dataSet.altitude = parsedData[10];
            dataSet.lng = parsedData[11];
            dataSet.lat = parsedData[12];
            dataSet.gps_utc_time = moment(parsedData[13], 'YYYYMMDDHHmmss').toDate();
            dataSet.raw_gps_time = parsedData[13];
            dataSet.mcc = parsedData[14];
            dataSet.lnc = parsedData[15];
            dataSet.lac = parsedData[16];
            dataSet.cell_id = parsedData[17];
            dataSet.reserved2 = parsedData[18];
            dataSet.mileage = parsedData[19];

        } else if (command[1] === 'GTGES') {

            dataSet.reserved1 = parsedData[4];
            dataSet.report_id = parsedData[5];
            dataSet.trigger = parsedData[6];
            dataSet.radius = parsedData[7];
            dataSet.chk_interval = parsedData[8];
            dataSet.number = parsedData[9];
            dataSet.accuracy = parsedData[10];
            dataSet.speed = parsedData[11];
            dataSet.azimuth = parsedData[12];
            dataSet.altitude = parsedData[13];
            dataSet.lng = parsedData[14];
            dataSet.lat = parsedData[15];
            dataSet.gps_utc_time = moment(parsedData[16], 'YYYYMMDDHHmmss').toDate();
            dataSet.raw_gps_time = parsedData[16];
            dataSet.mcc = parsedData[17];
            dataSet.lnc = parsedData[18];
            dataSet.lac = parsedData[19];
            dataSet.cell_id = parsedData[20];
            dataSet.reserved2 = parsedData[21];
            dataSet.mileage = parsedData[22];

        } else if (command[1] === 'GTMPN' || command[1] === 'GTMPF' ||
            command[1] === 'GTBTC' || command[1] === 'GTCRA') {

            dataSet.accuracy = parsedData[4];
            dataSet.speed = parsedData[5];
            dataSet.azimuth = parsedData[6];
            dataSet.altitude = parsedData[7];
            dataSet.lng = parsedData[8];
            dataSet.lat = parsedData[9];
            dataSet.gps_utc_time = moment(parsedData[10], 'YYYYMMDDHHmmss').toDate();
            dataSet.raw_gps_time = parsedData[10];
            dataSet.mcc = parsedData[11];
            dataSet.lnc = parsedData[12];
            dataSet.lac = parsedData[13];
            dataSet.cell_id = parsedData[14];
            dataSet.reserved1 = parsedData[15];

        } else if (command[1] === 'GTSTC') {

            dataSet.reserved1 = parsedData[4];
            dataSet.accuracy = parsedData[5];
            dataSet.speed = parsedData[6];
            dataSet.azimuth = parsedData[7];
            dataSet.altitude = parsedData[8];
            dataSet.lng = parsedData[9];
            dataSet.lat = parsedData[10];
            dataSet.gps_utc_time = moment(parsedData[11], 'YYYYMMDDHHmmss').toDate();
            dataSet.raw_gps_time = parsedData[11];
            dataSet.mcc = parsedData[12];
            dataSet.lnc = parsedData[13];
            dataSet.lac = parsedData[14];
            dataSet.cell_id = parsedData[15];
            dataSet.reserved2 = parsedData[16];

        } else if (command[1] === 'GTBPL') {

            dataSet.bkp_bat_vcc = parsedData[4];
            dataSet.accuracy = parsedData[5];
            dataSet.speed = parsedData[6];
            dataSet.azimuth = parsedData[7];
            dataSet.altitude = parsedData[8];
            dataSet.lng = parsedData[9];
            dataSet.lat = parsedData[10];
            dataSet.gps_utc_time = moment(parsedData[11], 'YYYYMMDDHHmmss').toDate();
            dataSet.raw_gps_time = parsedData[11];
            dataSet.mcc = parsedData[12];
            dataSet.lnc = parsedData[13];
            dataSet.lac = parsedData[14];
            dataSet.cell_id = parsedData[15];
            dataSet.reserved1 = parsedData[16];

        } else if (command[1] === 'GTSTT') {

            dataSet.state = parsedData[4];
            dataSet.accuracy = parsedData[5];
            dataSet.speed = parsedData[6];
            dataSet.azimuth = parsedData[7];
            dataSet.altitude = parsedData[8];
            dataSet.lng = parsedData[9];
            dataSet.lat = parsedData[10];
            dataSet.gps_utc_time = moment(parsedData[11], 'YYYYMMDDHHmmss').toDate();
            dataSet.raw_gps_time = parsedData[11];
            dataSet.mcc = parsedData[12];
            dataSet.lnc = parsedData[13];
            dataSet.lac = parsedData[14];
            dataSet.cell_id = parsedData[15];
            dataSet.reserved1 = parsedData[16];

        } else if (command[1] === 'GTIGN') {

            dataSet.dur_ign_off = parsedData[4];
            dataSet.accuracy = parsedData[5];
            dataSet.speed = parsedData[6];
            dataSet.azimuth = parsedData[7];
            dataSet.altitude = parsedData[8];
            dataSet.lng = parsedData[9];
            dataSet.lat = parsedData[10];
            dataSet.gps_utc_time = moment(parsedData[11], 'YYYYMMDDHHmmss').toDate();
            dataSet.raw_gps_time = parsedData[11];
            dataSet.mcc = parsedData[12];
            dataSet.lnc = parsedData[13];
            dataSet.lac = parsedData[14];
            dataSet.cell_id = parsedData[15];
            dataSet.reserved1 = parsedData[16];
            dataSet.hr_m_cnt = parsedData[17];
            dataSet.mileage = parsedData[18];

        } else if (command[1] === 'GTIGF') {

            dataSet.dur_ign_on = parsedData[4];
            dataSet.accuracy = parsedData[5];
            dataSet.speed = parsedData[6];
            dataSet.azimuth = parsedData[7];
            dataSet.altitude = parsedData[8];
            dataSet.lng = parsedData[9];
            dataSet.lat = parsedData[10];
            dataSet.gps_utc_time = moment(parsedData[11], 'YYYYMMDDHHmmss').toDate();
            dataSet.raw_gps_time = parsedData[11];
            dataSet.mcc = parsedData[12];
            dataSet.lnc = parsedData[13];
            dataSet.lac = parsedData[14];
            dataSet.cell_id = parsedData[15];
            dataSet.reserved1 = parsedData[16];
            dataSet.hr_m_cnt = parsedData[17];
            dataSet.mileage = parsedData[18];

        } else if (command[1] === 'GTSTR' || command[1] === 'GTSTP' ||
            command[1] === 'GTLSP' || command[1] === 'GTIDN') {

            dataSet.reserved1 = parsedData[4];
            dataSet.reserved2 = parsedData[5];
            dataSet.accuracy = parsedData[6];
            dataSet.speed = parsedData[7];
            dataSet.azimuth = parsedData[8];
            dataSet.altitude = parsedData[9];
            dataSet.lng = parsedData[10];
            dataSet.lat = parsedData[11];
            dataSet.gps_utc_time = moment(parsedData[12], 'YYYYMMDDHHmmss').toDate();
            dataSet.raw_gps_time = parsedData[12];
            dataSet.mcc = parsedData[13];
            dataSet.lnc = parsedData[14];
            dataSet.lac = parsedData[15];
            dataSet.cell_id = parsedData[16];
            dataSet.reserved3 = parsedData[17];
            dataSet.mileage = parsedData[18];

        } else if (command[1] === 'GTIDF') {

            dataSet.motion_state = parsedData[4];
            dataSet.dur_idling = parsedData[5];
            dataSet.accuracy = parsedData[6];
            dataSet.speed = parsedData[7];
            dataSet.azimuth = parsedData[8];
            dataSet.altitude = parsedData[9];
            dataSet.lng = parsedData[10];
            dataSet.lat = parsedData[11];
            dataSet.gps_utc_time = moment(parsedData[12], 'YYYYMMDDHHmmss').toDate();
            dataSet.raw_gps_time = parsedData[12];
            dataSet.mcc = parsedData[13];
            dataSet.lnc = parsedData[14];
            dataSet.lac = parsedData[15];
            dataSet.cell_id = parsedData[16];
            dataSet.reserved1 = parsedData[17];
            dataSet.mileage = parsedData[18];

        } else if (command[1] === 'GTGSS') {

            dataSet.gps_sig_status = parsedData[4];
            dataSet.satellite_no = parsedData[5];
            dataSet.device_state = parsedData[6];
            dataSet.reserved1 = parsedData[7];
            dataSet.accuracy = parsedData[8];
            dataSet.speed = parsedData[9];
            dataSet.azimuth = parsedData[10];
            dataSet.altitude = parsedData[11];
            dataSet.lng = parsedData[12];
            dataSet.lat = parsedData[13];
            dataSet.gps_utc_time = moment(parsedData[14], 'YYYYMMDDHHmmss').toDate();
            dataSet.raw_gps_time = parsedData[14];
            dataSet.mcc = parsedData[15];
            dataSet.lnc = parsedData[16];
            dataSet.lac = parsedData[17];
            dataSet.cell_id = parsedData[18];
            dataSet.reserved2 = parsedData[19];

        } else if (command[1] === 'GTDOS') {

            dataSet.wave_out_id = parsedData[4];
            dataSet.wave_out_active = parsedData[5];
            dataSet.accuracy = parsedData[6];
            dataSet.speed = parsedData[7];
            dataSet.azimuth = parsedData[8];
            dataSet.altitude = parsedData[9];
            dataSet.lng = parsedData[10];
            dataSet.lat = parsedData[11];
            dataSet.gps_utc_time = moment(parsedData[12], 'YYYYMMDDHHmmss').toDate();
            dataSet.raw_gps_time = parsedData[12];
            dataSet.mcc = parsedData[13];
            dataSet.lnc = parsedData[14];
            dataSet.lac = parsedData[15];
            dataSet.cell_id = parsedData[16];
            dataSet.reserved1 = parsedData[17];

        } else if (command[1] === 'GTGPJ') {

            dataSet.cw_jam_state = parsedData[4];
            dataSet.gps_jam_state = parsedData[5];
            dataSet.accuracy = parsedData[6];
            dataSet.speed = parsedData[7];
            dataSet.azimuth = parsedData[8];
            dataSet.altitude = parsedData[9];
            dataSet.lng = parsedData[10];
            dataSet.lat = parsedData[11];
            dataSet.gps_utc_time = moment(parsedData[12], 'YYYYMMDDHHmmss').toDate();
            dataSet.raw_gps_time = parsedData[12];
            dataSet.mcc = parsedData[13];
            dataSet.lnc = parsedData[14];
            dataSet.lac = parsedData[15];
            dataSet.cell_id = parsedData[16];
            dataSet.reserved2 = parsedData[17];

        } else if (command[1] === 'GTRMD') {

            dataSet.roam_state = parsedData[4];
            dataSet.accuracy = parsedData[5];
            dataSet.speed = parsedData[6];
            dataSet.azimuth = parsedData[7];
            dataSet.altitude = parsedData[8];
            dataSet.lng = parsedData[9];
            dataSet.lat = parsedData[10];
            dataSet.gps_utc_time = moment(parsedData[11], 'YYYYMMDDHHmmss').toDate();
            dataSet.raw_gps_time = parsedData[11];
            dataSet.mcc = parsedData[12];
            dataSet.lnc = parsedData[13];
            dataSet.lac = parsedData[14];
            dataSet.cell_id = parsedData[15];
            dataSet.reserved1 = parsedData[16];

        } else if (command[1] === 'GTJDR') {

            dataSet.accuracy = parsedData[4];
            dataSet.speed = parsedData[5];
            dataSet.azimuth = parsedData[6];
            dataSet.altitude = parsedData[7];
            dataSet.lng = parsedData[8];
            dataSet.lat = parsedData[9];
            dataSet.gps_utc_time = moment(parsedData[10], 'YYYYMMDDHHmmss').toDate();
            dataSet.raw_gps_time = parsedData[10];
            dataSet.mcc = parsedData[11];
            dataSet.lnc = parsedData[12];
            dataSet.lac = parsedData[13];
            dataSet.cell_id = parsedData[14];
            dataSet.reserved1 = parsedData[15];

        } else if (command[1] === 'GTJDS') {

            dataSet.jam_status = parsedData[4];
            dataSet.accuracy = parsedData[5];
            dataSet.speed = parsedData[6];
            dataSet.azimuth = parsedData[7];
            dataSet.altitude = parsedData[8];
            dataSet.lng = parsedData[9];
            dataSet.lat = parsedData[10];
            dataSet.gps_utc_time = moment(parsedData[11], 'YYYYMMDDHHmmss').toDate();
            dataSet.raw_gps_time = parsedData[11];
            dataSet.mcc = parsedData[12];
            dataSet.lnc = parsedData[13];
            dataSet.lac = parsedData[14];
            dataSet.cell_id = parsedData[15];
            dataSet.reserved1 = parsedData[16];

        }

        if (dataSet.get('lat') || dataSet.get('lng')) {
            dataSet.setCoordinates(dataSet.get('lat'), dataSet.get('lng'));
        }

        return dataSet;

    } catch (e) {
        throw e;
    }

}).call(this);
