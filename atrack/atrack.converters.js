exports.convert = function () {
    var convertedData = _.extend({}, data);

    if (convertedData.gps_dtm)
        convertedData.gps_dtm = moment(convertedData.gps_dtm, 'YYYYMMDDHHmmss').toDate();

    if (convertedData.dtm)
        convertedData.dtm = moment(convertedData.dtm, 'YYYYMMDDHHmmss').toDate();

    if (convertedData.position_dtm)
        convertedData.position_dtm = moment(convertedData.position_dtm, 'YYYYMMDDHHmmss').toDate();

    delete convertedData.raw_data;

    exit(convertedData);
};
