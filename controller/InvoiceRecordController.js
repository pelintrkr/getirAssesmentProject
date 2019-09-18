record = require('../model/InvoiceRecordModel');

exports.filterByDateAndCount = function (req, res) {
    var request = req.body;

    //TODO validations can be increased and moved into a function
    if (!isValidDate(request.startDate) || !isValidDate(request.endDate)) {
        res.status(400).send(
            {
                code: 10,
                msg: 'startDate and endDate must be in “YYYY-MM-DD” format',
                records: []
            }
        )
    } else if(!Number.isInteger(request.minCount) || !Number.isInteger(request.maxCount)){
        res.status(400).send(
            {
                code: 11,
                msg: 'minCount and maxCount varibles must be integers',
                records: []
            }
        )
    }
    
    else {
        try {
            filterRecordsByDateAndCount(request).then(records => {
                if (records) {
                    res.status(200).send(
                        {
                            code: 0,
                            msg: 'success',
                            records: records
                        }
                    )
                } else {
                    res.status(204).send(
                        {
                            code: 2,
                            msg: 'no records found',
                            records: []
                        }
                    )
                }

            });
        } catch (err) {
            res.status(500).send(
                {
                    code: 1,
                    msg: err,
                    records: []
                }
            )
        }
    }
};


//function for data filtering by date and count 
async function filterRecordsByDateAndCount(request) {
    var { startDate, endDate, minCount, maxCount } = request;
    var records;

    try {
        await record.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(startDate),
                        $lte: new Date(endDate)
                    }

                }
            }, {
                $project: {
                    key: 1,
                    _id: 0,
                    createdAt: 1,
                    totalCount: {
                        $sum: '$counts'
                    }
                }
            }, {
                $match: {
                    totalCount: {
                        $gt: parseInt(minCount),
                        $lt: parseInt(maxCount)
                    }
                }
            }
        ], (err, result) => {
            if (err) {
                records = false;
            } else {
                records = result;
            }
        });
    } catch (err) {
        records = false;
    }
    return records;
};

//validation function for date format "YYYY-MM-DD"
function isValidDate(dateString) {
    var regEx = /^\d{4}-\d{2}-\d{2}$/;
    return dateString.match(regEx) != null;
}