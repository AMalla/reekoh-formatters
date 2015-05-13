exports.convert = function () {

    var save_data = {};

    _.extend(save_data, data);

    if (data.dtm)
        save_data.dtm = moment(data.dtm, 'YYMMDDHHmmss').toDate();

    delete save_data['raw_data'];

    exit(save_data);
};
