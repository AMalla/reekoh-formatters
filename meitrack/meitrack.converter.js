exports.convert = function () {
    var convertedData = _.extend({}, data);

    if (convertedData.dtm)
        convertedData.dtm = moment(convertedData.dtm, 'YYMMDDHHmmss').toDate();

    delete convertedData.raw_data;

    exit(convertedData);
};
