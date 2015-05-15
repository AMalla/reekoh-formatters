exports.convert = function () {
    var convertedData = _.extend({}, data);

    if (convertedData.dtm)
        convertedData.dtm = moment(convertedData.dtm, 'YYYYMMDDHHmmss').toDate();

    delete convertedData.raw_data;

    exit(convertedData);
};
