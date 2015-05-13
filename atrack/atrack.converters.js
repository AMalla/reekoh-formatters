exports.convert = function () {

    var save_data = {};

    _.extend(save_data, data);

    if (data.gps_dtm)
        save_data.gps_dtm = moment(data.gps_dtm, 'YYYYMMDDHHmmss').toDate();

    if (data.dtm)
        save_data.dtm = moment(data.dtm, 'YYYYMMDDHHmmss').toDate();

    if (data.position_dtm)
        save_data.position_dtm = moment(data.position_dtm, 'YYYYMMDDHHmmss').toDate();


    delete save_data['raw_data'];

    exit(save_data);
};
